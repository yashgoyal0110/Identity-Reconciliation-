import {
    getRecordsByEmailOrPhone,
    getRecordsByEmailAndPhone,
    getEmailsFromContact,
    getPhonesFromContact,
    createRecord,
    updateRecordById,
    updateRecordByLinkedId,
    getContactsByLinkedId,
  } from "../query/query.js";
  
  export const identifyContact = async (req, res) => {
    const { email, phoneNumber } = req.body;
  
    // Ensure at least one of email or phone number is provided
    if (!email && !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Either email or phone number is required." });
    }
  
    try {
      const contactsByEmailOrPhone = await getRecordsByEmailOrPhone(
        email,
        phoneNumber
      );
      const contactsByEmailAndPhone = await getRecordsByEmailAndPhone(
        email,
        phoneNumber
      );
  
      const emailsFromContact = await getEmailsFromContact(email);
      const phonesFromContact = await getPhonesFromContact(phoneNumber);
  
      // create a new contact if no record with given details exists
      if (contactsByEmailOrPhone.length === 0) {
        const newContactId = await createRecord(email, phoneNumber);
        return res.status(201).json({
          contact: {
            primaryContactId: newContactId,
            emails: email ? [email] : [],
            phoneNumbers: phoneNumber ? [phoneNumber] : [],
            secondaryContactIds: [],
          },
        });
      }
  
      //linking to an existing contact
      if (contactsByEmailAndPhone.length === 0) {
        let primaryContact = contactsByEmailOrPhone[0];
        let primaryId = primaryContact.linkedId
          ? primaryContact.linkedId
          : primaryContact.id;
  
        // create a secondary contact
        if (emailsFromContact.length === 0 || phonesFromContact.length === 0) {
          await createRecord(email, phoneNumber, primaryId, "secondary");
        }
      }
  
      let primaryContactIds = new Set();
      for (let contact of contactsByEmailOrPhone) {
        const contactId = contact.linkedId || contact.id;
        primaryContactIds.add(contactId);
      }
  
      // determine the firstPrimaryId and SecondPrimaryId
      const sortedPrimaryIds = [...primaryContactIds].sort((a, b) => a - b);
      const firstPrimaryId = sortedPrimaryIds[0];
      const secondPrimaryId = sortedPrimaryIds[1];
  
      // In case both first and second ids are there, update linkedId for secondPrimaryId
      if (firstPrimaryId && secondPrimaryId) {
        await updateRecordById(secondPrimaryId, {
          linkedId: firstPrimaryId,
          linkPrecedence: "secondary",
        });
        await updateRecordByLinkedId(secondPrimaryId, {
          linkedId: firstPrimaryId,
        });
  
        const secondaryEmails = new Set(); // using sets for unique values only
        const secondaryPhoneNumbers = new Set();
        const secondaryContactIds = [];
  
        // all contacts linked to the primary contact
        const linkedContacts = await getContactsByLinkedId(firstPrimaryId);
        linkedContacts.forEach((contact) => {
          if (contact.email) secondaryEmails.add(contact.email);
          if (contact.phoneNumber) secondaryPhoneNumbers.add(contact.phoneNumber);
          if (contact.linkPrecedence === "secondary") {
            secondaryContactIds.push(contact.id);
          }
        });
  
        res.status(200).json({
          contact: {
            primaryContactId: firstPrimaryId,
            emails: [...secondaryEmails],
            phoneNumbers: [...secondaryPhoneNumbers],
            secondaryContactIds: secondaryContactIds,
          },
        });
      }
  
      // in case we just have to create a normal variation of a primar existing record
      else {
        const secondaryEmails = new Set();
        const secondaryPhoneNumbers = new Set();
        const secondaryContactIds = [];
  
        const linkedContacts = await getContactsByLinkedId(firstPrimaryId);
        linkedContacts.forEach((contact) => {
          if (contact.email) secondaryEmails.add(contact.email);
          if (contact.phoneNumber) secondaryPhoneNumbers.add(contact.phoneNumber);
          if (contact.linkPrecedence === "secondary") {
            secondaryContactIds.push(contact.id);
          }
        });
  
        res.status(200).json({
          contact: {
            primaryContactId: firstPrimaryId,
            emails: [...secondaryEmails],
            phoneNumbers: [...secondaryPhoneNumbers],
            secondaryContactIds: secondaryContactIds,
          },
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };
  
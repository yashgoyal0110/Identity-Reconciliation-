import {
  getRecordsByEmailOrPhone,
  getRecordsByEmailAndPhone,
  getEmailsFromContact,
  getPhonesFromContact,
} from "../query/query.js";

export const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  // both should not be null
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

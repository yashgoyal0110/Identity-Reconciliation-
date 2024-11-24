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
      const contactsByEmailOrPhone = await getRecordsByEmailOrPhone(email, phoneNumber);
      const contactsByEmailAndPhone = await getRecordsByEmailAndPhone(email, phoneNumber);
  
      const emailsFromContact = await getEmailsFromContact(email);
      const phonesFromContact = await getPhonesFromContact(phoneNumber);
 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };
  
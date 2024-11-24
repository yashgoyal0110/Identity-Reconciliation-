import db from "../config/db.js";

export const getRecordsByEmailOrPhone = async (email, phoneNumber) => {
  const [records] = await db.execute(
    `SELECT * FROM Contact WHERE email = ? OR phoneNumber = ?`,
    [email, phoneNumber]
  );
  return records;
};

export const getRecordsByEmailAndPhone = async (email, phoneNumber) => {
  const [records] = await db.execute(
    `SELECT * FROM Contact WHERE email = ? AND phoneNumber = ?`,
    [email, phoneNumber]
  );
  return records;
};

export const getEmailsFromContact = async (email) => {
    const [emails] = await db.execute(`SELECT * FROM Contact WHERE email = ?`, [
      email,
    ]);
    return emails;
  };
  
  export const getPhonesFromContact = async (phone) => {
    const [phones] = await db.execute(
      `SELECT * FROM Contact WHERE phoneNumber = ?`,
      [phone]
    );
    return phones;
  };


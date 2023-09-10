import crypto from "crypto";

export const decryption = (encryptedData) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.SECRET_ENCRYPTION_KEY),
    Buffer.from(encryptedData.slice(0, 32), "hex")
  );

  let decryptedData = decipher.update(encryptedData.slice(32), "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
};

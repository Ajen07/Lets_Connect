import crypto from "crypto";

export const encrytion = (data) => {
  const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.SECRET_ENCRYPTION_KEY),
    iv
  );

  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  // Combine IV and encrypted data
  const encryptedDataWithIV = iv.toString("hex") + encryptedData;
  return encryptedDataWithIV;
};

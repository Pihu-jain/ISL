const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "video", // specify video
    });

    await fs.unlink(localFilePath); // Clean up local file

    return response;
  } catch (error) {
    await fs.unlink(localFilePath);
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

module.exports = uploadToCloudinary;

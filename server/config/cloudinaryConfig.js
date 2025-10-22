

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// import { nanoid } from "nanoid"; 
// import path from 'path';
// import { fileURLToPath } from 'url';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_COULD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // delete local file after successful upload
    await fs.promises.unlink(localFilePath);

    return response;
  } catch (error) {
    await fs.promises.unlink(localFilePath).catch(() => {});
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    const afterUpload = fileUrl.split("/upload/")[1];
    if (!afterUpload) return;

    const [publicIdWithVersion] = afterUpload.split(".");
    const publicId = publicIdWithVersion.replace(/^v\d+\//, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };    

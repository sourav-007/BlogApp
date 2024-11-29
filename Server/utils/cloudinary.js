// import { v2 } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return console.error('Could not find the path')

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })

        console.log('File is uploaded on cloudinary', response.public_id);

        fs.unlinkSync(localFilePath)

        return response


    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const getPublicIdFromUrl = (url) => {
    if (!url || typeof url !== 'string') {
        console.error("Invalid URL passed to getPublicIdFromUrl:", url);
        return null; // Return `null` if the URL is invalid
    }
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1]; 
    const publicId = publicIdWithExtension.split('.')[0]; 
    return publicId;
};



const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            console.error('Public ID is required to delete the file');
            return null;
        }

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
        });
        console.log(response);
        

        if (response.result === 'ok') {
            console.log('File successfully deleted from Cloudinary:', publicId);
            return response;
        } else {
            console.error('Failed to delete file from Cloudinary:', response.result);
            return null;
        }

    } catch (error) {
        console.error('Error while deleting file from Cloudinary:', error);
        return null;
    }
};


module.exports = { uploadOnCloudinary, getPublicIdFromUrl, deleteFromCloudinary }
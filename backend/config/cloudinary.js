import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async (filepath) => {
    // Configure Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOIDINARY_API_SECRET,
    });
    try {
        if(!filepath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath)
        return uploadResult.secure_url
        
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error)
        
    }
}
export default uploadOnCloudinary
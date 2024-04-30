import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret:process.env.API_SECRET 
});

const uploadOnCloudinary=async(localPathFile)=>{
    try{
        if(!localPathFile) return null;
        //Upload the file on cloudinary
       const response= await cloudinary.uploader.upload(localPathFile,
        {
            resource_type:"auto"
        })
        //File has been sucessfully uploaded
        console.log("File has been uploaded",response.url)
        fs.unlinkSync(localPathFile);
        return response;
    }catch(error){
        fs.unlinkSync(localPathFile); //remove locally saved temp file as upload operation got failed
        return null;
    } 
    
}

export {uploadOnCloudinary}
const { BlobServiceClient } = require("@azure/storage-blob")
const { config } = require("dotenv").config({path:'./src/.env'})

const blobService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

const uploadBlob = async (req,res)=>{
    try {
        const {container} = req.body;
        const {originalname,buffer} = req.file;
        const containerClient = blobService.getContainerClient(container)

        await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
        res.json({"message":"success "})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.uploadBlob = uploadBlob;
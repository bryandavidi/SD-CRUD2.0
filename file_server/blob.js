const { BlobServiceClient } = require("@azure/storage-blob")
const { config } = require("dotenv").config({path:'./src/.env'})

const blobService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

async function uploadBlob(container,originalname,buffer){
    try {
        const containerClient = blobService.getContainerClient(container)

        await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
        console.log({"message":"Imagen cargada en el contenedor",container})
    } catch (error) {
        console.log({message: error.message});
    }
}

module.exports = {uploadBlob}
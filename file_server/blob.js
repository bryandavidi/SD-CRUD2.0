const { BlobServiceClient } = require("@azure/storage-blob")
require("dotenv").config({path:'./src/.env'})

const blobService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

async function uploadBlob(container,originalname,buffer){
    try {
        const containerClient = blobService.getContainerClient(container)

        await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
        console.log({"message":"Imagen cargada en el contenedor"})
    } catch (error) {
        console.log({message: error.message});
    }
}

function deleteBlob(container,filename,){
    try {
        const containerClient = blobService.getContainerClient(container)
        const response = containerClient
        .getBlockBlobClient(filename)
        .deleteIfExists();
        console.log({"message":"Imagen eliminada"})
    } catch (error) {
        console.log({message: error.message});
    }
}


module.exports = {uploadBlob,deleteBlob}
const azureStorage = require('azure-storage');

const returnError = (message) => {
    return {
        status: 500,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            error: message
        })
    }
}

const generateSasToken = async (container, blobName, permissions) => {
    const connectionString = process.env.AzureWebJobsStorage;
    const blobStorage = azureStorage.createBlobService(connectionString);

    const startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);

    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    }

    const sasToken = blobStorage.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);

    const exists = await new Promise((resolve, reject) => {
        blobStorage.doesBlobExist(container, blobName, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result.exists);
            }
        });
    });

    const uri = blobStorage.getUrl(container, blobName, sasToken, true);

    return {
        token: sasToken,
        uri: uri,
        exists: exists
    };
}

module.exports = async function (context, req) {

    if( !(req.body && req.body.blobName)){
        context.res = returnError('No blobName in the body');
    }

    const blobName = req.body.blobName;
    const userId = req.headers['x-ms-client-principal-id'];
    const permissions = 'rcw';
    const container = process.env.blob_container_name;

    const sasToken = await generateSasToken(container, `${userId}/${blobName}`, permissions);

    context.res = {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(sasToken)
    };
};
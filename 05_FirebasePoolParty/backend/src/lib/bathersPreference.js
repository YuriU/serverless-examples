const get = async({admin}, request, response) => {

    const db = admin.firestore();

    console.log(request.body);
    var parsedRequest = JSON.parse(request.body);
  
    if(!(request.body && parsedRequest.userId)){
        response.status(500).send({
        error: 'No userId in body'
        })

        return;
    }
    
    const userId = parsedRequest.userId;
    const result = {
        found: false
    };

    console.log(userId);

    const dbResponse = await db.collection('users')
                .doc(userId)
                .get()
                .then(retrievedDocument => retrievedDocument.get('bathersPreference'));

    if(dbResponse) {
        result.found = true;
        result.data = dbResponse;
    }
    
    response.send(result);
}

module.exports = {
    get
}
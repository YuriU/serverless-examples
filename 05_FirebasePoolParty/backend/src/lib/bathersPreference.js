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

const set = async({admin}, request, response) => {

    const db = admin.firestore();

    console.log(request.body);
    var parsedRequest = JSON.parse(request.body);
  
    if(!(request.body && parsedRequest.userId)){
        response.status(500).send({
        error: 'No userId in body'
        })

        return;
    }

    if(!(request.body && parsedRequest.bathersPreference)){
        response.status(500).send({
        error: 'No bathersPreference in body'
        })

        return;
    }
    
    const userId = parsedRequest.userId;
    const bathersPreference = parsedRequest.bathersPreference;
    const result = {
        changed: false
    };

    const dbResponse = await db.collection('users')
                .doc(userId)
                .set({
                    bathersPreference
                }, {
                    merge: true
                });

    if(dbResponse) {
        result.changed = true;
    }
    
    response.send(result);
}

module.exports = {
    get,
    set
}
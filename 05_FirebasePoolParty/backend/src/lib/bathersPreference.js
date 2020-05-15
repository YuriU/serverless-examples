const get = async({admin}, request, response) => {

    const db = admin.firestore();

    const userId = request.user.uid;
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

    if(!(request.body && request.body.bathersPreference)){
        response.status(500).send({
        error: 'No bathersPreference in body'
        })

        return;
    }
    
    const userId = request.user.uid;
    const bathersPreference = request.body.bathersPreference;
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
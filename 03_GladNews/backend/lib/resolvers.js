function resolveArticle(context, args){
    console.log("In resolver article type", context)
    console.log(args)
    //console.log(fieldNodes)

    return ddb.ArticlesDB.get({
        Key: {
            id: args.id
        }
    }).promise().then(data => {
        console.log('Got back data', data)
        return data.Item;
    })
}

function resolveArticles(context, args) {
    console.log("In resolver articles type", context)
    console.log(args)

    if(args.hours && args.author_id){
        const t = (lo.now() / 1000) - (args.hours * 3600);
        const params = {
            IndexName: 'author_x_posted',
            KeyConditionalExpression: 'author_id = :a_id and posted_at >= :earliest',
            ExpressionAttributeValues: {
                ':a_id': args.author_id,
                ':earliest' : Math.round(t)
            }
        }

        console.log(params)
        return ddb.ArticlesDB.query(params).promise().then(data => {
            console.log('Got back data', data)
            return data.Items;
        })
    }
    else if (args.author_id)  {
        console.log('Whoo!')
        return ddb.ArticlesDB.query({
            IndexName: 'author_x_posted',
            KeyConditionalExpression: 'author_id = :a',
            ExpressionAttributeValues: {
                ':a': args.author_id
            }
        }).promise.then(data => {
            console.log('Got back data', data)
            return data.Items;
        })
    } else {
        return ddb.ArticlesDB.scan({
        }).promise.then(data => {
            console.log('Got back data', data)
            return lo.sortBy(data.Items, [o => { return o.score || 0 }]);
        })
    }
}

module.exports = {
    resolveArticle: resolveArticle,
    resolveArticles: resolveArticles
}
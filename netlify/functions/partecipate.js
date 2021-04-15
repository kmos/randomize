exports.handler = async function(event, context) {
    const {identity, user} = context.clientContext;
    // Do stuff and return a response...
    if (user!=null) {
        return {
            statusCode: 200,
            body: JSON.stringify({message: "you are authenticated"})
        }
    }

    return {
        statusCode: 403,
        body: JSON.stringify({message: "you are not authenticated"})
    }
}
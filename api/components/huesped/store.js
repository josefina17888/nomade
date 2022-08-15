const Model = require('./model');


async function getUser(name) {
    if(name !== null) {
        const users = await Model.find(name)
        return users
    }
    return await Model.find()
}

async function addUser(name,email) {
    const myUser = await new Model(name,email);
    myUser.save()
}


module.exports = {
    list: getUser,
    add: addUser,
}
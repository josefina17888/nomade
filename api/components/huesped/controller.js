const store = require("./store")

function getUser(name){
    return new Promise((resolve, reject) => {
        resolve(store.list(name))
    })
}

function addUser (name, email) {
    return new Promise((resolve, reject) => {
        if (!name || !email) {
        return reject(new Error('se requiere user y message'));
        
    }

    const newUser = {
        name,
        email
    };

    store.add(newUser)
    resolve(newUser)
    })
}



module.exports = {
    addUser,
    getUser
}
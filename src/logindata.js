
function initDatabase() {
    const fs = require('fs')

    const dir = './data'
    const path = dir + '/users.json'
    
    const defaultVal = { }

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(defaultVal), (err) => {
                if (err)
                    console.error(err);
            }
        );
    }
}

function generateId() {
    return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

function createUser(data) {
    const fs = require('fs')

    const path = './data/users.json'

    id = generateId()
    try
    {
        initDatabase();
        users = {}
        text = fs.readFileSync(path)
        users = JSON.parse(text)

        while (id in users)
        {
            id = generateId()
        }

        updateUser(id, data);
    }
    catch(err)
    {
        console.error(err)
    }

    return id
}

function getUser(id) {
    const fs = require('fs')

    const path = './data/users.json'

    try
    {
        initDatabase();
        users = {}
        text = fs.readFileSync(path)
        users = JSON.parse(text)
        if (id in users)
            return users[id]
        else
            return {err: 'User not found'}

    }
    catch(err)
    {
        console.error(err)
    }
}

function getUserByEmail(email) {
    const fs = require('fs')

    const path = './data/users.json'

    try
    {
        initDatabase();
        users = {}
        text = fs.readFileSync(path)
        users = JSON.parse(text)
        for (user in users) {
            if (users[user].email == email) {
                const u = users[user]
                u.id = user
                return u
            }
        }
        return {err: 'User not found'}
    }
    catch(err)
    {
        console.error(err)
    }
}

function updateUser(id, data) {
    const fs = require('fs')

    const path = './data/users.json'

    try
    {
        initDatabase();

        users = {}
        text = fs.readFileSync(path)
        users = JSON.parse(text)
        users[id] = data
        fs.writeFileSync(path, JSON.stringify(users))
    }
    catch(err)
    {
        console.error(err)
    }
}

function deleteUser(id) {
    const fs = require('fs')

    const path = './data/users.json'

    try
    {
        initDatabase();

        users = {}
        text = fs.readFileSync(path)
        users = JSON.parse(text)
        delete users[id]
        fs.writeFileSync(path, JSON.stringify(users))
    }
    catch(err)
    {
        console.error(err)
    }
}


module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
};
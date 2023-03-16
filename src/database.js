
function initDatabase() {
    const fs = require('fs')

    const dir = './data'
    const path = dir + '/tickets.json'
    
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

function createTicket(data) {
    const fs = require('fs')

    const path = './data/tickets.json'

    id = generateId()
    try
    {
        initDatabase();
        tickets = {}
        text = fs.readFileSync(path)
        tickets = JSON.parse(text)

        while (id in tickets)
        {
            id = generateId()
        }

        updateTicket(id, data);
    }
    catch(err)
    {
        console.error(err)
    }

    return id
}

function getTicket(id) {
    const fs = require('fs')

    const path = './data/tickets.json'

    try
    {
        initDatabase();
        tickets = {}
        text = fs.readFileSync(path)
        tickets = JSON.parse(text)
        if (id in tickets)
            return tickets[id]
        else
            return {err: 'Ticket not found'}

    }
    catch(err)
    {
        console.error(err)
    }
}

function updateTicket(id, data) {
    const fs = require('fs')

    const path = './data/tickets.json'

    try
    {
        initDatabase();

        tickets = {}
        text = fs.readFileSync(path)
        tickets = JSON.parse(text)
        tickets[id] = { ...tickets[id], ...data }
        fs.writeFileSync(path, JSON.stringify(tickets))
    }
    catch(err)
    {
        console.error(err)
    }
}

function deleteTicket(id) {
    const fs = require('fs')

    const path = './data/tickets.json'

    try
    {
        initDatabase();

        tickets = {}
        text = fs.readFileSync(path)
        tickets = JSON.parse(text)
        delete tickets[id]
        fs.writeFileSync(path, JSON.stringify(tickets))
    }
    catch(err)
    {
        console.error(err)
    }
}

//Ticket Table Load
function getAllTickets(){
    const fs = require('fs')

    const path = './data/tickets.json'

    try
    {
        initDatabase();
        tickets = {}
        text = fs.readFileSync(path)
        tickets = JSON.parse(text)
        return tickets
    }
    catch(err)
    {
        console.error(err)
    }
}



module.exports = {
    createTicket,
    getTicket,
    getAllTickets,
    updateTicket,
    deleteTicket,
};


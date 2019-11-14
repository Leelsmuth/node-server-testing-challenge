const db = require('../data/dbConfig');

module.exports = {
    find,
    findByName,
    insert,
    remove
}

function find(){
    return db('users')
}

function findByName(name){
    return db('users').where({name: name}).first()
}

async function insert(name){
    let [id] = await db('users').insert(name)
    let result = await db('users').where({id: id})
    return result
}

function remove(name){
    return db('users').where({name: name}).del()
}
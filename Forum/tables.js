
const createUserTable = `CREATE TABLE IF NOT EXISTS user (

id INTEGER PRIMARY KEY,
username TEXT NOT NULL,
password TEXT NOT NULL,
bio TEXT,
icon_path TEXT,
creation_date TEXT

)`;

const createCategoryTable = `CREATE TABLE IF NOT EXISTS category (

id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
desc TEXT NOT NULL

)`;

const createThreadTable = `CREATE TABLE IF NOT EXISTS thread (

id INTEGER PRIMARY KEY,
title TEXT NOT NULL,
author INTEGER NOT NULL,
creation_date TEXT NOT NULL,
icon_path TEXT NOT NULL,
category INTEGER NOT NULL,

FOREIGN KEY (author) REFERENCES user(id),
FOREIGN KEY (category) REFERENCES category(id)

)`;

const createPostTable = `CREATE TABLE IF NOT EXISTS post (

id INTEGER PRIMARY KEY,
author INTEGER NOT NULL,
thread INTEGER NOT NULL,
text TEXT NOT NULL,
creation_date TEXT NOT NULL,
image_path TEXT,

FOREIGN KEY (author) REFERENCES user(id),
FOREIGN KEY (thread) REFERENCES thread(id)

)`;


module.exports.deleteColumn = function() {
    return "ALTER TABLE ? DROP COLUMN ? "
}


module.exports.createUserTable = function() {
    return createUserTable;
}

module.exports.createCategoryTable = function() {
    return createCategoryTable;
}

module.exports.createThreadTable = function() {
    return createThreadTable;
}

module.exports.createPostTable = function() {
    return createPostTable;
}


const getCategories = "SELECT * FROM category"
const createCategory = "INSERT INTO category(name, desc) VALUES(?, ?)"

module.exports.getCategories = function() {
    return getCategories;
}

module.exports.createCategory = function() {
    return createCategory;
}


const getUsers = "SELECT * FROM user"
const createUser = "INSERT INTO user(username, password, bio, icon_path, creation_date) VALUES(?, ?, ?, ?, ?)"

module.exports.getUsers = function() {
    return getUsers;
}

module.exports.createUser = function() {
    return createUser;
}


const getThreads = "SELECT * FROM thread"
const createThread = "INSERT INTO thread(title, author, creation_date, icon_path, category) VALUES(?, ?, ?, ?, ?)"

module.exports.getThreads = function() {
    return getThreads;
}

module.exports.createThread = function() {
    return createThread;
}


const getPosts = "SELECT * FROM post"
const createPost = "INSERT INTO post(author, thread, text, creation_date) VALUES(?, ?, ?, ?)"

module.exports.getPosts = function() {
    return getPosts;
}

module.exports.createPost = function() {
    return createPost;
}


const threadFromCategoryId = "SELECT * FROM thread WHERE category = ?"

module.exports.getThreadFromCategoryId = function() {

    return threadFromCategoryId
}


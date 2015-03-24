var localforage = require('localforage');

localforage.config({
    name        : 'beerMe',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'beer_me', // Should be alphanumeric, with underscores.
    description : 'local storage for the beer me app.'
});

console.log("configured localforage");

module.exports = localforage;
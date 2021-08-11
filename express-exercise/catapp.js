/*
# Start your cat server!
node catapp.js
(in order to avoid continuous restart of the server everytime you make a change in your catapp.js, 
install nodemon using 'npm install nodemon'.  Now with nodemon instead of 'node catapp.js' do 'nodemon catapp.js')
*/


const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());

// Print some info for every request
app.use(function (req, res, next) {
    console.log('Got a request:', req.method, req.originalUrl);
    next();  // give next middleware a chance to run
});

//start server
app.listen(port, () => {
    console.log(`catapp.js listening on port http://localhost:${port}`);
});

/**********************************************************
 * My "Database"
 **********************************************************/

 let catsData = [
    {id: 1, name: 'Fifi', breed: 'Calico', favoriteFood: 'tuna'},
    {id: 2, name: 'Maxwell', breed: 'Red Tabby', favoriteFood: 'Swiss cheese'}
];
let nextId = 3;

/**********************************************************
 * Middleware
 **********************************************************/




/**********************************************************
 * Routes
 **********************************************************/

// Get home page
app.get('/', (req, res) => {
    res.send('Hello Welcome to the World of CATS!!!');
})

// Get all cats
app.get('/cats', (req, res) => {
    res.send(catsData);
});

// Get a cat by ID
app.get('/cats/:id', (req, res) => {
    let id = Number(req.params.id);
    let cat = catsData.find((c) => c.id === id);
    if (cat) {
        res.send({cat: cat});
    } else {
        res.status(404).send({error: "We don't have that cat here "});
    }
});

// Add a new cat
app.post('/cats', (req, res) => {
    let newCat = req.body;
    console.log(req);
    newCat.id = nextId++;  // add a unique ID
    catsData.push(newCat);
    res.status(201).send({cat: newCat});
});

// Update/replace a cat by ID
app.put('/cats/:id', (req, res) => {
    let id = Number(req.params.id);
    let ix = catsData.findIndex((c) => c.id === id);
    if (ix === -1) {
        res.status(404).send({error: 'Not Found'});
    } else {
        let modifiedCat = req.body;
        modifiedCat.id = id;  // in case client tries to change the ID... bad!
        catsData[ix] = modifiedCat;
        res.send({cat: modifiedCat});
    }
});

// Delete a cat by ID
app.delete('/cats/:id', (req, res) => {
    let id = Number(req.params.id);
    let ix = catsData.findIndex((c) => c.id === id);
    if (ix === -1) {
        res.status(404).send({error: 'Not Found'});
    } else {
        catsData.splice(ix, 1);
        res.send({message: 'Deleted'});
    }
});



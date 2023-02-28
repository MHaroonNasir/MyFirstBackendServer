//200s ok
//300s redirects
//400s user problemn
//500s server problem

//GET POST DELETE PATCH

require('dotenv').config();
const cors = require('cors');

const fruits = require("./fruits.js");

//creating server with express
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json())

//routes, url pathways in the browser
app.get('/', (req, res) => {
    res.send("Hello Woirld")
})
//http://127.0.0.1:3000/fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

const getFruit = (paramName) => {
    return fruit = fruits.find((fruit) => fruit.name.toLowerCase() == paramName);
}

const getMaxID = () => {
    //maps array of fruits into id variable
    const ids = fruits.map((fruit) => fruit.id)
    //... is spread operator
    return Math.max(...ids);
}

//get info for 1 specific fruit but doing fruits/(name)
app.get("/fruits/:name", (req, res) => {
    const fruitName = req.params.name.toLowerCase();
    const fruit = getFruit(fruitName);
    //const fruit = fruits.find(fruit => fruit.name.toLowerCase() === req.params.name.toLowerCase());
    if (fruit == undefined) {
        res.status(404).send();
    } else {
        res.send(fruit);
    }
})


//post method, tested using thunder client extension
/*app.post("/fruits", (req, res) => {
    const fruit = req.body;
    console.log(fruit)
    //add fruit
    res.send("New Fruit Creates");
})*/
//post methods can sahre same route as get
app.post("/fruits", (req, res) => {
    //check if fruit already exists
    const fruit = getFruit(req.body.name);

    if (fruit != undefined) {
        res.status(409).send(); //409 - conflict
    } else {
        let maxID = getMaxID() + 1;
        req.body.id = maxID;
        fruits.push(req.body);
        res.status(201).send(req.body);
    }
})

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = getFruit(name);
    const fruitIndex = fruits.indexOf(fruit);
    if (fruitIndex == -1) {
        res.status(404).send();
    } else {
        fruits.splice(fruitIndex, 1);
        res.status(204).send();
    }
})

app.get('/elephant', (req, res) => {
    res.status(404).send() //mention that this page is 404
})
//can enter any value after elephant in browser and return json
//:name makes name a paramter and req.params passes that in
//cannot have multiplt of same url routes
/*app.get('/elephant/:name', (req, res) => {
    res.send(req.params)
})*/
//http://127.0.0.1:3000/elephant/bob&17
//this is param based
app.get('/elephant/:name&:age', (req, res) => {
    res.send(req.params)
})
//http://127.0.0.1:3000/elephant/non?type=elephant
//this is query based and will use ? in url
app.get('/elephant/:name', (req, res) => {
    res.send(req.query)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

/*
//nodemone manages server and auto restarts if server files change
//console.log("goodbye");

//importing http
const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 403;
    res.end()
})

//listening to port 3000
//could specify ip as well but currently on local host
//http://127.0.0.1:3000/ this url in browser is server address
server.listen(3000, () => {console.log("Server Ready")});
*/
const express = require('express');
const port = 3000;
const app = express();

app.use(express.json()); 

let cart = [];
let next_id = 1;



app.post("/cart", (req, res) => {
    let item = {
        id: next_id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    }

    cart.push(item);
    next_id = next_id + 1; 

    return res.status(201).send(item);
});

app.get('/cart', (req, res) => {
    return res.status(200).send(cart)
});

app.get('/cart/:id', (req, res) => {
    
    let id = parseInt(req.params.id);
    const item = cart.find(temp => temp.id === id);

    
    if(!item) return res.status(404).send("No item found");
    return res.status(200).send(item)
});

app.delete('/cart/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const item = cart.find(temp => temp.id === id);
    if(!item) return res.status(404).send("No item found");



    const index = cart.indexOf(item);
    cart.splice(index, 1);
    return res.status(200).send("Item deleted");
});

app.patch('/cart/:id', (req, res) => {
    let id = parseInt(req.params.id);
    const item = cart.find(temp => temp.id === id);
    if(!item) return res.status(404).send("No item found");
    quantity = req.body.quantity;
    return res.status(200).send("Item updated");
})

app.listen(port, () => { 
    console.log("Listening on port " + port);
});





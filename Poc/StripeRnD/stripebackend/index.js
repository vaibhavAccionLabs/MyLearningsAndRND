const cors = require('cors');
const express = require('express');
const stripe = require('stripe')('sk_test_51IZVN6SBtBgOt9E12TqvaNs6YLIWym1Tv3jmaqXq4wyp6Vz0HJGjTBigyRie96salVxvDK33XZfvby0Tlk8RIBSJ00wGNt3KxJ');
const { v4: uuidv4 } = require('uuid');

const app = express();

//console.log(stripe);
//console.log("UUID", uuidv4());


//middleware

app.use(express.json());
app.use(cors());



/// routes
app.get('/', (req, res) => {
    res.send('It works');
});

app.post('/payment', (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempontencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        return stripe.charges.create({
            amount: product.price * 100,
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id
        });
    }).then(result => { res.status(200).json(result); }).catch(error => {
        res.status(400).json(error);
        console.log(error);
    });



})


// listen
app.listen(8282, () => console.log('server listening to: 8282'))
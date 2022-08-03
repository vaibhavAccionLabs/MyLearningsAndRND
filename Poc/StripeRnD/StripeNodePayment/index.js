const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = 'pk_test_51IZVN6SBtBgOt9E1tygmy0E6Ze07C2kJL3BRcORiJVMA3PXch02ajoJpHTMw69moRNpzgZWcUMxpdZBYIET4LRXQ00T90WLcHG';
var Secret_Key = 'sk_test_51IZVN6SBtBgOt9E1UZVTTEVmSuVkqPtzdXsXx8lfg7l7pqOWUgxZ5lgyx4FuzQ2UFLoYffGOCPuZ7sgpWSmLoUcD00Mw1KI433';

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	res.render('Home', {
		key: Publishable_Key
	})
})

// app.get('/customers', async (req, res) => {
// 	const customers = await stripe.customers.list({
// 		limit: 3,
// 	});
// 	if (customers) {
// 		res.status(200).json(customers);
// 	}
// })

app.post('/payment', function (req, res) {
	console.log("BODY::", req.body);

	// Moreover you can take more details from user 
	// like Address, Name, etc from form 
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		name: 'Vaibhav Katariya',
		address: {
			line1: 'whitefield',
			postal_code: '560066',
			city: 'bangalore',
			state: 'karnataka',
			country: 'India',
		}
	})
		.then((customer) => {
			console.log("CUSTOMER::", customer);
			return stripe.charges.create({
				amount: 4500,	 // Charing Rs 25 
				description: 'Web Development Product',
				currency: 'INR',
				customer: customer.id
			});
		})
		.then((charge) => {
			console.log("CHARGE::", charge);
			res.send("Success") // If no error occurs 
		})
		.catch((err) => {
			res.send(err)	 // If some error occurs 
		});
})

app.listen(port, function (error) {
	if (error) throw error
	console.log("Server created Successfully")
}) 

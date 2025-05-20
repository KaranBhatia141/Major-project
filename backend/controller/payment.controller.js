const Stripe = require('stripe');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/' , async(req , res)=>{
    try{
        const {amount} = req.body;
        const paymentIntent = await Stripe.paymentIntent.create({
            amount,
            currency :'usd',
            automatic_payment_methods: {enabled:true},
        })
        res.status(200).send({clientSecret:paymentIntent.client_secret})
    }catch(err){
        res.status(500).send({err:err.message});
    }
})

module.exports = router;
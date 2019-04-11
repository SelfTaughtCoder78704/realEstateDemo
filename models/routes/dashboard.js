const express = require('express')
const router = express.Router()
const Property = require('../models/property-model')
const mongoose = require('mongoose');

const db = mongoose.connection;

router.get('/', (req, res) => {
    db.collection('props').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('dashboard', {title:'Home', properties: result})
      }) 
})

//Houses for sale
router.post('/', (req, res) => {
    const property = new Property({
        streetAdr: req.body.streetAdr,
        state: req.body.state.toUpperCase(),
        city: req.body.city.toUpperCase(),
        propertyType: req.body.propType.toUpperCase(),
        zip: req.body.zip,
        agentName: req.body.agentName.toUpperCase(),
        description: req.body.description,
        phone: req.body.phone,
        email: req.body.email,
        price: req.body.price,
        squareFootage: req.body.squareFootage,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms
    })
    property.save()
        .then(prop => {
            console.log(prop)
            res.redirect('/')
        })
})

router.get('/:id', (req, res) => {
    Property.findById(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err)
        return res.render('property', {title: 'Property Details', property: result})
    });
    
})


//UPDATE --NEED TO CREATE FORM AND EDIT PAGE 
// const Todo = require("../models/todo");

// // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// // Find the existing resource by ID
// Todo.findByIdAndUpdate(
//     // the id of the item to find
//     req.params.todoId,
    
//     // the change to be made. Mongoose will smartly combine your existing 
//     // document with this change, which allows for partial updates too
//     req.body,
    
//     // an option that asks mongoose to return the updated version 
//     // of the document instead of the pre-updated one.
//     {new: true},
    
//     // the callback function
//     (err, todo) => {
//     // Handle any possible database errors
//         if (err) return res.status(500).send(err);
//         return res.send(todo);
//     }
// )


//DELETE
// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
//     // As always, handle any potential errors:
//     if (err) return res.status(500).send(err);
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     // You can really do this however you want, though.
//     const response = {
//         message: "Todo successfully deleted",
//         id: todo._id
//     };
//     return res.status(200).send(response);
// });

module.exports = router;
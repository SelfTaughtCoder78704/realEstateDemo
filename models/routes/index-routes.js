const express = require('express')
const router = express.Router()
const Property = require('../models/property-model')
const mongoose = require('mongoose');

const db = mongoose.connection;


router.get('/', (req, res) => {
    db.collection('props').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('home', {title:'Home', properties: result})
      }) 
})

router.get('/property/:id', (req, res) => {
  let id = req.params.id
  Property.findOne({_id: id}, (err, result) => {
    if(err){
      console.log(err)
    }else{
      res.render('prop-details', {title: 'Property Details Page',property: result})
    }
  })
  
})

router.get('/search', (req, res) => {
  if(req.query.searchBox){
    let zip = req.query.searchBox
    Property.find({zip: zip}, (err, prop) =>{
      if (err) {
        console.log(err)
      }else {
        let noMatch;
        if(prop.length < 1){
          noMatch = "No Match"
          
        }
        res.render('search', {title: "Property Search",property: prop, noMatch: noMatch});
      }
    });
  }else{
    Property.find({}, (err, prop) =>{
      if (err) console.log(err)

      // send the list of all people in database with name of "John James" and age of 36
      // Very possible this will be an array with just one Property object in it.
      return res.render('search', {title: "Property Search",property: prop, noMatch: ''});
    });
  }
  
})



module.exports = router
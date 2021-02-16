const express = require('express');
const router = express.Router();

const Contact = require('../modules/contacts');

// Methods
// Retriving data
router.get('/contacts', (req, res, next) => {
    Contact.find((err, contacts) => {
        res.json(contacts);
    });
});

// Add contact
router.post('/contacts', (req, res, next) => {
    // Logic to add contact
    let newContact = Contact({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email
    });
    newContact.save((err, contact) => {
        if(err){
            res.json({msg: 'Fail to add new contact'});
        } 
        else {
            res.json({msg: 'Contact added sucessuflly'});
        }
    });
});

// Deleting contact
router.delete('/contacts/id', (req, res, next) =>{
    //Logic to delete contact
    Contact.remove({ _id: req.params.id}, (err, result) =>{
        if(err){
            res.json(err);
        }
        else{
            res.json(result)
        }
    });
});

module.exports = router;
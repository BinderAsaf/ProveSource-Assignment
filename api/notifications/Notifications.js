const Notifications = require('../../models/notifications/Notifications');
const express = require('express');
const router = express.Router();


// @route    POST /notifications
// @Info     creates new notifications
// @params   accountId --REQUIRED, name --REQUIRED, color --REQUIRED 
router.post('', async (req,res)=>{
    const {accountId, name, color} = req.body;
    //chack that all args are given
    if (typeof accountId === 'undefined' || typeof name === 'undefined' || typeof color === 'undefined')
        return res.send({err:"missing fields. request must contain accountId, name and color  "})
    
    const notifications = new Notifications({accountId, name, color});
    // add the new notificaion to db
    await notifications.save()
    .then(()=>{
        return res.send({message: 'success'});
    })
    .catch(err=>{
        return res.send({"error": "An error occurred"});	
    })
});



module.exports = router;
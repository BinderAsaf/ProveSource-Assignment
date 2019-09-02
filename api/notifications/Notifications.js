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


// @route    GET /notifications
// @Info     return notification specified by accountId
// @params   accountId --REQUIRED
router.get('',async (req,res)=>{
    const {accountId} = req.query;
    //chack that all args are given
    if (typeof accountId === 'undefined')
        return res.send({err:"missing field. request must contain accountId"})
    
    // return all the notifiction with accountId
    await Notifications.find({accountId}, (err,data)=>{
        return res.send({data})
    }).select("accountId name color -_id");
});


// @route    DELETE /notifications
// @Info     delete notificaions that matches accountId and color
// @params   accountId --REQUIRED, color --REQUIRED
router.delete('',async (req,res)=>{
    const {accountId,color} = req.query;
    //chack that all args are given
    if (typeof accountId === 'undefined' ||  color === 'undefined')
        return res.send({err:"missing fields. request must contain accountId and color  "})
    
    // delete all mached nontificaion from db    
    await Notifications.deleteMany({accountId,color}, (err,result)=>{
        if(err){
            console.log(err)
            return res.send({"error": "An error occurred"});	
        } else {
            console.log(result)
            return res.send({message: 'success',deletedCount:result.deletedCount});	
        }
    })
        
});


module.exports = router;
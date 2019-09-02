const express = require('express');
const router = express.Router();
const Account = require('../../models/account/Account');


// @route    POST /account/create
// @Info     creates new account
// @params   email --REQUIRED, name, age 
router.post('',async function(req, res) {
	const {email, name, age} = req.body;
	//check that an email is given
	if (typeof email === 'undefined')
		return res.send({"error":"Email is required"});
	
	const account = new Account({email, name, age});
	// add the new account to db
	await account.save()
	.then(()=>{
		return res.send({message: 'success'});
	})
	.catch(err =>{
		// An error 11000 is when an email is duplicatted. email is unique!
		if(err.code == 11000)
			return res.send({"error": "Email already exists"});
		else
			return res.send({"error": "An error occurred. chack your input and try again."});		
	});
	
});

module.exports = router;

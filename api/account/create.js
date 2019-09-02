const express = require('express');
const router = express.Router();
const Account = require('../../models/account/Account');

router.post('',async function(req, res) {
	const {email, name, age} = req.body;
	const account = new Account({email, name, age});
	await account.save();
	return res.send({message: 'success'});
});

module.exports = router;

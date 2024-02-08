const express = require('express');
const zod = require('zod');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const { auth } = require("../middlewares/middleware.js")

const router = express.Router();

router.get("/balance",auth,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance: account.balance
    })
})

router.post("/transaction",auth,async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount , to} = req.body;

    const account = await Account.findOne({
        userId:req.userId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(404).json({
            message:"insufficient balance or no Account found"
        })
    }

    const toaccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toaccount){
        await session.abortTransaction();
        return res.status(404).json({
            message:"No Sender address"
        })
    }

    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:+amount
        }
    }).session(session)

    await session.commitTransaction();
    res.json({
        message:"Payment successfull"
    });
});



module.exports = router;
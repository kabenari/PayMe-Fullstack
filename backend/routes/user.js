const express = require('express');
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { User } = require("../db.js")
const { auth } = require("../middlewares/middleware.js")

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async(req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Something happing in the /signup in routes/user.js"
        })
    }

    const alreadyUser = await User.findOne({
        username: req.body.username
    })

    if(alreadyUser){
        res.status(404).json({
            message: "Already and user fam!"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET)


    res.json({
        message: "User created successfully",
        token: token
    })

    res.send("hi")
    console.log("Hi");
})

const signInBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
})

router.post("/signin", async(req,res)=>{
    const { success } = signInBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }   

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password 
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(404).json({
        message: "SOmthing woring during login in"
    })


})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", async(req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information / at 104 user.js"
        })
    }

    await User.updateOne(req.body,{
        _id:req.userId
    })

    res.json({
        message:"Success in updating the user"
    })
});










module.exports = router;
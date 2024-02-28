const express = require('express');
const {body, ValidationChain, validationResult} = require('express-validator');

const validate = (ValidationChain) => {
    return async (req, res, next) => {
        for(let valdiation of ValidationChain){ 
            const result = await valdiation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return  next();
        }
        return res.status(200).json({error: errors});
    }

}

const signUpValidator = [
    body("email").trim().isEmail().withMessage("Invalid email id"),
    body("password").trim().isLength({min : 8}).withMessage("Password must have minimum of 8 characters")
];

module.exports = {validate, signUpValidator};
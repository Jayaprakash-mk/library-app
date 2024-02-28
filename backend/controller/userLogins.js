const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const getUser = async (req,res,next) => {
    
    try{
        const {email,password} = req.body;
        console.log(email);
        console.log(password);
        const user = await prisma.User.findFirst({
                where: {
                    email: {
                        equals: email,
                    }    
                }
        });

        if (!user) {
            // Handle case where user with the provided email is not found
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(user.password);
        if (user.password === password) {
            if(email === "Admin123@gamil.com"){
                return res.status(200).json({message: true, isAdmin: true});
            }
            else {
                return res.status(200).json({message: true, isAdmin: false});
            }
            //console.log('Password is correct');
        } else {
            return res.status(200).json({message: false});
            //console.log('Incorrect password');
        }
        //const hashedPassword = user.password;
        //console.log(user.password);
        // bcrypt.compare(password, hashedPassword, (err, result) => {
        //     if (err) {
        //       // Handle error (e.g., log or return an error response)
        //       console.error(err);
        //       return;
        //     }
          
        //     if (result) {
        //       res.status(200).json({message: true});
        //       console.log('Password is correct');
        //     } else {
        //       res.status(200).json({message: false});
        //       console.log('Incorrect password');
        //     }
        // });
    } catch (err) {
        console.error('Error during user login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req,res,next) => {

    try{
        const {email, password} = req.body;
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = email.split('@');
        console.log(emailRegex.test(email))
        if (!emailRegex.test(email) || (domain.length !== 2)) {

            return res.status(200).json({message: "Invalid email id"});
        }
        console.log(password);
        if(password.length < 6 || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password)) || !(/\d/.test(password))){
            
            return res.status(200).json({message: "weak password error"})
        }

        //const hashedPassword = await bcrypt.hash(password, 10);
        //const hashedPassword = password;
        //console.log(hashedPassword);
        const users = await prisma.User.create({
            data : {
                email: email,
                password: password
            },
        });
        // await user.save();
        console.log(users);
        return res.status(200).json({message: "successfully Signed up!!!", users});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "Something wrong!!!", cause: err.message});
    }
}

module.exports = {getUser, createUser};
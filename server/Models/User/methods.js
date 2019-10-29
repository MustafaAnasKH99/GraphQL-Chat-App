const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const User = require('./model');
const Chat = require('../Chat/model');

// Create New User
exports.createNewUser = async function(params) {
    return new Promise((resolve, reject) => {
        
        User.findOne({mobile: params.mobile}, (error, user) => {
            if (user != null) {
                reject(new ApolloError("User Already Exists"));
            } else {
                var hashedPassword = bcrypt.hashSync(params.password, salt);
                const user = {
                    name: params.name,
                    email: params.email,
                    mobile : params.mobile,
                    password: hashedPassword,
                    createdAt: new Date().toISOString(),
                };
                
                // Create new User
                console.log('newUser')
                const newUser = new User(user);
                console.log(newUser)

                // Add new user to the public chat (push id to chats array)
                Chat.findOne({_id: "5da53f50a4d559229fcb6060"}, (err, chat) => {
                    chat.users.push(newUser._id)
                    chat.save()
                })
                
                newUser.save()

                // Resolve New User
                resolve(newUser);    
            }
        });
    })
}

// Login User & Return JWT Token
exports.loginUser = async function(params) {
    console.log('loginUser works');
    console.log(params.mobile)
    console.log(params.password)
    return new Promise((resolve, reject) => {
        const user = User.findOne({
            mobile: params.mobile
        }, (err, user) => {
            console.log('user', user);
            var loginUser = user;
            var newToken = jwt.sign({
                mobile: loginUser.mobile
            }, 'abraCadabraTheMagicWorkd'); // Change the secret as you wish.
            // console.log(newToken);
            if (bcrypt.compareSync(params.password, loginUser.password)) {
                User.updateOne({
                    mobile: loginUser.mobile
                }, {
                    token: newToken
                }, (err, user) => {
                    console.log('User Token', newToken);
                    resolve(newToken);
                });
            }
        }).populate('role');
    })    
}

// Fetch Current Logged In User by Token
exports.fetchCurrentUser = async function(context) {
    console.log('context')
    console.log(context)
    return new Promise((resolve, reject) => {
        if (!context.user) {
            reject(new ApolloError("Login Required"));
        }
        resolve(context.user);
    })
}

exports.fetchAllUsers = async function(context){
    return new Promise((resolve, reject) => {
        console.log('promise works - fetching users');
        User.find({}, (err, users) => {
            resolve(users);
       })
    })
}
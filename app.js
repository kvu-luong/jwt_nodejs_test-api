const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Test api with jwt'
    });
});

app.post('/api/posts',verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res)=>{
    //mock user
    const user = {
        id: 1,
        username: 'brad',
        email:'testjwt@gmail.com',
        data:'testing, data , be'
    }

    jwt.sign({user: user}, 'secretkey',{ expiresIn: '30s'}, (err, token)=>{
        res.json({
            token
        })
    })
})
//Format of token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next){// middleware
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is underfined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        next();

    }else{
        //Forbidden
        res.sendStatus(403);
    }
}
app.listen(5000, ()=> console.log('Server started on port 5000'));
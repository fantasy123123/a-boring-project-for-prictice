const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const cors=require('cors');

let users=[{"studentNumber":1,"pwd":"123","phone":123},{"studentNumber":2,"pwd":"123123","phone":123123}];

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.get('/users',(req,res)=>{
    res.send(users);
})

app.put('/users',(req,res)=>{
    console.log(users)

    if(req.query.type==='changePwd') {
        for (let i = 0; i < users.length; i++) {
            if (users[i].studentNumber === parseInt(req.query.studentNumber)) {
                users[i].pwd = req.query.newPwd;
                break;
            }
        }
    }

    if(req.query.type==='addUser'){
        let user={"studentNumber":parseInt(req.query.studentNumber),"pwd":req.query.pwd,"phone":parseInt(req.query.phone)}
        users.push(user);
    }

    console.log(users)
    res.send(req.body)
})

app.listen(3000,()=>{
    console.log('running')
})
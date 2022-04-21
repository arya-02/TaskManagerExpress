const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

let task = [];
let complete = [];

app.set('view engine','ejs');

app.post('/addtask',(req,res)=>{
    let newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
})

app.post('/completetask',(req,res)=>{
    let completeTask = req.body.check;
    if(typeof completeTask === 'string'){
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask),1);
    }
    else if(typeof completeTask === 'object'){
        for(let i =0;i<completeTask.length;i++){
            task.splice(task.indexOf(completeTask[i]),1);
        }
    }
    res.redirect('/');
});

app.post('/removetask',(req,res)=>{
    let removeTask = req.body.check;
    if(typeof removeTask === 'string'){
        task.splice(task.indexOf(removeTask),1);
    }
    else if(typeof removeTask === 'object'){
        for(let i =0;i<removeTask.length;i++){
            task.splice(task.indexOf(removeTask[i]),1);
        }
    }
    res.redirect('/');
});


app.post('/removeall',(req,res)=>{
    task.splice(0,task.length);
    complete.splice(0,complete.length);
    res.redirect('/');
});

app.get('/',(req,res)=>{
    res.render('index',{task:task,complete:complete});
});

app.listen(3000,()=>{
    console.log('Server running at port number 3000!');
});
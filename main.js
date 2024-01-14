//importing the library 
var express = require("express")
var mysql = require("mysql")
//declaring app :these middleware function use to access the request object and response object
var app =express()
//we will be passing data in the form of json,and app.use is a middle ware for request object and response object
app.use(express.json())


//creating connection variable
const con = mysql.createConnection({
    //hostuser,password,database names
    host:'localhost',
    user:'root',
    //or try with root123
    password:'@India2024',
    database:'newdb'

})

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected !")
    }
})

//this path is going to come in our postman url
app.post('/post',(req,res)=>{
    //passing 3variables and this 3variables should be there in sql table as well

    // i will be passing all  this to postman as a json and it will be caught by this variables over here,so we are using req.body,in case if you are passing through your param i.e /post then it will be req.param.name etc so on ,but here we are passing through body
    const  name = req.body.name;
    const  id = req.body.id;
    const  mark = req.body.mark;

    //we are writing simple sql query to post this data in mysql database
    //this is our connection variable i.e used above in db creation
    //here mytable is the table name created inside our sql database,and we are using 3 ? marks since we used 3 variables
    con.query('insert into mytable  values(?,?,?)',[id,name,mark],(err,result)=>{
        if(err){
        console.log(err)
        }else{
            //if every thing is working then we will be getting response in postman
                res.send('posted')
        }
    })

})

//starting the server
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("on port 3000");
    }
})
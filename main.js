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
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



//query to fetch the data from our mysql database
//we will be using get function and we will be fetch the data,and specifing the path,and a req,res call back function
app.get("/fetch",(req,res)=>{
    //specifying the query,for that we will be using connection variable name
    //this query is an function,and inside paranthesis we need to write query which was written inside our mysql table,and it will also have a call back function
    con.query("select * from mytable",function(err,result,fields){
        //here we will be using error and fields
        if(err){
            console.log(err)
        }else{
            //by this below line we will be getting output inside the postman
            res.send(result)
            //by this we will be getting output inside the console terminal
            // console.log(result)

            //with the below one help we will be geeting output in the form of list
            // console.log(JSON.parse(JSON.stringify(result)))

            //inorder to access it individually
            // var r = JSON.parse(JSON.stringify(result))
            // console.log(r[0])
            // console.log(r[1].name)
        }
    })
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("on port 3000");
    }  
})
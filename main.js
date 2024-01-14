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




//latest db

//Fetching data by using id
//here using .get because we are going to fetch the available data by id thats it we are not creating new

//here we will be passing id in the form of parameter
app.get("/fetchbyid/:id",(req,res)=>{
    //we need to extract id passing as a parameter
    const fetchid = req.params.id;
    //note :this id should be same to our database column id name i.e 
    //we will be writing a normal query ,here we used a table name,and we need to use where class
    //note:this id should be a column in  our table,this fetchid is created as a variable above,here we created it as a result ,but here we can name it anything and this contains data of this particular id
    con.query('select * from mytable where id = ?',fetchid,(err,result)=>{
        if(err){
            console.log(err)
            }else{
                //1.to get the data in the postman below one
                    // res.send(result)
                    //2.to get the data in the console terminal below one`but in the form of  rootdatapacket
                    // console.log(result)

                   



                    //if we try to acces the id which dont have in our database then we will be getting an empty array
                    if(result.length==0){
                        console.log("id not found in database");
                    }
                    else{
                        //  3.to get the above rootdata packet in the form of json is like this below 
                    var value = JSON.parse(JSON.stringify(result))
                    console.log(value);
                    //4.to acces it by index value
                    console.log(value   [0].name)
                    console.log(value   [0].mark)

                    }

                    
            }

    })
})


//update method,here am going with parameter ,we can use it as body as well
app.put("/update/:id",(req,res)=>{
    const upid = req.params.id;
    //this is body because am going to pass it as a payload for postman
    const name =req.body.name;
    const mark =req.body.mark;

    //sql query to update it is going to be our connection variable,since we are changing the name and mark we are keeping it as a question mark and we will be using the WHERE clause,fetching all the above we mentioned ,and it will be having a call back as well
    con.query('UPDATE mytable SET name=?,mark=? WHERE id=?',[name,mark,upid],(err,result)=>{
        if(err){
            console.log(err)
            }else{
                    // res.send('UPDATED')
                    // //with the below one help if the id is not there then we will  be getting output in the terminal that  okpacket and some  json ...on it...and if the id is not present then the affected rows count will be zero  in the terminal ,if the id is present then the affected rows will be 1
                    // console.log(result);


                    if(result.affectedRows == 0)
                    {
                        res.send("id is not present");
                    }else{
                        res.send("updated")
                    }
                    
            }      
    })


})

//delete function
// //passsing id as a parameter method
// app.delete('/deletedata/:id',(req,res)=>{
//     //note:this particular id should be at column in your table
//     const delid  = req.params.id;
//     //simple sql query to delete,here mytable is the table name,specify delete id i.e delid
//     con.query('delete from mytable where id=?',delid,(err,result)=>{
//         if(err){
//             console.log(err)
//             }else{
//                 //this affected rows tell us no of  rows getting changed 
//                     if(result.affectedRows ==0){
//                         res.send("id not present")
//                     }else{
//                         res.send("deleted")
//                     }
//             }
//     })

// })



//deleting as a body value,this is big huge process because we need to pass json with id in the postman ,body,raw,json
 // {id:2}

app.delete('/deletedata/:id',(req,res)=>{
    //note:this particular id should be at column in your table
    const delid  = req.body.id;
    //simple sql query to delete,here mytable is the table name,specify delete id i.e delid
    con.query('delete from mytable where id=?',delid,(err,result)=>{
        if(err){
            console.log(err)
            }else{
                //this affected rows tell us no of  rows getting changed 
                    if(result.affectedRows ==0){
                        res.send("id not present")
                    }else{
                        res.send("deleted")
                    }
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
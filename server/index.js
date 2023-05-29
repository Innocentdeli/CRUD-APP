const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql')
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'crud_database'
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(5000, ()=> {

    console.log("Server is running on port 5000")
})

app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

app.post("/api/post", (req,res)=>{
    const {name, email, contact} = req.body;
    const sqlinsert = "INSERT INTO  contact_db (name, email, contact) VALUES(?,?,?)"; 
    db.query(sqlinsert, [name, email, contact], (error, result)=>{
        if(error){
            console.log(error)
        }
    });
});

app.post("/api/remove/:id", (req,res)=>{
    const {id} = req.params;
    const sqlremv = "DELETE FROM contact_db WHERE id=?"; 
    db.query(sqlremv, id, (error, result)=>{
        if(error){
            console.log(error)
        }
    });
})

app.get('/', (req,res) => {
    // const sqlinsert = "INSERT INTO  contact_db (name, email, contact) VALUES('John', 'john@gmail.com', 1234567)";
    // db.query(sqlinsert,(err, result) =>{
    //     console.log('errro', err)
    //     console.log('result',result);
        
    // })
    // res.send('hello Express')
})
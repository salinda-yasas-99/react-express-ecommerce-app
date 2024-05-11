import mysql from 'mysql'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"shoe_heaven"
})

let isDBConnected =false;

db.connect((err)=>{
    if(err){
        console.log("Error Connecting MYSQL",err.message);
    } else{
        isDBConnected=true;
        console.log("Connected to MYSQL Server");
    }
})
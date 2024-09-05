const PORT = 3017;
const http = require("http");
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");
const {MongoClient, ObjectId} = require("mongodb");
const { Collection } = require("mongodb");
const { log } = require("console");
const client = new MongoClient("mongodb://127.0.0.1:27017/");
const app = http.createServer(async (req,res)=>{
    const db = client.db("BloodDon");
    const collection = db.collection("doners");
    let path=url.parse(req.url)
    console.log(path);
    console.log(req.method);
    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"));

    }
    else if(path.pathname=="/js/custom.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/custom.js"));
    }
    else if(path.pathname=="/pages/Add.html"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/pages/Add.html"));
    }
    if(path.pathname == "/submit" && req.method == "POST"){
        let body = "";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        });
        req.on("end",async()=>{
            const formData=queryString.parse(body);
            console.log(formData);
            collection.insertOne(formData).then(()=>{
                console.log("sucess");
                
            })
            .catch((error)=>{
                console.log(error);
                
            });
            
        });
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"));
    }
    if(path.pathname == "/getdonors" && req.method=="GET"){
        const data=await collection.find().toArray();
        const jsonData=JSON.stringify(data);
        console.log(jsonData);
        console.log(data);
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData);
        
    }
    if(path.pathname=="/delete" && req.method=="DELETE"){
        console.log("reached delete route");
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            let _id= new ObjectId(body)
            console.log(_id);
            collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("Fail")
            })
            
        })
        
    }
    if(req.method=="PUT" && path.pathname=="/update"){
        console.log("reached update route ");
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            let data = JSON.parse(body);
            let _id= new ObjectId(data.id);
            let updateData={
                name:data.name,
                email:data.email,
                phone:data.phone,
                bgrp:data.bgrp,
                gender:data.gender

            }
            await collection.updateOne({_id},{set:updateData}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("success")
            }).catch(()=>{
                res.writeHead(400,{"Content-Type":"text/plain"});
                res.end("failed")
            })
        })
    }
});
client.connect().then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`server created http://localhost:${PORT}`);
        
    });
    
}).catch((error)=>{
    console.log(error);
    
})
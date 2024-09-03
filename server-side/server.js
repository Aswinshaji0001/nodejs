const http = require("http");
const fs = require("fs");
const url = require("url");
const queryString = require("querystring");
const {MongoClient} = require("momgodb");
const { Collection } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017/");
const app = http.createServer((req,res)=>{
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
            Collection.insertOne(formData).then(()=>{
                console.log("sucess");
                
            })
            .catch((error)=>{
                console.log(error);
                
            });
            
        });
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"));
    }
});
app.listen(3008);
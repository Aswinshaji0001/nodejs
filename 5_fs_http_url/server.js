const http = require("http");
const fs = require("fs");
const url = require("url");
http.createServer((req,res)=>{
    let newUrl = url.parse(req.url)
    console.log(newUrl);
    if(newUrl.pathname=="/"){
        fs.readFile("index.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type": "text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(data);
            res.end;

        });
    }
    else if(newUrl.pathname=="/about"){
        fs.readFile("about.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type": "text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(data);
            res.end;

        });
    }
    else{
        fs.readFile("error.html",(error,data)=>{
            if(error){
                res.writeHead(404,{"Content-Type": "text/html"})
                return res.end("Page not found")
            }
            res.writeHead(200,{"Content-Type": "text/html"})
            res.write(data);
            res.end;

        });
    }
    
}).listen(3001);

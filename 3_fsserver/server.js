const http = require("http")
const fs = require("fs")
const app =http.createServer((req,res)=>{
    fs.readFile("index.html",(error,data)=>{
            if(error){
                console.log("error");
                
            }
            else{
                res.write(data);
                res.end();
                
            }
    })
})
app.listen(3000);
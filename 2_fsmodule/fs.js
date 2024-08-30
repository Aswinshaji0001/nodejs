const fs = require("fs");

fs.writeFile("message.txt","Have a great day",(error) =>{
        if(error){
            console.log("unable to write data");
            
        }
});

fs.appendFile("message.txt"," today is a great day",(error)=>{
        if(error){
            console.log("unable to write data");
            
        }
});

fs.readFile("message.txt","utf-8",(error,data)=>{
        if(error){
            console.log("Unable to read");
            
        }
        else{
            console.log(data);
            
        }
});

fs.unlink("message.txt",(error)=>{
    if(error){
        console.log("unable to delete");
        
    }
})

fs.mkdir("pages",(error)=>{
        if(error){
            console.log("unable to delete");
            
        }
})

fs.readdir("pages",(error,data)=>{
        if(error){
            console.log("unale to delete");
            
        }
        else{
            console.log(data);
            
        }
})

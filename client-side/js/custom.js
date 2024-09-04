async function  getDonor(){

    const res= fetch("http://localhost:3010/getdonors")
    const data = await (await res).json();
    str=``
    data.map((dt)=>{
            str+=`<div class="con1">
            <input type="text" name="name"  value=${dt.name} id="name" placeholder="Name" class="input-box">
            <input type="text" name="email" value=${dt.email} id="email" placeholder="Email" class="input-box">
            <input type="text" name="phone" value=${dt.phone} id="phone" placeholder="Phone" class="input-box">
            <input type="text" name="bgrp"  value=${dt.bgrp} id="bgrp" placeholder="Blood Group" class="input-box">
            <input type="text" name="gender" value=${dt.gender} id="gender" placeholder="Gender" class="input-box">
            <button class="btn-edit">Edit</button>
            <button class="btn-save">Save</button>
            <button class="btn-delete" onclick="handleDelete('${dt._id}')">Delete</button>
        </div>`
    })
    document.getElementById("main").innerHTML=str;
}
getDonor();

async function handleDelete(id) {
    const res = await fetch("http://localhost:3010/delete",{
        method:"DELETE",
        headers:{"ContentType":"text/plain"},
        "body":id
    })
    console.log(res);
    const data=await res.text();
    if(data=="success"){
        alert("successfully deleted");
        getDonor();
    }
    else{
        alert("Deletion Failed");
    }
}


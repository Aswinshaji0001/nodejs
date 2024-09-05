async function  getDonor(){

    const res= fetch("http://localhost:3018/getdonors")
    const data = await (await res).json();
    str=``
    data.map((dt)=>{
            str+=`<div class="con1">
            <input type="text" name="name"  disabled="true" value=${dt.name} id="name-${dt._id}" placeholder="Name" class="input-box">
            <input type="text" name="email"  disabled="true" value=${dt.email} id="email-${dt._id}" placeholder="Email" class="input-box">
            <input type="text" name="phone"  disabled="true" value=${dt.phone} id="phone-${dt._id}" placeholder="Phone" class="input-box">
            <input type="text" name="bgrp"   disabled="true" value=${dt.bgrp} id="bgrp-${dt._id}" placeholder="Blood Group" class="input-box">
            <input type="text" name="gender"   disabled="true" value=${dt.gender} id="gender-${dt._id}" placeholder="Gender" class="input-box">
            <button class="btn-edit" onclick="handleEdit('${dt._id}')">Edit</button>
            <button class="btn-save" onclick="handleSave('${dt._id}')">Save</button>
            <button class="btn-delete" onclick="handleDelete('${dt._id}')">Delete</button>
        </div>`
    })
    document.getElementById("main").innerHTML=str;
}
getDonor();

async function handleEdit(id){
    let name = document.getElementById(`name-${id}`);
    name.disabled=false;
    let email = document.getElementById(`email-${id}`);
    email.disabled=false;
    let phone = document.getElementById(`phone-${id}`);
    phone.disabled=false;
    let bgrp = document.getElementById(`bgrp-${id}`);
    bgrp.disabled=false;
    let gender = document.getElementById(`gender-${id}`);
    gender.disabled=false;
}

async function handleDelete(id) {
    const res = await fetch("http://localhost:3018/delete",{
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

async function handleSave(id){
    let name = document.getElementById(`name-${id}`).value;
    let email = document.getElementById(`email-${id}`).value;
    let phone = document.getElementById(`phone-${id}`).value;
    let bgrp = document.getElementById(`bgrp-${id}`).value;
    let gender = document.getElementById(`gender-${id}`).value;
    console.log(name,email,phone,bgrp,gender);
    let data = {id,name,email,phone,bgrp,gender};
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res = await fetch("http://localhost:3018/update",{
        "method":"put",
        "Content-Type":"text/json",
        "body":jsonData
    });
    console.log(res);
    const result = await res.text();
    console.log(result);
    if(result=="success"){
        alert("Updated successfully")
        getDonor();
    }
    else{
        alert("not updated")
    } 
}



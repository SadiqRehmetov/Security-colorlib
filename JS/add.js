

let image=document.querySelector("#blogImage");
let blogHiding=document.querySelector("#head");
let blogInfo=document.querySelector("#info");
let form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let newBlog={};
    let src = image.files[0];
    console.log(src);
    const reader=new FileReader();
    reader.onload=function(e){
        newBlog={
            image: e.target.result,
            heading: blogHiding.value,
            info: blogInfo.value
        }
        axios.post(`http://localhost:3000/blog`, newBlog)
    }
    reader.readAsDataURL(src);
    window.location="./index.html";
})
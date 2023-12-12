

let blogCart = document.querySelector(".blog-cart");
let nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.519)";
    } else {
        nav.style.backgroundColor = "black";
    }
});

function favoritesData(){
    fetch(`http://localhost:3000/favorites`)
    .then(res=>res.json())
    .then(respons=>{
        respons.forEach(element => {
            blogCart.innerHTML+=`
            <div class="cart">
            <div class="image">
                <img src="${element.image}" alt="picture">
            </div>
            <span class="date">10 Jan 2018</span>
            <h3>${element.heading}</h3>
            <p>${element.info}</p>
            <div class="cart-footer">
                <span><i class="bi bi-heart" onclick="favBlog(${element.id})"></i> 15 Likes</span>
                <span><i class="bi bi-chat-right"></i> 02 Comments</span>
            </div>
            <button onclick="deleteFav(${element.id})">Delete</button>
        </div>
            `
        });
    })
    // .catch(console.error(error))

}
function deleteFav(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
    window.location.reload()
}
favoritesData();
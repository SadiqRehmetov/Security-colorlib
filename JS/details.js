let servicesCart = document.querySelector(".services-cart");
let blogCart = document.querySelector(".blog-cart");
let menuList = document.querySelector(".bi-list");
let menu = document.querySelector(".menu");
let closeMenu = document.querySelector(".clse");
let nav = document.querySelector("nav");
let responsMenu = document.querySelector(".responsMenu");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.519)";
    } else {
        nav.style.backgroundColor = "black";
    }
})

menuList.addEventListener("click", () => {
    menu.style.display = "flex";
    responsMenu.style.transform = "translateX(0)";
})
closeMenu.addEventListener("click", () => {
    menu.style.display = "none";
    responsMenu.style.transform = "translateX(-400%)"
})

let id = new URLSearchParams(window.location.search).get("id")
fetch(`http://localhost:3000/blog/${id}`)
    .then(res => res.json())
    .then(respons => {
        console.log(respons.image);
        blogCart.innerHTML += `
            <div class="cart">
            <div class="image">
                <img src="${respons.image}" alt="picture">
            </div>
            <span class="date">10 Jan 2018</span>
            <h3>Addiction When Gambling Becomes A Problem</h3>
            <p>inappropriate behavior ipsum dolor sit amet, consectetur.</p>
            <div class="cart-footer">
                <span><i class="bi bi-heart"></i> 15 Likes</span>
                <span><i class="bi bi-chat-right"></i> 02 Comments</span>
            </div>
        </div>
            `

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
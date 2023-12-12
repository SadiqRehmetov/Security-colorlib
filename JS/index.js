let servicesCart = document.querySelector(".services-cart");
let blogCart = document.querySelector(".blog-cart");
let menuList = document.querySelector(".bi-list");
let menu = document.querySelector(".menu");
let closeMenu = document.querySelector(".clse");
let nav = document.querySelector("nav");
let responsMenu = document.querySelector(".responsMenu");
let loadMore = document.querySelector(".load");
let page = 1;
let image = document.querySelector("#blogImage");
let blogHiding = document.querySelector("#head");
let blogInfo = document.querySelector("#info");
let form = document.querySelector("form");
let updateBlog = document.querySelector(".updateBlog");
let backButton = document.querySelector(".back");
let like = document.querySelector(".bi-heart");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.519)";
    } else {
        nav.style.backgroundColor = "";
    }
})
menuList.addEventListener("click", () => {
    menu.style.display = "flex";
    responsMenu.style.left = "0";
})
closeMenu.addEventListener("click", () => {
    menu.style.display = "none";
    responsMenu.style.left = "-400%"
})
function securityData() {
    fetch(`http://localhost:3000/services`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                servicesCart.innerHTML += `
                    <div class="cart">
                        <div class="image">
                            <img src="${element.image}" alt="picture">
                        </div>
                        <h3>${element.heading}</h3>
                        <p>${element.info}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.log(err));
    fetch(`http://localhost:3000/blog?_page=${page}&_limit=4`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                blogCart.innerHTML += `
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
            <div class="buttons"><a href="../details.html?id=${element.id}"><button>VIEW DETAILS</button></a>
            <button onclick="deleteBlog(${element.id})">Delete</button>
            <button onclick="updateButton(${element.id})">Update</button></div>
        </div>
            `
            })
        })
}
function load() {
    page++;
    securityData();
    loadMore.style.display = "none";
}
function deleteBlog(id) {
    axios.delete(`http://localhost:3000/blog/${id}`)
    window.location.reload()
}
function updateButton(id) {
    console.log(id);
    updateBlog.style.display = "flex";
    backButton.addEventListener("click", (e) => {
        e.preventDefault();
        updateBlog.style.display = "none";
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/blog`)
        let src = image.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
            obj = {
                image: e.target.result,
                heading: blogHiding.value,
                info: blogInfo.value
            }
            axios.patch(`http://localhost:3000/blog/${id}`, obj)
        }
        reader.readAsDataURL(src)
    })
}
function favBlog(id) {
    event.target.classList.remove("bi-heart")
    event.target.classList.add("bi-heart-fill")
    axios.get(`http://localhost:3000/blog/${id}`)
        .then(blog => {
            return blog.data
        })
        .then(blog => {
            axios.get(`http://localhost:3000/favorites`)
                .then(blogdata => {
                    let newId = blogdata.data.find(f => f.id === blogdata.id);
                    if (newId) {
                        axios.delete(`http://localhost:3000/favorites/${newId.id}`)
                    } else {
                        axios.post(`http://localhost:3000/favorites`, blog)
                    }
                })
        })
        .catch(err => console.log(err))

}
securityData();
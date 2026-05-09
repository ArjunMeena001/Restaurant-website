 
const menuData = {
    main: [
        { name: "PALAK PANEER", price: "$30", desc: "phasellus, varius, pellentesque, arcu, eu accumsan, purus volutpat", img: "images/main-01.png" },
        { name: " JOOJEH", price: "$45", desc: "donec id, lacus vel, elit, dapibus, porttito,", img: "images/main-02.png" },
        { name: "Second Item", price: "$30", desc: "nullam ultricies, nisl sed, dignissim ullamcorper, ut sagittis, bibendum", img: "images/main-03.png" },
        { name: "Grilled Chicken with Fresh Cherry Salsa", price: "$30", desc: "in luctus, felis leo, non volutpat, ligula, bibendum in, pellentesque, habitant", img: "images/main-01.png" },
        { name: "Persian Chicken Joojeh Kebabs", price: "$30", desc: "sed id risus, ac sapien, tincidunt, porta ac sed, lorem", img: "images/main-02.png" },
        { name: "Spicy Pork Vindaloo", price: "$30", desc: "morbi, tristique, senectus, et netus, malesuada, fames ac, turpis, egestas", img: "images/main-03.png" }
    ],
    side: [
        { name: "ROGAN JOSH", price: "$32", desc: "Traditional lamb curry", img: "images/sides-01.jpg" },
        { name: "GARLIC NAAN", price: "$10", desc: "Butter naan with garlic toppings", img: "images/sides-02.jpg" },
        { name: "ROGAN JOSH", price: "$32", desc: "Traditional lamb curry", img: "images/sides-03.jpg" },
        { name: "GARLIC NAAN", price: "$10", desc: "Butter naan with garlic toppings", img: "images/sides-04.jpg" },
        { name: "ROGAN JOSH", price: "$32", desc: "Traditional lamb curry", img: "images/sides-05.jpg" },
    ]
};

const dessertData = {
    dessert: [
        { name: "CHOCOLATE MOUSSE", price: "$9", desc: "magna nunc cursus, sapien, vel facilisis", img: "images/dessert-01.jpg" },
        { name: "ROASTED STRAWBERRY", price: "$7", desc: "accumsan, purus, nibh viverra, turpis...", img: "images/dessert-02.jpg" },
        { name: "CHOCOLATE MOUSSE", price: "$9", desc: "magna nunc cursus, sapien, vel facilisis", img: "images/dessert-05.jpg" },
        { name: "ROASTED STRAWBERRY", price: "$7", desc: "accumsan, purus, nibh viverra, turpis...", img: "images/dessert-06.jpg" }
    ],
    beverage: [
        { name: "MIXED FRUIT TART", price: "$4", desc: "portitor, lorem, ipsum, dolor, turpis", img: "images/beverage-03.jpg" },
        { name: "STRAWBERRY GLAZED DONUT", price: "$3", desc: "quis tortor, nunc tristique, enim, commodo", img: "images/beverage-04.jpg" },
        { name: "MIXED FRUIT TART", price: "$4", desc: "portitor, lorem, ipsum, dolor, turpis", img: "images/beverage-03.jpg" },
        { name: "STRAWBERRY GLAZED DONUT", price: "$3", desc: "quis tortor, nunc tristique, enim, commodo", img: "images/beverage-04.jpg" }
   
    ]
};

// 2. Common Render Function
function renderSection(containerId, data) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = data.map(dish => `
        <div class="menu-item">
            <img src="${dish.img}" class="dish-img">
            <div class="dish-info">
                <div class="dish-header-wrapper">
                    <span class="dish-name">${dish.name}</span>
                    <div class="dish-dots"></div> <span class="dish-price">${dish.price}</span>
                </div>
                <p class="dish-desc">${dish.desc}</p>
                <button class="add-to-cart-btn" data-name="${dish.name}" data-img="${dish.img}" data-price="${dish.price}">ADD TO CART</button>
            </div>
        </div>
    `).join('');
}

// 3. Toggle Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Section 1: main tuoggle
    const mainToggle = document.getElementById('dish-toggle');
    renderSection('menu-container', menuData.main);

    if(mainToggle) {
        mainToggle.addEventListener('change', () => {
            const type = mainToggle.checked ? 'side' : 'main';
            renderSection('menu-container', menuData[type]);
            document.getElementById('label-main').classList.toggle('active', !mainToggle.checked);
            document.getElementById('label-side').classList.toggle('active', mainToggle.checked);
        });
    }

    // Section 2: Dessert Toggle
    const dessertToggle = document.getElementById('dessert-toggle');
    renderSection('dessert-container', dessertData.dessert);

    if(dessertToggle) {
        dessertToggle.addEventListener('change', () => {
            const type = dessertToggle.checked ? 'beverage' : 'dessert';
            renderSection('dessert-container', dessertData[type]);
            document.getElementById('label-dessert').classList.toggle('active', !dessertToggle.checked);
            document.getElementById('label-beverage').classList.toggle('active', dessertToggle.checked);
        });
    }
});








// llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll

//  ab yah se me add to cart  side4 bar hide and show bala code likeh rarha hu 
let add_cart_sidebar=document.querySelector(".add-to-cart-section");
// hide-add-cart-toggle
let atc_main_button=document.querySelector(".add-cart-logo");
atc_main_button.addEventListener("click",()=>{
    add_cart_sidebar.classList.toggle("hide-add-cart-toggle");
});

let cross_btn_atc=document.querySelector(".cross-button-atc");
cross_btn_atc.addEventListener("click",()=>{
    add_cart_sidebar.classList.toggle("hide-add-cart-toggle");
});


//ye sum total calculate karne ka hai 
function calculateTotal() {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
}

function updatetotalsum(totalsum) {
      let total=document.querySelector(".subtoalprice-atc");
      total.innerHTML="$"+totalsum;
         
}

// ab yaha se add to cart me se cart me jayega bo add karna hai 
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  
let atc_button=document.querySelector(".menu-list-section");
atc_button.addEventListener("click",(e)=>{
    
   
       if (e.target.classList.contains("add-to-cart-btn")) {
      console.log(e.target.dataset);
      addtocart(e.target.dataset);
    }
});

function addtocart(product){
const item=cart.find(p=>p.name ===product.productName);

if (item) {
     item.qty += 1;
}else{
    cart.push({
       name: product.name,
      img: product.img,
      price: getNumberPrice(product.price),
      qty: 1
    });
}
localStorage.setItem("cart",JSON.stringify(cart));

rander_card();
updatetotalsum(calculateTotal());
}

function getNumberPrice(price) {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}
rander_card();
function rander_card() {
      let cards_parent=document.querySelector(".card-section-of-addtocart");
       cards_parent.innerHTML=cart.length===0?"no Products":cart.map(item=>`
       <div class="card-add-to-cart-section" data-name="${item.name}">
                <div class="card-img-plus-quatitty-atc" ">
                    <div class="img-atc-div"><img src="${item.img}" alt="" class="img-tag-atc"></div>
                    <div class="name-quantity-card">
                        <div class="name-product-atc">
                                ${item.name}
                        </div>
                        <div class="quantity-atc">
                          <div class="minus-atc box-atc">-</div>
                          <div class="cnt-quatity-atc box-atc">
                            ${item.qty}
                          </div>
                          <div class="plus-atc box-atc">
                            +
                          </div>
                        </div>
                    </div>

                </div>

                <div class="cross-sign-plus-price">
                    <div class="crosssign-atc">
                        <i class="fa-regular fa-circle-xmark cross-sign-atc-itag"></i>
                    </div>
                    <div class="price-product-atc">
                         $${Number(item.price)}
                    </div>
                </div>
            </div>`).join("");
updatetotalsum(calculateTotal());

    
}





//yah par remvoe banan rh ahu 

let cross_signatc=document.querySelector(".card-section-of-addtocart");

cross_signatc.addEventListener("click",(e)=>{
        const cross = e.target.closest(".crosssign-atc");
  if (!cross) return; // ❗ yahin stop

  const card = cross.closest(".card-add-to-cart-section");
  if (!card) return; 
  const productName = card.dataset.name;
  console.log(productName);
  
  remove_fromcart(productName);
});
function remove_fromcart(name) {
     cart = cart.filter(item => item.name !== name);

  localStorage.setItem("cart", JSON.stringify(cart));
  rander_card();
}


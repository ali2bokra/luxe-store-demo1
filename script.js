let cartCount = 0;
let selectedColors = {};
let selectedSizes = {};
let currentPopupProduct = null;

// Add to Cart with animation
function addToCart(name, price, productElement){
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;

  let li = document.createElement("li");
  li.innerText = name + " " + price;
  document.getElementById("cart-items").appendChild(li);

  document.getElementById("cart-total").innerText = cartCount;

  // Animation
  let imgClone = productElement.querySelector("img").cloneNode();
  imgClone.style.position = "absolute";
  let rect = productElement.getBoundingClientRect();
  imgClone.style.top = rect.top + "px";
  imgClone.style.left = rect.left + "px";
  imgClone.style.width = rect.width + "px";
  imgClone.style.transition = "all 0.8s ease";
  document.body.appendChild(imgClone);
  setTimeout(() => {
    imgClone.style.top = "20px";
    imgClone.style.left = window.innerWidth - 60 + "px";
    imgClone.style.width = "40px";
    imgClone.style.opacity = "0";
  },10);
  setTimeout(() => document.body.removeChild(imgClone),800);
}

// Cart toggle
function toggleCart(){
  document.getElementById("cart-sidebar").classList.toggle("active");
}

// Filter products
function filterProducts(category){
  let products = document.querySelectorAll(".product");
  products.forEach(p => {
    if(category === "all") p.style.display = "block";
    else p.style.display = p.classList.contains(category) ? "block" : "none";
  });
}

// Product popup
function openProduct(name, price, productElement){
  currentPopupProduct = productElement;
  document.getElementById("popup-title").innerText = name;
  document.getElementById("popup-price").innerText = price;

  // Colors
  let colors = productElement.dataset.colors.split(",");
  let colorsContainer = document.getElementById("popup-colors");
  colorsContainer.innerHTML = "<h4>Colors:</h4>";
  colors.forEach(c => {
    let btn = document.createElement("button");
    btn.style.backgroundColor = c.trim();
    btn.onclick = () => selectedColors[name] = c.trim();
    colorsContainer.appendChild(btn);
  });

  // Sizes
  let sizes = productElement.dataset.sizes.split(",");
  let sizesContainer = document.getElementById("popup-sizes");
  sizesContainer.innerHTML = "<h4>Sizes:</h4>";
  sizes.forEach(s => {
    let btn = document.createElement("button");
    btn.innerText = s.trim();
    btn.onclick = () => selectedSizes[name] = s.trim();
    sizesContainer.appendChild(btn);
  });

  document.getElementById("product-popup").classList.add("show");
}

function closePopup(){
  document.getElementById("product-popup").classList.remove("show");
}

// WhatsApp order from popup
function orderWhatsAppPopup(){
  if(!currentPopupProduct) return;
  let name = currentPopupProduct.querySelector("h3").innerText;
  let price = currentPopupProduct.querySelector("p").innerText;
  let color = selectedColors[name] ? selectedColors[name] : "Default";
  let size = selectedSizes[name] ? selectedSizes[name] : "Default";
  let message = `Hello, I want to order: ${name} - ${price}, Color: ${color}, Size: ${size}`;
  let phone = "923001234567"; // Replace with WhatsApp number
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  closePopup();
}
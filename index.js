const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayLesson(json.categories));
};
// for snipper
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("trees-container").classList.add("hidden");
  } else {
    document.getElementById("trees-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const removeActive = () => {
  const clickTreeBtn = document.querySelectorAll(".click-tree");
  clickTreeBtn.forEach((btn) => btn.classList.remove("active"));
};

// for alltrees show by default
const loadAllTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById("all-trees");
      clickBtn.classList.add("active");
      displayTree(data.plants);
    })
    .catch((err) => console.error("Error loading trees:", err));
};

document.getElementById("all-trees").addEventListener("click", (e) => {
  e.preventDefault();
  loadAllTrees();
});
const displayTree = (trees) => {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white p-4 rounded-xl shadow">
        <div><img class="w-full h-40 bg-gray-200 rounded-lg mb-4" src=${tree.image} alt=""></div>
        <h3 onclick="loadDetail(${tree.id})" class="font-semibold mb-3">${tree.name}</h3>
        <p class=" line-clamp-2 text-sm text-gray-600 mb-2">${tree.description}</p>
        <div class="flex items-center justify-between mt-3">
          <p class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-xl">${tree.category}</p>
          <span class="font-semibold">৳ <span>${tree.price}</span></span>
        </div>
        <button class="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-[#15803D] add-to-cart-btn">Add to Cart</button>
      </div>
    `;
    treesContainer.appendChild(card);
    const addBtn = card.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", () => addToCart(tree));
  });
  manageSpinner(false);
};

// for modal
const loadDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  treeDetails(details.plants);
};

const treeDetails = (tree) => {
  console.log(tree);
  const detailsModal = document.getElementById("details-container");
  detailsModal.innerHTML = `
        <div>
    <h2 class="text-xl font-semibold mb-3">${tree.name} </h2>
    <img src=${tree.image} 
         alt=""
         class="w-120 h-82  object-cover rounded-lg mb-4">
    <p class="mb-2">
      <span class="font-semibold">Category:</span>${tree.category}
    </p>
    <p class="mb-2">
      <span class="font-semibold">Price:</span> ৳<span>${tree.price} </span>
    </p>
    <p class="mb-2">
      <span class="font-semibold">Description:</span> 
      ${tree.description} 
    </p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
    `;

  document.getElementById("tree_modal").showModal();
};

// showing cart by category
const loadTrees = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`btn-${id}`);
      clickBtn.classList.add("active");
      displayTrees(data.plants);
    });
};

function displayTrees(trees) {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="bg-white p-4 rounded-xl shadow">
        <div>
          <img class="w-full h-40 bg-gray-200 rounded-lg mb-4" src="${tree.image}" alt="">
        </div>
        <h3 onclick="loadDetail(${tree.id})" class="font-semibold mb-3">${tree.name}</h3>
        <p class=" line-clamp-2 text-sm text-gray-600 mb-2">${tree.description}</p>
        <div class="flex items-center justify-between mt-3">
          <p class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-xl">${tree.category}</p>
          <span class="font-semibold">৳ <span>${tree.price}</span></span>
        </div>
        <button class="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-[#15803D] add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    `;
    const addBtn = card.querySelector(".add-to-cart-btn");
    addBtn.addEventListener("click", function () {
      addToCart(tree);
    });
    treesContainer.appendChild(card);
  });
  manageSpinner(false);
}

// for showing category

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = ` 
    <li href="" id="btn-${lesson.id}" onclick="loadTrees( '${lesson.id}')" class=" block hover:bg-[#15803D] hover:text-white text-black px-3 mb-3 py-1 rounded-md click-tree">
        ${lesson.category_name} </li > `;
    levelContainer.append(btnDiv);
  }
};

// for showing add to cart section
const cartContainer = document.getElementById("add-to-cart");
let cart = [];

const addToCart = (tree) => {
  const existing = cart.find((item) => item.id === tree.id);
  alert(`${tree.name} has been added to your cart!`);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...tree, quantity: 1 });
  }
  TreesCart();
};
// cart remove for one by one

function removeFromCart(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      if (cart[i].quantity > 1) {
        cart[i].quantity = cart[i].quantity - 1;
      } else {
        cart.splice(i, 1);
      }
      break;
    }
  }
  TreesCart();
}
const TreesCart = () => {
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  const countCategory = document.createElement("div");
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <div class="space-y-2 text-sm">
        <div class="flex justify-between items-center bg-green-50 p-2 rounded">
          <div>
            <p> ${item.name} </p>
          <p class="text-gray-500">৳ <span > ${item.price} </span> × <span> ${item.quantity} </span></p>
          </div>
          <button onclick="removeFromCart(${item.id})">×</button>
          
        </div >       
      </div >
    `;
    countCategory.appendChild(categoryDiv);
  });

  // different div for total
  cartContainer.appendChild(countCategory);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `
   <div class="flex justify-between mt-4 font-semibold">
    <p>Total:</p>
    <p>৳ <span>${total}</span></p>
  </div>
  `;
  cartContainer.appendChild(totalDiv);
};

loadLessons();
loadAllTrees();

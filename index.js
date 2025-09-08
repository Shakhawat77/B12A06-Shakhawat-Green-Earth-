const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayLesson(json.categories));
};

const removeActive = () => {
    const clickTreeBtn = document.querySelectorAll(".click-tree");
    clickTreeBtn.forEach(btn => btn.classList.remove("active"));
}

const loadTrees = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`btn-${id}`)
            clickBtn.classList.add("active");
            displayTrees(data.plants)
        });
};
// for modal
const loadDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
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
         class="w-full h-48 object-cover rounded-lg mb-4">
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
}

const displayTrees = (trees) => {
    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";

    trees.forEach(tree => {

        const card = document.createElement("div");

        card.innerHTML = `      <div class="bg-white p-4 rounded-xl shadow">
          <div > <img class="w-full h-40 bg-gray-200 rounded-lg mb-4" src=${tree.image} alt=""></div>
          <h3 onclick="loadDetail(${tree.id})" id="tree-name" class="font-semibold mb-3">${tree.name}          
          </h3>
          <p class="text-sm text-gray-600 mb-2">${tree.description}</p>
         
          <div class="flex items-center justify-between mt-3">
             <p class=" bg-green-100 text-green-700 text-xs px-2 py-1 rounded-xl">${tree.category} </p>
            <span class="font-semibold">৳ <span id"taka">${tree.price}</span> </span>            
          </div>
          <button class="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-[#15803D]">Add to Cart</button>
        </div>
        `;
        treesContainer.append(card);
    });

}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<li href="" id="btn-${lesson.id}" onclick="loadTrees( '${lesson.id}')" class=" block hover:bg-[#15803D] hover:text-white text-black px-3 mb-3 py-1 rounded-md click-tree">
        ${lesson.category_name} </li > `
        levelContainer.append(btnDiv);
    }
};



loadLessons();
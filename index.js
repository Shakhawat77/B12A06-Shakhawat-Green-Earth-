const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayLesson(json.categories));
};
const loadTrees = (id) => {
    console.log(id);
};

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<a onclick="loadTrees( ${lesson.category_name}) " href="" class="block hover:bg-green-600 hover:text-white text-black px-3 mb-3 py-1 rounded-md">
        ${lesson.category_name} </a >`
        levelContainer.append(btnDiv);
    }
};



loadLessons();
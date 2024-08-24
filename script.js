let formContainerEl = document.getElementById("formContainer");
let searchTextEl = document.getElementById("searchText");
let searchResults = document.querySelector(".searchResults");
let showMoreBtnEl = document.getElementById("showMoreBtn");
let accessKey = "mBgtEgH0BLLYC9fNt40PTqb3-LtKXvXBcMQHwA04VNE";
let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchTextEl.value;
    const url = `https://api.unsplash.com/search/photos?page=
    ${page}&query=${inputData}&client_id=${accessKey}`


    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageWraper = document.createElement("div");
        imageWraper.classList.add("searchResult");
        const image = document.createElement("img");
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWraper.appendChild(image);
        imageWraper.appendChild(imageLink);
        searchResults.appendChild(imageWraper);

    });

    page++
    if (page > 1) {
        showMoreBtnEl.style.display = "block";
    }
}

formContainerEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtnEl.addEventListener("click", () => {
    searchImages();
})
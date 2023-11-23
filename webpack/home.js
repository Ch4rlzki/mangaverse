window.test = async () => {
    const result = await fetch("https://api.jikan.moe/v4/top/manga", {
        method: "GET"
    });

    result.json().then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

(() => {
    
    const headerCarousel = document.getElementById("headerCarousel");
    const carouselInner = headerCarousel.getElementsByClassName("carousel-inner")[0];

    async function getTopManga() {
        const url = "https://api.jikan.moe/v4/top/manga";
        const result = await fetch(url, {
            method: "GET"
        });

        return new Promise((resolve, reject) => {
            if (result.status === 200) {
                result.json().then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject("Something went wrong, Error message: " + err);
                });
            } else {
                reject(`Something went wrong, While fetching ${url}`);
            }
        });
    }

    getTopManga().then((data) => {
        carouselInner.innerHTML = "";
        
        let { title, synopsis, url, images } = data.shift();
        let image_url = images.jpg.large_image_url;
            
        carouselInner.innerHTML += `
        <div class="carousel-item active">
            <div class="row px-2 px-sm-0 gap-3">
                <div class="col-xl-3 d-flex justify-content-center">
                    <img src="${image_url}" alt="">
                </div>
                <div class="col-xl rounded-3 p-3">
                    <h2>${title}</h2>
                    <p>${synopsis}</p>
                    <a class="btn btn-primary text-white" href="${url}" target="_blank">Learn more</a>
                </div>
            </div>
        </div>
        `;

        data.map(({ title, synopsis, url, images }) => {
            const image_url = images.jpg.large_image_url;
            
            carouselInner.innerHTML += `
            <div class="carousel-item">
                <div class="row px-2 px-sm-0 gap-3">
                    <div class="col-xl-3 d-flex justify-content-center">
                        <img src="${image_url}" alt="">
                    </div>
                    <div class="col-xl rounded-3 p-3">
                        <h2>${title}</h2>
                        <p>${synopsis}</p>
                        <a class="btn btn-secondary text-white" href="${url}" target="_blank">Learn more</a>
                    </div>
                </div>
            </div>
            `;
        });
    }).catch((err) => {
        console.log(err);
    });

    const recommendedList = document.getElementById("recommended-list");

    async function getMangaRecommendations() {
        const result = await fetch("https://api.jikan.moe/v4/recommendations/manga", { method: "GET" });

        return new Promise((resolve, reject) => {
            if (result.status === 200) {
                result.json().then((res) => {
                    resolve(res.data);
                });
            } else {
                reject(`Something went wrong, While fetching ${url}`);
            }
        });
    }

    getMangaRecommendations().then((data) => {
        recommendedList.innerHTML = "";

        data.map(({ content, entry }) => {
            const title = entry[0].title;
            const image_url = entry[0].images.jpg.large_image_url;
            const url = entry[0].url;

            recommendedList.innerHTML += `
            <div class="card">
                <img src="${image_url}" alt="" class="rounded">
                <div class="img-overlay"></div>
                <div class="card-body">
                    <p class="card-title fw-bold">${title}</p>
                    <p class="card-text text-capitalize">
                        <small>${content}</small>
                    </p>
                    <div class="d-flex justify-content-end">
                        <a href="${url}" class="btn btn-secondary btn-sm text-white" target="_blank">Learn more</a>
                    </div>
                </div>
            </div>`;
        });
    }).catch((err) => {
        console.log(err);
    });
})();

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleModal("Under Construction", `Dear Valued User,

    I'm excited to share that I am actively working on refining the search experience for you. As a one-person effort, the search form on the website is currently under construction to provide a more seamless and efficient search process.
    
    During this ongoing refinement, you may notice that the search form is not fully operational. Please bear with me as I dedicate time to perfecting this feature for your benefit. Your patience is highly appreciated.
    
    If you have any immediate queries or need assistance, feel free to reach out. I'm here to help and appreciate your understanding as I work towards delivering an enhanced search experience.
    
    Thank you for your support and understanding.
    
    Best regards,
    Ch4rlzki`);
});

window.addEventListener("scroll", () => {
    const headerScrollHeight = document.getElementsByClassName("header")[0].scrollHeight;
    const navbar = document.getElementsByClassName("navbar")[0];
    const scrollY = window.scrollY;

    if (scrollY >= headerScrollHeight - 57) {
        navbar.classList.add("active");
    } else {
        navbar.classList.remove("active");
    }
});

window.toggleModal = (title, body) => {
    const mainModal = document.getElementById("mainModal");
    const modalTitle = mainModal.getElementsByClassName("modal-title")[0];
    const mdoalBody = mainModal.getElementsByClassName("modal-body")[0];

    modalTitle.innerHTML = title;
    mdoalBody.innerHTML = body.replace(/(?:\r\n|\r|\n)/g, '<br>');
    bootstrap.Modal.getOrCreateInstance(mainModal).show();
}
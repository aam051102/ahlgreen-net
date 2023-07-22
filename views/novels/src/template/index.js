const dPageBackBtn = document.querySelector("#page-back");
const dPageNextBtn = document.querySelector("#page-next");
const dPageColumns = document.querySelector(".page-columns");

let page = 0;

const updatePageStyle = () => {
    dPageColumns.style.transform = `translateX(calc((-35vw - 20px) * ${page})`;
};

const previousPage = () => {
    if (page > 0) {
        page -= 2;
        updatePageStyle();
    }
};

const nextPage = () => {
    page += 2;
    updatePageStyle();
};

updatePageStyle();

dPageBackBtn.addEventListener("click", previousPage);
dPageNextBtn.addEventListener("click", nextPage);

document.body.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
        nextPage();
    } else {
        previousPage();
    }
});

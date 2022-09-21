/// Font size options
/*const dFontSizeWrapper = document.querySelector(".page-font-size-wrapper");
const dFontSizeBtns = [];

const fontSizeOptions = [16, 18, 20];
let currentFontSizeOption = 0;

const updateFontSize = () => {
    console.log(dFontSizeBtns[currentFontSizeOption].classList);
    document
        .querySelectorAll(".page-font-size-btn.active")
        .forEach((el) => el.classList.remove("active"));
    dFontSizeBtns[currentFontSizeOption].classList.add("active");
    document.documentElement.style.fontSize = `${fontSizeOptions[currentFontSizeOption]}px`;
};

fontSizeOptions.forEach((option, i) => {
    const dFontSizeBtn = document.createElement("button");
    dFontSizeBtn.className = "page-font-size-btn";
    dFontSizeBtn.style.fontSize = `${option}px`;
    dFontSizeWrapper.appendChild(dFontSizeBtn);
    dFontSizeBtns.push(dFontSizeBtn);

    dFontSizeBtn.addEventListener("click", () => {
        currentFontSizeOption = i;
        updateFontSize();
    });
});

updateFontSize();
*/

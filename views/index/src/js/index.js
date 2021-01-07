///--- DOM Variables ---///
const header_DOM = document.querySelector(".header");
const sendMessageBtn_DOM = document.querySelector("#send-message-btn");
const heroCanvas_DOM = document.querySelector(".hero-canvas");
const creationsContainer_DOM = document.querySelector("#creations-container");
const footer_DOM = document.querySelector(".footer");
const contactForm_DOM = document.querySelector(".contact-form");

///--- Hero Gradient ---///
const dlg = new DitheredLinearGradient(
    0,
    0,
    heroCanvas_DOM.clientWidth,
    heroCanvas_DOM.clientHeight
);

dlg.addColorStop(0.0, 12, 19, 17);
dlg.addColorStop(0.25, 19, 60, 63);
dlg.addColorStop(0.5, 17, 68, 89);
dlg.addColorStop(0.75, 19, 60, 63);
dlg.addColorStop(1.0, 12, 19, 17);

const renderCanvas = () => {
    heroCanvas_DOM.width = window.innerWidth;
    heroCanvas_DOM.height = window.innerHeight;

    dlg.x1 = heroCanvas_DOM.clientWidth;
    dlg.y1 = heroCanvas_DOM.clientHeight;

    dlg.fillRect(
        heroCanvas_DOM.getContext("2d"),
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );
};

renderCanvas();

let timed;
window.addEventListener("resize", () => {
    if (timed) {
        clearTimeout(timed);
    }

    timed = setTimeout(() => {
        renderCanvas();
    }, 250);
});

///--- Load Creations ---///
const testText = (text) => {
    return decodeURIComponent(text).replace(/>/g, "&gt;").replace(/</g, "&lt;");
};

const processText = (text) => {
    let lines = testText(text).split("\n");
    let code = "";

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] != "") {
            code += `<p>${lines[i]}</p>`;
        }
    }

    return code;
};

fetch("https://ahlgreen.net/api/get/creations")
    .then((e) => e.json())
    .then((data) => {
        creationsContainer_DOM.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            creationsContainer_DOM.innerHTML += `<section class="skewed">
                <div class="forced-width project-wrapper">
                    <figure class="project-figure">
                        <img
                            src="${testText(data[i].image_url)}"
                            alt="${testText(data[i].name)}"
                        />
                    </figure>
                    <section class="project-section">
                        <h4>${testText(data[i].name)}</h4>
                        <h5>${testText(data[i].stack || "")}</h5>
                        ${processText(data[i].description)}
                        <a
                            class="project-view-btn"
                            href="${testText(data[i].url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            >View</a
                        >
                    </section>
                </div>
            </section>`;
        }
    });

///--- Navigation Colour Change ---///
const updateNav = () => {
    if (
        window.scrollY >= window.innerHeight &&
        window.scrollY < footer_DOM.offsetTop
    ) {
        header_DOM.classList.add("inverse");
    } else {
        header_DOM.classList.remove("inverse");
    }
};

updateNav();

window.addEventListener("scroll", updateNav);

///--- Send Message ---///
sendMessageBtn_DOM.addEventListener("click", (e) => {
    e.preventDefault();

    // Send contact form
    let valid = true;

    const jsonData = {};

    let formData = new FormData(contactForm_DOM);
    for (let pair of formData.entries()) {
        let fieldValid = true;
        const el = document.querySelector(`.contact-form [name="${pair[0]}"]`);

        if (
            pair[1] == "" ||
            (el.getAttribute("data-pattern-type") &&
                !new RegExp(el.getAttribute("data-pattern-type")).test(
                    el.value
                ))
        ) {
            fieldValid = false;
        }

        if (!fieldValid) {
            valid = false;
            el.classList.add("invalid");
        } else {
            el.classList.remove("invalid");
        }

        jsonData[pair[0]] = pair[1];
    }

    if (valid) {
        contactForm_DOM.parentNode.classList.add("submitted");

        fetch("https://ahlgreen.net/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        });
    }
});

///--- DOM Variables ---///
const creationsContainer_DOM = document.querySelector("#creations-container");
const loginDialog_DOM = document.querySelector("#login-dialog");
const loginSubmitBtn_DOM = document.querySelector("#login-submit-btn");
const loginCancelBtn_DOM = document.querySelector("#login-cancel-btn");

const usernameInput_DOM = document.querySelector("#username-input");
const passwordInput_DOM = document.querySelector("#password-input");

const adminPortfolioAddBtn_DOM = document.querySelector(
    "#admin-portfolio-add-btn"
);

///--- Templates ---///
const templateProject = document.querySelector("#template-project");

///--- Load Portfolio ---///
const testText = (text) => {
    return decodeURIComponent(text).replace(/>/g, "&gt;").replace(/</g, "&lt;");
};

const processText = (text) => {
    let lines = testText(text).split("\n");
    let code = "";

    for (let i = 0; i < lines.length; i++) {
        if (lines[i] != "") {
            code += `${lines[i]}`;
        } else {
            code += "<br>";
        }
    }

    return code;
};

const login = () => {
    fetch(`${ENDPOINT}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameInput_DOM.value,
            password: passwordInput_DOM.value,
        }),
    })
        .then((e) => e.json())
        .then((data) => {
            if (data.valid) {
                loginDialog_DOM.classList.remove("visible");
            } else {
                usernameInput_DOM.classList.add("invalid");
                passwordInput_DOM.classList.add("invalid");
            }

            usernameInput_DOM.value = "";
            passwordInput_DOM.value = "";
        });
};

const createElement = (element) => {
    const name = testText(element.name || "");

    const clone_element = templateProject.content.cloneNode(true);

    // Save button
    clone_element
        .querySelector(".template-project-save-btn")
        .addEventListener("click", async (e) => {
            e.preventDefault();

            if (await validate()) {
                save(element);
            } else {
                loginDialog_DOM.classList.add("visible");
            }
        });

    // Remove button
    clone_element
        .querySelector(".template-project-remove-btn")
        .addEventListener("click", (e) => {
            e.preventDefault();

            remove(element);
        });

    // Image
    clone_element.querySelector(".template-project-image").src = testText(
        element.image_url || ""
    );
    clone_element.querySelector(".template-project-image").alt = name;

    // Title
    clone_element.querySelector(".template-project-title").value = name;
    clone_element.querySelector(
        ".template-project-title"
    ).id = `project-${name}-title`;

    clone_element.querySelector(
        ".template-project-title-label"
    ).for = `project-${name}-title`;

    // Stack
    clone_element.querySelector(".template-project-stack").value = testText(
        element.stack || ""
    );
    clone_element.querySelector(
        ".template-project-stack"
    ).id = `project-${name}-stack`;

    clone_element.querySelector(
        ".template-project-stack-label"
    ).for = `project-${name}-stack`;

    // Description
    clone_element.querySelector(
        ".template-project-description"
    ).value = testText(element.description || "");
    clone_element.querySelector(
        ".template-project-description"
    ).id = `project-${name}-description`;

    clone_element.querySelector(
        ".template-project-description-label"
    ).for = `project-${name}-description`;

    // Image URL
    clone_element.querySelector(".template-project-image-url").value = testText(
        element.image_url || ""
    );
    clone_element.querySelector(
        ".template-project-image-url"
    ).id = `project-${name}-image-url`;

    clone_element.querySelector(
        ".template-project-image-url-label"
    ).for = `project-${name}-image-url`;

    // URL
    clone_element.querySelector(".template-project-url").value = testText(
        element.url || ""
    );
    clone_element.querySelector(
        ".template-project-url"
    ).id = `project-${name}-url`;

    clone_element.querySelector(
        ".template-project-url-label"
    ).for = `project-${name}-url`;

    creationsContainer_DOM.appendChild(clone_element);
};

const remove = async (element) => {
    if (await validate()) {
        fetch(`${ENDPOINT}/api/delete/creations/${element.url_slug}`, {
            method: "POST",
        })
            .then((e) => e.json())
            .then((data) => {
                console.log(data);
            });
    } else {
        loginDialog_DOM.classList.add("visible");
    }
};

const validate = async () => {
    return await fetch(`${ENDPOINT}/api/validate`, { method: "POST" })
        .then((e) => e.json())
        .then((data) => {
            if (data) {
                return data.valid;
            }
        });
};

const save = async (element) => {
    if (await validate()) {
        fetch(`${ENDPOINT}/api/update/creations/${element.url_slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: element.name,
                description: element.description,
                image_url: element.image_url,
                url: element.url,
                url_slug: element.url_slug,
            }),
        })
            .then((e) => e.json())
            .then((data) => {});
    } else {
        loginDialog_DOM.classList.add("visible");
    }
};

fetch(`${ENDPOINT}/api/get/creations`)
    .then((e) => e.json())
    .then((data) => {
        creationsContainer_DOM.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            createElement(data[i]);
        }
    });

///--- Event Listeners ---///
// Admin
adminPortfolioAddBtn_DOM.addEventListener("click", (e) => {
    e.preventDefault();

    const clone_element = templateProject.content.cloneNode(true);

    creationsContainer_DOM.appendChild(clone_element);
});

// Login
loginDialog_DOM.addEventListener("click", (e) => {
    if (e.target == loginDialog_DOM) {
        loginDialog_DOM.classList.remove("visible");
    }
});

loginSubmitBtn_DOM.addEventListener("click", (e) => {
    e.preventDefault();

    login();
});

loginCancelBtn_DOM.addEventListener("click", (e) => {
    e.preventDefault();

    loginDialog_DOM.classList.remove("visible");
});

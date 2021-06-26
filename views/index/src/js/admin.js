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

const getCookie = (name) => {
    let cookie = document.cookie.split("; ");
    cookie =
        cookie.length > 0 ? cookie.find((row) => row.startsWith(name)) : "";
    cookie = cookie ? cookie.split("=")[1] : "";

    return cookie;
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

                document.cookie = `token=${data.token}; expires=${new Date(
                    data.expires
                )}`;
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
    const id = testText(element.id || 0);

    const clone_element = templateProject.content.cloneNode(true);
    clone_element.querySelector(".skewed").id = `project-${element.id}`;

    const projectTitle_element = clone_element.querySelector(
        ".template-project-title"
    );
    /*const projectStack_element = clone_element.querySelector(
        ".template-project-stack"
    );*/
    const projectDescription_element = clone_element.querySelector(
        ".template-project-description"
    );
    const projectImageUrl_element = clone_element.querySelector(
        ".template-project-image-url"
    );
    const projectUrl_element = clone_element.querySelector(
        ".template-project-url"
    );

    // Save button
    clone_element
        .querySelector(".template-project-save-btn")
        .addEventListener("click", (e) => {
            e.preventDefault();

            const element_this = {
                name: projectTitle_element.value,
                //stack: projectStack_element.value,
                description: projectDescription_element.value,
                image_url: projectImageUrl_element.value,
                url: projectUrl_element.value,
                id: element.id,
            };

            save(element_this);
        });

    // Remove button
    clone_element
        .querySelector(".template-project-remove-btn")
        .addEventListener("click", (e) => {
            e.preventDefault();

            remove(element);
        });

    // Image
    const projectImage_element = clone_element.querySelector(
        ".template-project-image"
    );
    projectImage_element.src = testText(
        element.image_url === "undefined" ? "" : element.image_url
    );
    projectImage_element.alt = name;

    // Title
    projectTitle_element.value = name === "undefined" ? "" : name;
    projectTitle_element.id = `project-${id}-title`;

    clone_element.querySelector(
        ".template-project-title-label"
    ).for = `project-${id}-title`;

    // Stack
    /*projectStack_element.value = testText(
        element.stack === "undefined" ? "" : element.stack
    );
    projectStack_element.id = `project-${id}-stack`;

    clone_element.querySelector(
        ".template-project-stack-label"
    ).for = `project-${id}-stack`;*/

    // Description
    projectDescription_element.value = testText(
        element.description === "undefined" ? "" : element.description
    );
    projectDescription_element.id = `project-${id}-description`;

    clone_element.querySelector(
        ".template-project-description-label"
    ).for = `project-${id}-description`;

    // Image URL
    projectImageUrl_element.value = testText(
        element.image_url === "undefined" ? "" : element.image_url
    );
    projectImageUrl_element.id = `project-${id}-image-url`;

    clone_element.querySelector(
        ".template-project-image-url-label"
    ).for = `project-${id}-image-url`;

    projectImageUrl_element.addEventListener("input", () => {
        projectImage_element.src = testText(
            projectImageUrl_element.value === "undefined"
                ? ""
                : projectImageUrl_element.value
        );
    });

    // URL
    projectUrl_element.value = testText(
        element.url === "undefined" ? "" : element.image_url
    );
    projectUrl_element.id = `project-${id}-url`;

    clone_element.querySelector(
        ".template-project-url-label"
    ).for = `project-${id}-url`;

    creationsContainer_DOM.appendChild(clone_element);
};

const remove = (element) => {
    validate().then((res) => {
        if (res) {
            fetch(`${ENDPOINT}/api/delete/creations/${element.id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
                .then((e) => e.json())
                .then((data) => {
                    document.querySelector(`#project-${element.id}`).remove();
                });
        } else {
            loginDialog_DOM.classList.add("visible");
        }
    });
};

const insert = (element) => {
    element = element || {};

    validate().then((res) => {
        if (res) {
            fetch(`${ENDPOINT}/api/insert/creations`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
                body: JSON.stringify({
                    name: element.name || "",
                    description: element.description || "",
                    image_url: element.image_url || "",
                    url: element.url || "",
                }),
            })
                .then((e) => e.json())
                .then((data) => {
                    if (data) {
                        createElement({
                            name: "",
                            description: "",
                            image_url: "",
                            url: "",
                            id: data.id,
                        });
                    }
                });
        } else {
            loginDialog_DOM.classList.add("visible");
        }
    });
};

const validate = () => {
    return new Promise((resolve, reject) =>
        fetch(`${ENDPOINT}/api/validate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getCookie("token")}`,
            },
        }).then((e) => {
            if (e.status == 200) {
                resolve(true);
                return true;
            } else {
                resolve(false);
                return false;
            }
        })
    );
};

const save = (element) => {
    validate().then((res) => {
        if (res) {
            fetch(`${ENDPOINT}/api/update/creations/${element.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("token")}`,
                },
                body: JSON.stringify({
                    name: element.name,
                    description: element.description,
                    image_url: element.image_url,
                    url: element.url,
                }),
            })
                .then((e) => e.json())
                .then((data) => {});
        } else {
            loginDialog_DOM.classList.add("visible");
        }
    });
};

///--- Load portfolio ---///
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

    insert();
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

const fs = require("fs");
const path = require("path");
const marked = require("marked");

// Read template
const templateContent = fs.readFileSync("./src/template/index.html").toString();

// Find all content
const contentPaths = fs.readdirSync("./src/content");

for (const p of contentPaths) {
    const content = fs.readFileSync(path.join("./src/content", p)).toString();

    const parsedContent = marked.marked(content);

    let outputContent = templateContent;

    outputContent = outputContent.replace(
        /\{\{\s*title\s*\}\}/g,
        "Article by MadCreativity"
    );

    outputContent = outputContent.replace(
        /\{\{\s*description\s*\}\}/g,
        "An article written by MadCreativity."
    );

    outputContent = outputContent.replace(
        /\{\{\s*path\s*\}\}/g,
        "articles/" + p.substring(0, p.lastIndexOf("."))
    );

    outputContent = outputContent.replace(
        /\{\{\s*content\s*\}\}/g,
        parsedContent
    );

    fs.writeFileSync(
        path.join("./build", p.substring(0, p.lastIndexOf(".")) + ".html"),
        outputContent
    );
}

// Copy necessary files
fs.copyFileSync(
    path.resolve("./src/template/index.css"),
    path.resolve("./build/index.css")
);

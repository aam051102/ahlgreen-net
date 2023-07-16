const fs = require("fs");
const path = require("path");
const marked = require("marked");
const {
    default: { highlight },
} = require("highlight.js");

// Read template
const templateContent = fs.readFileSync("./src/template/index.html").toString();

// Find all content
const contentPaths = fs.readdirSync("./src/content");

const copyDeepSync = (from, to) => {
    if (fs.statSync(from).isDirectory()) {
        const contentPaths = fs.readdirSync(from);

        for (const p of contentPaths) {
            copyDeepSync(
                path.resolve(from, p),
                path.join(to, path.basename(p))
            );
        }
    } else {
        fs.copyFileSync(from, to);
    }
};

if (!fs.existsSync(path.resolve("./build"))) {
    fs.mkdirSync(path.resolve("./build"));
}

for (const p of contentPaths) {
    if (path.extname(p) === ".md") {
        const content = fs
            .readFileSync(path.join("./src/content", p))
            .toString();

        const headMatch = content.match(/\{\{\s*HEAD\s*\}\}/);
        const bodyMatch = content.match(/\{\{\s*BODY\s*\}\}/);

        // Header data
        const headContent = content.substring(
            headMatch.index + headMatch[0].length,
            bodyMatch.index
        );

        const headLines = headContent
            .split("\n")
            .filter((l) => l.trim().length !== 0);
        const head = headLines.reduce((prev, curr) => {
            const def = curr.trim().split("=");

            return { ...prev, [def[0]]: def[1] };
        }, {});

        // Content body
        const markdownContent = content.substring(
            bodyMatch.index + bodyMatch[0].length
        );

        const parsedContent = marked.marked(markdownContent, {
            headerIds: true,
            baseUrl: `/stories/`,
            highlight: function (code, lang) {
                if (!lang) return undefined;
                return highlight(code, { language: lang }).value;
            },
            smartLists: true,
            gfm: true,
            breaks: true,
        });

        let outputContent = templateContent;

        outputContent = outputContent.replace(
            /\{\{\s*title\s*\}\}/g,
            `${head["title"]} - Novel | Alexander Ahlgreen Madsen`
        );

        outputContent = outputContent.replace(
            /\{\{\s*description\s*\}\}/g,
            head["description"] || ""
        );

        outputContent = outputContent.replace(
            /\{\{\s*path\s*\}\}/g,
            "novels/" + p.substring(0, p.lastIndexOf("."))
        );

        outputContent = outputContent.replace(
            /\{\{\s*content\s*\}\}/g,
            parsedContent
        );

        fs.writeFileSync(
            path.join("./build", p.substring(0, p.lastIndexOf(".")) + ".html"),
            outputContent
        );
    } else {
        if (!fs.existsSync(path.resolve("./build/", p))) {
            fs.mkdirSync(path.resolve("./build/", p), {
                recursive: true,
            });
        }

        copyDeepSync(
            path.resolve(path.join("./src/content", p)),
            path.resolve("./build/", p)
        );
    }
}

// Copy necessary files
fs.copyFileSync(
    path.resolve("./src/template/index.css"),
    path.resolve("./build/index.css")
);

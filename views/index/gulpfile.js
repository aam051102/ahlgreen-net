const gulp = require("gulp");
const minify = require("gulp-minify");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

function html(next) {
    gulp.src("./src/html/templates/*.ejs")
        .pipe(
            ejs().on("error", (err) => {
                console.error(err);
            })
        )
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeTagWhitespace: true,
                removeComments: true,
            })
        )
        .pipe(
            rename(function (path) {
                if (path.basename !== "index") {
                    path.dirname = path.basename;
                    path.basename = "index";
                }

                path.extname = ".html";
            })
        )
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());

    next();
}

function public(next) {
    gulp.src("./public/**/*.*")
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());

    next();
}

function scss(next) {
    gulp.src("./src/css/**/*.scss")
        .pipe(sass().on("error", (err) => console.error(err)))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());

    next();
}

function js(next) {
    gulp.src("./src/js/**/*.js")
        .pipe(
            babel({
                presets: [
                    [
                        "@babel/env",
                        {
                            targets: [
                                "last 2 versions",
                                "not dead",
                                "not < 2%",
                            ],
                        },
                    ],
                ],
            }).on("error", (err) => console.log(err))
        )
        .pipe(
            minify({
                ext: {
                    min: ".js",
                },
                noSource: true,
            }).on("error", (err) => console.error(err))
        )
        .pipe(gulp.dest("./dist/assets/js"))
        .pipe(connect.reload());

    next();
}

// Watchers
function watchHtml() {
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function watchPublic() {
    gulp.watch("./public/**/*.*", { ignoreInitial: false }, public);
}

function watchScss() {
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}

function watchJs() {
    gulp.watch("./src/js/**/*.js", { ignoreInitial: false }, js);
}

gulp.task("dev", function (next) {
    watchHtml();
    watchPublic();
    watchScss();
    watchJs();
    connect.server({
        livereload: true,
        root: "dist",
        silent: true,
    });

    next();
});

gulp.task("build", function (next) {
    html(next);
    public(next);
    scss(next);
    js(next);

    next();
});

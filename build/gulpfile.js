var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var $ = require("gulp-load-plugins")();
var autoprefixer = require("autoprefixer");
var sassLint = require("gulp-sass-lint");
var sassPaths = [
    "node_modules/motion-ui/src"
];

function sass() {
    return gulp.src("../Resources/Private/Styles/Styles.scss")
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: "compressed" // if css compressed **file size**
        })
            .on("error", $.sass.logError))
        .pipe($.postcss([
            autoprefixer({browsers: ["last 2 versions", "ie >= 9"]})
        ]))
        .pipe(gulp.dest("../Resources/Public/Styles"))
        .pipe(browserSync.stream({stream:true}));
}

function lint() {
    return gulp.src("../Resources/Private/Styles/**/**/*.scss")
        .pipe(sassLint({
            configFile: "config/sass-lint.yml"
        }))
        .pipe(sassLint.format());
}

function serve() {
    browserSync.init({
        port: 8080,
        proxy: {
            target: "http://127.0.0.1:8080"
        }
    });

    gulp.watch("../Resources/Private/Styles/**/**/*.scss", gulp.series(["sass"]));
    gulp.watch("../Resources/Private/Templates/**/**/*.html").on("change", browserSync.reload);
}

function serve_no_cache() {
    browserSync.init({
        port: 8080,
        proxy: {
            target: "http://127.0.0.1:8080/?no_cache=1"
        }
    });

    gulp.watch("../Resources/Private/Styles/**/**/*.scss", gulp.series(["sass"]));
    gulp.watch("../Resources/Private/Templates/**/**/*.html").on("change", browserSync.reload);
}

gulp.task("sass", sass);
gulp.task("serve", gulp.series("sass", serve));
gulp.task("serve no_cache", gulp.series("sass", serve_no_cache));
gulp.task("lint", lint);
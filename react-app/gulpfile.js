var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var postcss = require("gulp-postcss");
var browserSync = require("browser-sync").create();
var autoprefixer = require("autoprefixer");

function showError(error){
    console.log(error.toString());
    this.emit("end");
}

gulp.task("sass", function(){
    return gulp.src("./assets/scss/style.scss")
        .pipe(sass())
        .on("error", showError)
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task("browser-sync", function(){
    browserSync.init({
        proxy: "localhost:8080"
    }, function(){
        gulp.watch("./assets/scss/*.scss", gulp.series("sass"));
    });
});

gulp.task("default", gulp.series("sass", "browser-sync"));
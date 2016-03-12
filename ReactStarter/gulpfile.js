/// <binding AfterBuild='bundle:javascript' />
var gulp = require('gulp');
var gulp_jspm = require('gulp-jspm'); // npm install gulp-jspm 

gulp.task('bundle:javascript', function () {
    return gulp.src('App/HelloComponent.js')
        .pipe(gulp_jspm())
        .pipe(gulp.dest('scripts/'));
});

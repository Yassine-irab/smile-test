//Load Gulp ...
var gulp         = require( 'gulp' );

// CSS related plugins
var sass         = require( 'gulp-sass' );
//var autoprefixer = require( 'gulp-autoprefixer' );

// JS   related plugins
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );
var stripDebug   = require( 'gulp-strip-debug' );
var babel        = require( 'gulp-babel' );

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var options      = require( 'gulp-options' );
var gulpif       = require( 'gulp-if' );
var concat       = require( 'gulp-concat' );
var imagemin     = require('gulp-imagemin');

// Browsers related plugins
var browserSync  = require('browser-Sync').create();
var reload       = browserSync.reload;

// Project related variables
var styleSRC     = './src/scss/style.scss';
var styleURL     = './dist/css/';
var mapURL       = './';

var jsSRC        = './src/js/';
var jsFront      = 'main.js';
var jsFiles      = [ jsFront ];
var jsURL        = './dist/js/';

var imgSRC       = './src/images/**/*';
var imgURL       = './dist/images/';

var fontsSRC     = './src/fonts/**/*';
var fontsURL     = './dist/fonts/';

var htmlSRC      = './src/**/*.html';
var htmlURL      = './dist/';

var styleWatch   = './src/scss/**/*.scss';
var jsWatch      = './src/js/**/*.js';
var imgWatch     = './src/images/**/*.*';
var fontsWatch   = './src/fonts/**/*.*';
var htmlWatch    = './src/**/*.html';


// browser synchronization
function browser_sync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    }); 
    done();
}

// sass minify and converting
function css(done) {
    gulp.src( [ styleSRC ] )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on( 'error', console.error.bind( console ) )
        .pipe( rename({ suffix: '.min' }) )
        .pipe(sourcemaps.write( mapURL ))
        .pipe( gulp.dest( styleURL ) )
        .pipe(  browserSync.stream() );
    done();
};

// js converting
function js(done) {
    jsFiles.map( function( entry ){
        return browserify({
            entries: [jsSRC + entry]
        })
        .transform( babelify, { presets: ["@babel/preset-env","@babel/preset-react"] } )
        .bundle()
        .pipe( source( entry ) )
        .pipe( rename({
            extname: '.min.js'
        }) )
        .pipe( buffer() )
        .pipe( gulpif( options.has( 'production' ), stripDebug() ) )
        .pipe( sourcemaps.init({loadMaps: true}) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( jsURL ) )
        .pipe( browserSync.stream() )
    });
    done();
};

// imgaes minify
function images(){
    return gulp
        .src(imgWatch)
        .pipe(imagemin())
        .pipe(gulp.dest(imgURL));
}

// add to destination folder
function fonts(){
    return triggerPlumber( fontsSRC, fontsURL );
}
// add to destination folder
function html(){
    return triggerPlumber( htmlSRC, htmlURL );
}

// add to destination folder
function triggerPlumber( src, url ) {
    return gulp.src( src )
    .pipe( plumber() )
    .pipe( gulp.dest( url ) );
}

// watch changes for files
function watch_files() {
    gulp.watch(styleWatch, css);
    gulp.watch(jsWatch, gulp.series(js, reload));
    gulp.src(jsURL + 'main.min.js')
        .pipe( notify({ message: 'Gulp is Watching' }) );
    gulp.watch(imgWatch, images);
    gulp.watch(fontsWatch, fonts);
    gulp.watch(htmlWatch, html);
}

// Tasks calls
gulp.task("css", css);
gulp.task("js", js);
gulp.task("imgMinify", images);
gulp.task("fonts", fonts);
gulp.task("html", html);

gulp.task("default", gulp.parallel(css, js, images, fonts, html));
gulp.task("watch", gulp.series(watch_files, browser_sync));
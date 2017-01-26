var Metalsmith        = require('metalsmith'),
    markdown          = require('metalsmith-markdown'),
    layouts           = require('metalsmith-layouts'),
    permalinks        = require('metalsmith-permalinks'),
    sass              = require('metalsmith-sass'),
    discoverPartials  = require('metalsmith-discover-partials'),
    discoverHelpers   = require('metalsmith-discover-helpers'),
    watch             = require('metalsmith-watch');

var dir = {
  base:   __dirname + '/',
  lib:    __dirname + '/lib/',
  source: './src/',
  dest:   './build/'
};

Metalsmith(__dirname)
  .metadata({
    title: "ExploreDDD",
    description: "Design Driven Software",
    generator: "Metalsmith",
    url: "http://www.exploreddd.com"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(discoverPartials({
    directory: 'partials',
    pattern: /\.hbs$/
  }))
  .use(discoverHelpers({
    directory: 'helpers',
    pattern: /\.js$/
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(sass({
    outputDir: 'css/',
    outputStyle: 'compressed'
  }))
  // .use(watch({
  //   paths: {
  //     "${source}/**/*": true,
  //     "templates/**/*": "**/*.md",
  //   },
  //   livereload: true,
  // }))
  .build(function(err, files) {
    if (err) { throw err; }
  });


// Debug function
function debug(logToConsole) {
  return function(files, metalsmith, done) {
    if (logToConsole) {
      console.log('\nMETADATA:');
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log('\nFILE:');
        console.log(files[f]);
      }
    }

    done();
  };
};

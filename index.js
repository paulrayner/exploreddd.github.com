var Metalsmith        = require('metalsmith'),
    markdown          = require('metalsmith-markdown'),
    layouts           = require('metalsmith-layouts'),
    metadata          = require('metalsmith-metadata'),
    permalinks        = require('metalsmith-permalinks'),
    sass              = require('metalsmith-sass'),
    discoverPartials  = require('metalsmith-discover-partials'),
    discoverHelpers   = require('metalsmith-discover-helpers'),
    watch             = require('metalsmith-watch');

//var googleAnalytics = require('metalsmith-google-analytics')

var dir = {
  base:   __dirname + '/',
  lib:    __dirname + '/lib/',
  source: './src/',
  dest:   './docs/'
};

Metalsmith(__dirname)
  .metadata({
    title: "Explore DDD Conference - 2024",
    description: "Explore DDD Conference - 2023: Domain-Driven Design Conference in Denver, Colorado, USA for Software Leaders. Practical, cutting-edge, talks &amp; workshops.",
    generator: "Metalsmith",
    url: "http://www.exploreddd.com"
  })
  .source('./src')
  .destination('./docs')
  .clean(false)
  .use(markdown())
  // .use(permalinks())
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
//  .use(googleAnalytics('UA-37443128-6'))
  // .use(metadata({
  //   ericEvans: 'data/eric-evans.json'
  // }))
  .use(watch({
     paths: {
       "${source}/**/*": true,
       "partials/**/*": "**/*.md",
     },
     livereload: true,
   }))
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

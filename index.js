var Metalsmith        = require('metalsmith');
var markdown          = require('metalsmith-markdown');
var layouts           = require('metalsmith-layouts');
var permalinks        = require('metalsmith-permalinks');
var sass              = require('metalsmith-sass');
var discoverPartials  = require('metalsmith-discover-partials');
var discoverHelpers   = require('metalsmith-discover-helpers');

Metalsmith(__dirname)
  .metadata({
    title: "ExploreDDD",
    description: "Design Driven Software",
    generator: "Metalsmith",
    url: "http://www.exploredd.com"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(discoverPartials({
    directory: 'partials',
    pattern: /\.hbs$/
  }))
  .use(discoverHelpers({
    directory: 'helpers',
    pattern: /\.js$/
  }))
  .use(sass({
    outputDir: 'css/',
    outputStyle: 'compressed'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });

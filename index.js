var Metalsmith = require("metalsmith"),
  layouts = require("@metalsmith/layouts"),
  sass = require("@metalsmith/sass"),
  discoverPartials = require("metalsmith-discover-partials");

var shouldWatch = process.env.WATCH !== "false";

//var googleAnalytics = require('metalsmith-google-analytics')

var dir = {
  base: __dirname + "/",
  lib: __dirname + "/lib/",
  source: "./src/",
  dest: "./docs/",
};

console.log("directory " + __dirname);

var metalsmith = Metalsmith(__dirname)
  .metadata({
    title: "Explore DDD Conference - 2026",
    description:
      "Explore DDD Conference - 2026: Domain-Driven Design Conference in Denver, Colorado, USA for Software Leaders. Practical, cutting-edge talks and workshops.",
    generator: "Metalsmith",
    url: "http://www.exploreddd.com",
  })
  .source("./src")
  .destination("./docs")
  // .clean(false)
  // .use(permalinks())
  //.env("DEBUG", "@metalsmith/*")
  .use(discoverPartials())
  .use(
    layouts({
      directory: "layouts",
      pattern: "**/*.html",
    })
  )
  .use(sass());
//  .use(googleAnalytics('UA-37443128-6'))
// .use(metadata({
//   ericEvans: 'data/eric-evans.json'
// }))

if (shouldWatch) {
  // Native Metalsmith watch. Partials and layouts live outside the source
  // directory, so they are watched explicitly; a change there triggers a
  // full rebuild. Browser live-reload comes from `live-server docs`.
  metalsmith.watch(["src", "layouts", "partials"]);
}

metalsmith.build(function (err, files) {
  if (err) {
    throw err;
  }
});

// Debug function
function debug(logToConsole) {
  return function (files, metalsmith, done) {
    if (logToConsole) {
      console.log("\nMETADATA:");
      console.log(metalsmith.metadata());

      for (var f in files) {
        console.log("\nFILE:");
        console.log(files[f]);
      }
    }

    done();
  };
}

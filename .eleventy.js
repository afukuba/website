const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "colors_and_type.css": "colors_and_type.css",
    "styles.css": "styles.css",
    "script.js": "script.js",
    fonts: "fonts",
    img: "img",
    papers: "papers",
    "cv/omelveny-cv.pdf": "cv/omelveny-cv.pdf",
  });

  eleventyConfig.addWatchTarget("./styles.css");
  eleventyConfig.addWatchTarget("./colors_and_type.css");
  eleventyConfig.addWatchTarget("./script.js");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

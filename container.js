// We will create a container and import all modules here for once

const dependable = require("dependable");
const path = require("path");

const container = dependable.container();
// ['the name you want to give', 'the module that you are importing']
const simpleDependencies = [["_", "lodash"], ['async', 'async']];

simpleDependencies.forEach(function (val) {
  container.register(val[0], function () {
    return require(val[1]);
  });
});

container.load(path.join(__dirname, "/controllers"));
container.load(path.join(__dirname, "/helpers"));

container.register("container", function () {
  return container;
});

module.exports = container;

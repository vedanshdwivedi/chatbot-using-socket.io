// We will add functions for user sign up and some other functions.

"use strict";

// We can refer to lodash module using '_', because we have already imported it in container.js
// The render function being used in this file, will always look for a directory named 'views' and, 
// it will search the filename being passed inside the function in views folder 

module.exports = function (_) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/signup", this.getSignUp);
    },
    indexPage: function (req, res) {
      return res.render("index", { test: "This is a test" });
    },
    getSignUp: function (req, res) {
      return res.render("signup");
    },
  };
};

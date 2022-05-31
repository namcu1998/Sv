const axios = require("axios");

module.exports = function awake_heroku(url) {
  return new Promise((resolve, reject) => {
    const nam = setInterval(() => {
      axios.get(url).catch(function (error) {
        console.log("Awake heroku");
      });
    }, 300000);
  });
};

module.exports = function (game) {
  return {
    echo: function (data) {
      console.log("server responded with ", data);
    }
  };
};

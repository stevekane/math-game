module.exports = function (game) {
  return {
    test: function (arg, user) {
      console.log(arg); 
      user.message('echo', arg);
    }
  };
};

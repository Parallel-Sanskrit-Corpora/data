module.exports = function () {
  return {
    isCyrillic
  };

  function isCyrillic(query) {
    return /[а-яА-ЯЁё]/.test(query);
  }
};

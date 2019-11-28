module.exports = function () {
  return {
    parse: function (str) {
      if (typeof str === 'object') {
        return str;
      }
      try {
        return JSON.parse(str);
      } catch (e) {
        return {};
      }
    },
    stringify: function (obj) {
      if (typeof obj === 'string') {
        return obj;
      }
      try {
        return JSON.stringify(obj);
      } catch (e) {
        return '';
      }
    },
    clone: function (obj) {
      return this.parse(this.stringify(obj));
    }
  };
};

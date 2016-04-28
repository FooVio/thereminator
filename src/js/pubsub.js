window.width = 450;
window.height = 600;

window.map = function(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

window.pubSub = {
  listener: null,
  subscribe: function(fn) {
    this.listener = fn;
  },

  init: function(fn) {
    fn(this.listener);
  }
};

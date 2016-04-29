window.pubSub = {
  listener: null,
  subscribe: function(fn) {
    this.listener = fn;
  },

  init: function(fn) {
    fn(this.listener);
  }
};

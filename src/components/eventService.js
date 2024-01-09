const listeners = {};

const eventService = {
  subscribe: (eventName, callback) => {
    if (!listeners[eventName]) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(callback);
  },

  unsubscribe: (eventName, callback) => {
    if (listeners[eventName]) {
      listeners[eventName] = listeners[eventName].filter((cb) => cb !== callback);
    }
  },

  publish: (eventName, data) => {
    if (listeners[eventName]) {
      listeners[eventName].forEach((callback) => callback(data));
    }
  },
};

export default eventService;

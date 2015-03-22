module.exports = {
  app: {
    options:{
      transform: ['reactify']
    },
    src: ['react/app.jsx'],
    dest: 'public/js/app.react.js'
  }
};

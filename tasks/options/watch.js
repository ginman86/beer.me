module.exports = {
  //watch and build react pages.
  react:{
    files:['react/**/*'],
    tasks:['browserify:app'],
    options:{
      spawn: false
    }
  },
  css:{
    files:['css/components/*'],
    tasks:['concat:css'],
    options:{
      spawn: false
    }
  }
};

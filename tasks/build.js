module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean',
    'browserify',
    'concat',
    'watch'
  ]);

  grunt.registerTask('build-prod', [
    'clean',
    'browserify',
    'concat'
  ]);
};

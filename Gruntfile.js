module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.initConfig({
    watch: {
      foursquare: {
        files: ['src/**/*.coffee', 'test/**/*.js'],
        tasks: ['coffee:foursquare', 'shell:component', 'default']
      }
    },
    shell: {
      component: {
        command: 'component build'
      }
    },
    coffee: {
      foursquare: {
        expand: true,
        flatten: false,
        cwd: 'src',
        src: ['*.coffee', 'foursquare/*.coffee'],
        dest: 'dist',
        ext: '.js'
      }
    },
    browserify: {
      foursquare: {
        src: ['dist/foursquare.js'],
        dest: 'build/foursquare.js',
        options: {
          external: [ 'foursquare' ]
        }
      },
      test: {
        src: ['test/**/*.js'],
        dest: 'build/test.js'
      }
    },
    uglify: {
      foursquare: {
        src: ['build/foursquare.js'],
        dest: 'build/foursquare.min.js'
      }
    },
    copy: {
      test: {
        files: [
          { src: [ 'build/test.js' ], dest: 'public/assets/javascripts/test.js' },
          { src: [ 'node_modules/mocha/mocha.js' ], dest: 'public/assets/javascripts/mocha.js' },
          { src: [ 'node_modules/chai/chai.js' ], dest: 'public/assets/javascripts/chai.js' },
          { src: [ 'node_modules/mocha/mocha.css' ], dest: 'public/assets/stylesheets/mocha.css' }
        ]
      }
    }
  });
  grunt.registerTask(
    'default',
    [
      'coffee:foursquare',
      'browserify:foursquare',
      'browserify:test',
      'uglify:foursquare',
      'copy:test'
    ]
  );
};

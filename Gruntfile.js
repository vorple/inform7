module.exports = function ( grunt ) {
    "use strict";

    var exec = require( 'child_process' ).execFile;

    // extract I7 examples
    // todo: parametrize
    grunt.task.registerTask( 'compile', 'Extract and compile I7 example code', function () {
        var i7extensions = grunt.file.expand(
                { cwd: 'extensions/' },
                '**/*.i7x'
            ),
            allDone = this.async(),
            totalExamples = 0,
            examplesLeft = 0,
            done = function() {
                examplesLeft--;

                if( examplesLeft === 0 ) {
                    grunt.log.writeln( 'Extracted and compiled ' + totalExamples.toString().cyan + ' Inform 7 examples in ' + i7extensions.length.toString().cyan + ' extensions.' );
                    allDone();
                }
            },
            listHTML = '<div id="examplelinks">\n';

        grunt.file.mkdir( '../build/tmp/i7example/Index' );
        grunt.file.mkdir( '../build/Extensions/Reserved' );

        i7extensions.forEach( (filename) => {
            var extension = filename.substr( 0, filename.length - 4 ),
                contents = grunt.file.read( 'extensions/' + filename );

            grunt.file.mkdir( 'release/doc/inform7/examples/stories/' + extension );
            listHTML += '\n<h3>' + extension + '</h3>\n';

            var lines = contents.split( '\n' ),
                examplename = false,
                nifiles = {};

            lines.forEach( (line) => {
                if( line.indexOf( 'Example: *' ) === 0 ) {
                    var header = /Example: (\**) (.*?)( -(.*))?$/.exec( line );

                    examplename = header[ 2 ];
                    nifiles[ examplename ] = '';

                    listHTML += '<h4>' + examplename + '</h4>'
                        + '<div class="blurb"><p>' + header[ 4 ] + '</p></div>'
                        + '<div class="dl_links">'
                        + '<a href="/vorple/release/doc/inform7/examples/interpreter.html?story=stories/' + encodeURIComponent( extension ) + '/' + encodeURIComponent( examplename ) + '.z8">'
                        + '<button class="view"><i class="fa fa-play"></i> Play</button></a>'
                        + '<a href="/vorple/release/doc/inform7/examples/stories/' + encodeURIComponent( extension ) + '/' + encodeURIComponent( examplename ) + '.ni">'
                        + '<button class="source"><i class="fa fa-info"></i> View source</button></a></div>\n';
                }
                else if( examplename && ( line.indexOf( '\t' ) === 0 || line.replace( /\s/, '' ) === '' ) ) {
                    nifiles[ examplename ] += line.substring( 1 ).replace( /^\*: /, '' ) + '\n';

                    if( line.indexOf( '\tTest me with ' ) === 0 ) {
                        listHTML += '<div class="testme">Try: <span class="testcommands">'
                            + /\tTest me with "(.*)"/.exec( line )[ 1 ]
                            + '</span></div>\n';
                    }
                }
            });

            // create extension directories
            grunt.file.mkdir( '../build/release/doc/inform7/examples/stories/' + extension );

            for( var k in nifiles ) {
                if( nifiles.hasOwnProperty( k ) ) {
                    (function( examplename, extension ) {
                        var outDir = '../build/release/doc/inform7/examples/stories/' + extension + '/',
                            outFile = outDir + k + '.ni';

                        examplesLeft++;
                        totalExamples++;

                        // write source
                        grunt.file.write( outFile, nifiles[ k ] );
                        grunt.file.copy( outFile, '../build/tmp/i7example/' + examplename + '/Source/story.ni' );
                        grunt.file.mkdir( '../build/tmp/i7example/' + examplename + '/Build' );

                        // compile with I7
                        exec(
                            'ni',
                            [ '-package', '.', '-rules', '/Applications/Inform.app/Contents/Resources/Inform7/Extensions', '-extensions', '../../../../inform7/extensions', '-extension=z8' ],
                            {
                                cwd: '../build/tmp/i7example/' + examplename
                            },
                            function( error ) {
                                if( error ) {
                                    grunt.fail.warn( 'ni compilation for example "' + examplename + '" in extension ' + extension + ' failed:\n' + error );
                                    return;
                                }

                                exec(
                                    'inform6',
                                    [ 'Build/auto.inf', '+"../../../Library/6.11/"', '-kE2SDwv8', '-o', '../../../release/doc/inform7/examples/stories/' + extension + '/' + examplename + '.z8' ],
                                    {
                                        cwd: '../build/tmp/i7example/' + examplename
                                    },
                                    function( error, stdout, stderr ) {
                                        if( error ) {
                                            grunt.fail.fatal( 'inform6 compilation for example "' + examplename + '" in extension ' + extension + ' failed.\n' + error + stdout + stderr );
                                        }
    console.log( examplename + ' compiled', 'cwd was ' + '../build/tmp/i7example/' + examplename );
                                        done();
                                    }
                                );
                            }
                        );
                    })( k, extension );
                }
            }
        });

        listHTML += '</div>';

        grunt.file.write( 'release/doc/inform7/examples/list.html', listHTML );
    } );
};
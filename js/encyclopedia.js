/**
 * This is a custom JavaScript file used by the example The Sum of Human Knowledge in the core Vorple extension.
 */

function wikipedia_query( topic ) {
    // Hide the prompt. The I7 code blocks the UI.
    vorple.prompt.hide();

    $.getJSON(
        'http://en.wikipedia.org/w/api.php?callback=?',
        {
            action: 'query',
            titles: topic,
            format: 'json',
            prop: 'revisions',
            rvprop: 'content',
            rvparse: '1',
            redirects: '1' 
        },
        function( data ) {
            var $dictEntry = $( '.dictionary-entry:last' );
            try {
                // get the page info (we don't know its key so it can't be referenced directly)
                for( var id in data.query.pages ) {
                    var $article = $( '<div>'+data.query.pages[ id ].revisions[ 0 ]['*']+'</div>' );

                    // get the first paragraph
                    var $para = $article.find( 'p' ).filter( function() { return $( this ).text().trim().length > 0; } ).first();

                    // try to detect if it's a disambiguation page; if so,
                    // show the entire page.
                    if( $para.text().indexOf( 'may refer to' ) !== -1 ) {
                        $article.find( 'table' ).remove();
                        $para = $article;
                    }

                    $para.find( 'a' ).each( function() {
                        var $this = $( this );
                        var href = $this.attr( 'href' );
                        
                        // remove citation links
                        if( /\[\d*\]/.test( $this.text() ) ) {
                            $this.remove();
                        }
                        // unlink references to the same page and Wikipedia info pages
                        else if( href.indexOf( '#' ) === 0 || /^\/wiki\/(.*)\:/.test( href ) ) {
                            $this.replaceWith( '<span>'+$this.html()+'</span>' );
                        }
                        // internal Wikipedia links trigger a new search inside the story
                        else if( href.indexOf( '/wiki/' ) === 0 ) {
                            $this.on( 'click', function( e ) {
                                vorple.prompt.queueCommand( 'look up ' + decodeURI( href.substr( 6 ).replace( /\_/g, ' ' ) ) );
                                e.preventDefault(); 
                            });
                        }
                        // external links open in new window
                        else {
                            $this.attr( 'target', '_blank' );
                        }
                    });
                    
                    // remove edit links
                    $para.find( '.editsection' ).remove();

                    // remove references and other Wiki markup
                    $para.find( 'sup' ).remove();

                    $( '.dictionary-entry:last' ).append( $para );
                    break;
                }
            }
            catch( e ) {
                // An error is to be expected when there are no search results
                $dictEntry.html( 'You find nothing about that topic.' );
            }

            // unblock the UI and show the prompt
            vorple.layout.unblock();
            vorple.prompt.unhide();

            // scroll to the end of the page so that the player sees the result
            vorple.layout.scrollToEnd();
        }
    );
}


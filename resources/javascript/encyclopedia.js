/**
 * This is a custom JavaScript file used by the example The Sum of Human Knowledge in the core Vorple extension.
 */
function wikipedia_query( topic ) {
    // prevent the player from continuing before the data has been fetched
    vorple.layout.block();
    vorple.prompt.hide();

    $.getJSON(
        'http://en.wikipedia.org/w/api.php?exintro&explaintext&callback=?',
        {
            action: 'query',
            format: 'json',
            prop: 'extracts',
            redirects: '1',
            titles: topic
        },
        function( data ) {
            // the element where the results will be placed, created by Inform
            $dictEntry = $( '.dictionary-entry:last' );

            try {
                // get the page info (we don't know its key so it can't be referenced directly)
                const pageId = Object.keys( data.query.pages )[ 0 ];
                const extract = data.query.pages[ pageId ].extract;

                if( !extract ) {
                    // nothing was found, throw an error so that the "you find nothing" text can be printed
                    throw new Error();
                }

                // turn line breaks into paragraph breaks by duplicating all line breaks (\n)
                const paragraphs = extract.replace( /\n+/g, '\n\n' );

                // show the result on the page
                $dictEntry.append( '<span>' + paragraphs + '\n</span>' );
            }
            catch( e ) {
                // an error is to be expected when there are no search results
                $dictEntry.html( '<span>You find nothing about that topic.\n</span>' );
            }

            // scroll to show the text
            vorple.layout.scrollTo( $dictEntry );

            // let the player continue playing
            vorple.layout.unblock();
            vorple.prompt.unhide();
        }
    );
}

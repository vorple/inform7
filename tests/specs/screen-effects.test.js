const { sendCommand } = require( "../utility" );

describe( "Screen effects:", () => {
    describe( "Styles", () => {
        it( "don't add extra line breaks", () => {
            sendCommand( "unittest style line breaks" );
            expectElement( $( ".style-lb-test" ) ).toHaveText( "foo. bar" );
        });

        it( "are added to the entire page", () => {
            sendCommand( "unittest adding page styles");
            expectElement( $( "#vorple" ) ).toHaveElementClass( "cyan-background" );
            expectElement( $( "#vorple" ) ).toHaveElementClass( "fantasy-font" );
        });

        it( "are removed from the page", () => {
            sendCommand( "unittest removing page styles");
            expectElement( $( "#vorple" ) ).not.toHaveElementClass( "fantasy-font" );
            expectElement( $( "#vorple" ) ).toHaveElementClass( "cyan-background" );
        });

        it( "cascade correctly", () => {
            sendCommand( "unittest cascading page styles");
            expectElement( $( "#vorple" ) ).toHaveAttribute( "class", "red-background cyan-background" );
        });
    });

    describe( "Clearing the screen", () => {
        it( "clears the text before but not after", () => {
            sendCommand( "unittest clearing the screen" );
            expectElement( $( "#window0" ) ).toHaveText( "After clearing the screen.\n>" );
        });

        it( "does the same thing when clearing the main screen", () => {
            sendCommand( "unittest clearing the main screen" );
            expectElement( $( "#window0" ) ).toHaveText( "After clearing the main screen.\n>" );
        });
    });

    describe( "Waiting for the space key", () => {
        it( "pauses the output", () => {
            sendCommand( "unittest waiting for space" );
            expectElement( $( ".turn.current" ) ).toHaveText( ">unittest waiting for space\nBefore waiting for space." );
        });

        it( "doesn't react to other keys", () => {
            browser.keys( "abc123\n" );
            $( "body" ).click();
            expectElement( $( ".turn.current" ) ).toHaveText( ">unittest waiting for space\nBefore waiting for space." );
        });

        it( "continues after space is pressed", () => {
            browser.keys( " " );
            expectElement( $( ".turn.previous" ) ).toHaveText( ">unittest waiting for space\nBefore waiting for space.\nAfter waiting for space." );
        });
    });
});
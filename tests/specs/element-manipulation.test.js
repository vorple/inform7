const { sendCommand, waitForPrompt } = require( "../utility" );

describe( "Element manipulation:", () => {
    describe( "Moving elements", () => {
        it( "moves elements before and after others", () => {
            sendCommand( "unittest move elements" );
            waitForPrompt();
            expectElement( $( ".aftercontainer" ) ).toHaveText( "a1a2" );
            expectElement( $( ".beforecontainer" ) ).toHaveText( "b1b2" );
        });
    });
});
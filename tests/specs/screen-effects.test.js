const expectElement = expect;
const {
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Screen effects", () => {
    describe( "styles", () => {
        it( "don't add extra line breaks", () => {
            sendCommand( "unittest style line breaks" );
            waitForPrompt();
            expectElement( $( ".style-lb-test" ) ).toHaveText( "foo. bar" );
        });
    });
});
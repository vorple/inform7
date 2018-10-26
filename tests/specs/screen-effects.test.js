const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const {
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Screen effects", () => {
    describe( "styles", () => {
        it( "don't add extra line breaks", () => {
            sendCommand( "unittest style line breaks" );
            waitForPrompt();
            expect( ".style-lb-test" ).to.have.text( "foo. bar" );
        });
    });
});
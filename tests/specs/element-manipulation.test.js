const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const { sendCommand, waitForPrompt } = require( "../utility" );

describe( "Element manipulation", () => {
    describe( "Moving elements", () => {
        it( "moves elements before and after others", () => {
            sendCommand( "unittest move elements" );
            waitForPrompt();
            expect( ".aftercontainer" ).to.have.text( "a1a2" );
            expect( ".beforecontainer" ).to.have.text( "b1b2" );
        });
    });
});
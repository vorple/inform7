const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const { sendCommand, waitForPrompt } = require( "../utility" );

describe( "Tooltips", () => {
    describe( "Tooltip on hover", () => {
        it( "appears on hover", () => {
            sendCommand( "unittest text with tooltip on hover" );
            waitForPrompt();
            browser.execute( () => { $( "span.tooltip-test" ).trigger( "mouseover" ); } );
            $( "#powerTip" ).waitForDisplayed();
        });

        it( "disappears on mouseout", () => {
            browser.execute( () => { $( "span.tooltip-test" ).trigger( "mouseout" ); } );
            browser.pause( 500 );
            expect( "#powerTip" ).to.not.be.displayed;
        });
    });

    describe( "Tooltip on demand", () => {
        it( "appears after a delay", () => {
            sendCommand( "unittest tooltip on demand" );
            expect( "#powerTip" ).to.not.be.displayed;
            browser.pause( 100 );
            expect( "#powerTip" ).to.not.be.displayed;
            browser.pause( 1000 );
            expect( "#powerTip" ).to.be.displayed;
        });

        it( "disappears after a delay", () => {
            expect( "#powerTip" ).to.be.displayed;
            browser.pause( 2000 );
            expect( "#powerTip" ).to.not.be.displayed;
        });
    });

    describe( "Tooltip on the prompt", () => {
        it( "appears", () => {
            sendCommand( "unittest tooltip on prompt" );
            waitForPrompt();
            expect( "#powerTip" ).to.be.displayed;
        });
    });

    describe( "Hiding tooltips", () => {
        it( "hides the tooltip", () => {
            expect( "#powerTip" ).to.be.displayed;
            sendCommand( "unittest hiding tooltips" );
            browser.pause( 1000 );
            expect( "#powerTip" ).to.not.be.displayed;
        });
    });
});
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
            browser.waitForVisible( "#powerTip" );
        });

        it( "disappears on mouseout", () => {
            browser.execute( () => { $( "span.tooltip-test" ).trigger( "mouseout" ); } );
            browser.pause( 500 );
            expect( browser.isVisible( "#powerTip" ) ).to.be.false;
        });
    });

    describe( "Tooltip on demand", () => {
        it( "appears after a delay", () => {
            sendCommand( "unittest tooltip on demand" );
            expect( browser.isVisible( "#powerTip" ) ).to.be.false;
            browser.pause( 100 );
            expect( browser.isVisible( "#powerTip" ) ).to.be.false;
            browser.pause( 1000 );
            expect( browser.isVisible( "#powerTip" ) ).to.be.true;
        });

        it( "disappears after a delay", () => {
            expect( browser.isVisible( "#powerTip" ) ).to.be.true;
            browser.pause( 2000 );
            expect( browser.isVisible( "#powerTip" ) ).to.be.false;
        });
    });

    describe( "Tooltip on the prompt", () => {
        it( "appears", () => {
            sendCommand( "unittest tooltip on prompt" );
            waitForPrompt();
            expect( browser.isVisible( "#powerTip" ) ).to.be.true;
        });
    });

    describe( "Hiding tooltips", () => {
        it( "hides the tooltip", () => {
            expect( browser.isVisible( "#powerTip" ) ).to.be.true;
            sendCommand( "unittest hiding tooltips" );
            browser.pause( 1000 );
            expect( browser.isVisible( "#powerTip" ) ).to.be.false;
        });
    });
});
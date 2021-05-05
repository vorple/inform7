const { sendCommand, waitForPrompt } = require( "../utility" );

describe( "Tooltips:", () => {
    function expectTooltipToBeVisible() {
        expectElement( $( "#powerTip" ) ).toBeVisible();
    }

    function expectTooltipToBeHidden() {
        // should be .not.toBeVisible() but there's currently a bug in the test library we have to work around
        expect( $( "#powerTip" ).isDisplayed() ).to.be.false;
    }

    describe( "Tooltip on hover", () => {
        it( "appears on hover", () => {
            sendCommand( "unittest text with tooltip on hover" );
            waitForPrompt();
            browser.execute( () => { $( "span.tooltip-test" ).trigger( "mouseover" ); } );
            expectTooltipToBeVisible();
        });

        it( "disappears on mouseout", () => {
            browser.execute( () => { $( "span.tooltip-test" ).trigger( "mouseout" ); } );
            browser.pause( 500 );
            expectTooltipToBeHidden();
        });
    });

    describe( "Tooltip on demand", () => {
        it( "appears after a delay", () => {
            sendCommand( "unittest tooltip on demand" );
            expectTooltipToBeHidden();
            browser.pause( 100 );
            expectTooltipToBeHidden();
            browser.pause( 1000 );
            expectTooltipToBeVisible();
        });

        it( "disappears after a delay", () => {
            expectTooltipToBeVisible();
            browser.pause( 2000 );
            expectTooltipToBeHidden();
        });
    });

    describe( "Tooltip on the prompt", () => {
        it( "appears", () => {
            sendCommand( "unittest tooltip on prompt" );
            waitForPrompt();
            expectTooltipToBeVisible();
        });
    });

    describe( "Hiding tooltips", () => {
        it( "hides the tooltip", () => {
            expectTooltipToBeVisible();
            sendCommand( "unittest hiding tooltips" );
            browser.pause( 1000 );
            expectTooltipToBeHidden();
        });
    });
});
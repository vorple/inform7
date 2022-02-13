const {
    sendCommand,
    vorple
} = require( "../utility" );

const closeModals = () => {
    browser.execute( () => window.vex.closeAll() );
    vorple( "layout", "unblock" );
    $( "body" ).click();
    browser.pause( 2000 );  // wait for the fade out animation to finish
};

describe( "Modal Windows:", () => {
    describe( "Opening", () => {
        it( "succeeds", () => {
            sendCommand( "unittest show modal" );
            expectElement( $( ".vex-dialog-message" ) ).toHaveText( "Test" );
            closeModals();
        } );
    });

    describe( "Empty modals", () => {
        it( "are created and have the correct content", () => {
            sendCommand( "unittest create empty modal" );
            expectElement( $( ".vex-dialog-message" ) ).toHaveText( "Test2" );
            closeModals();
        });
    });
    
    describe( "Block input keypresses", () => {
        it( "when nothing is pressed", () => {
            sendCommand( "unittest prevent keypress input in modal" );
            expectElement( $( ".output-while-modal" ) ).toHaveText( "1" );
            closeModals();
            browser.keys( " " );
            expectElement( $( ".output-while-modal" ) ).toHaveText( "12" );
            sendCommand( "unittest modal cleanup" );
        });

        it( "when something is pressed", () => {
            sendCommand( "unittest prevent keypress input in modal" );
            browser.keys( " \n" );
            expectElement( $( ".output-while-modal" ) ).toHaveText( "1" );
            closeModals();
            browser.keys( " " );
            expectElement( $( ".output-while-modal" ) ).toHaveText( "12" );
        });
    });
});
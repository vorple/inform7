const expectElement = expect;

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

describe( "Modal Windows", () => {
    describe( "Opening", () => {
        it( "succeeds", () => {
            sendCommand( "unittest show modal" );
            $( ".vex-dialog-message" ).waitForExist();
            expectElement( $( ".vex-dialog-message" ) ).toHaveText( "Test" );
            closeModals();
        } );
    });

    describe( "Empty modals", () => {
        it( "are created and have the correct content", () => {
            sendCommand( "unittest create empty modal" );
            $( ".vex-dialog-message" ).waitForExist();
            expectElement( $( ".vex-dialog-message" ) ).toHaveText( "Test2" );
            closeModals();
        });
    });
});
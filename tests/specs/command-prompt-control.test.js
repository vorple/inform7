const {
    runI7Test,
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Command Prompt Control", () => {
    describe( "Command queue", () => {
        it( "is executed in correct order", () => {
            runI7Test( "command queue" );
        });
    });

    describe( "Command history", () => {
        it( "is saved and retrieved correctly", () => {
            runI7Test( "command history" );
        });
    });

    describe( "Command line manipulation", () => {
        it( "changes the prompt text", () => {
            sendCommand( "unittest command line manipulation" );
            waitForPrompt();
            // browser.pause( 50000)
            expectElement( $( "#lineinput-field" ) ).toHaveValue( "test" );
        });

        it( "puts the cursor to the end of the input", () => {
            const cursorPosition = browser.execute( () => document.getElementById( "lineinput-field" ).selectionStart );

            expect( cursorPosition ).to.equal( 4 );
        });
    });
});
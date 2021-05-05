const VERSION = require( "../../package.json" ).version;
const {
    flagValue,
    runI7Test,
    sendCommand,
    waitForPrompt
} = require( "../utility" );

describe( "Core library:", () => {
    describe( "UI state", () => {
        // This test must be the first one!
        it( "runs the construction rulebook on turn 1", () => {
            waitForPrompt();
            expect( flagValue( "ui update 1" ) ).to.be.true;
        });

        it( "interface setup rulebook executes successfully", () => {
            expect( flagValue( "ui setup" ) ).to.be.true;
        });

        it( "runs the construction rulebook every turn", () => {
            expect( flagValue( "ui update 2" ) ).to.be.false;
            sendCommand( "z" );
            waitForPrompt();
            expect( flagValue( "ui update 2" ) ).to.be.true;
        });

        it( "runs the rulebook after undo", () => {
            sendCommand( "unittest state 3 on" );
            waitForPrompt();
            expect( flagValue( "ui update 3" ) ).to.be.true;
            sendCommand( "undo" );
            waitForPrompt();
            expect( flagValue( "ui update 3" ) ).to.be.false;
        });
    });

    describe( "Version", () => {
        it( "is printed in the banner", () => {
            expectElement( $( "#output" ) ).toHaveTextContaining( "Vorple version " + VERSION );
        });
    });

    describe( "Handshake", () => {
        it( "is executed successfully", () => {
            runI7Test( "handshake" );
        });
    });

    describe( "JavaScript evaluation", () => {
        it( "evaluates JavaScript code", () => {
            runI7Test( "JS evaluation" );
        });

        it( "treats objects with circular references as null", () => {
            runI7Test( "circular reference" );
        });

        it( "handles nested JS calls", () => {
            runI7Test( "nested evaluation" );
        });
    });

    describe( "JavaScript string escaping", () => {
        it( "works for strings without line breaks", () => {
            sendCommand( "unittest string escaping" );
            waitForPrompt();
            expectElement( $( ".string-escaping" ) ).toHaveText( `\\ Testy "Tester" O'Testface /` );
        });

        it( "removes line breaks by default", () => {
            sendCommand( "unittest string escaping with line breaks" );
            waitForPrompt();
            expectElement( $( ".string-escaping-no-linebreaks" ) ).toHaveText( `\\ Testy "Tester" O'Testface /` );
        });

        it( "replaces line breaks", () => {
            sendCommand( "unittest string escaping with line break changes" );
            waitForPrompt();
            expectElement( $( ".string-escaping-linebreaks-change" ) ).toHaveText( `\\ ** Testy ** "Tester" ** O'Testface ** /` );
        });

        it( "prints Unicode properly", () => {
            sendCommand( "unittest unicode" );
            expectElement( $( ".unicode-test" ) ).toHaveText( "ÜNÏCÖDÉ⁈" );
        });
    });

    describe( "DOM manipulation", () => {
        it( "creates new elements and switches focus", () => {
            sendCommand( "unittest create containers" );
            // if the containers never appear, these will throw an error
            $( ".testdiv", 5000 ).waitForExist();
            $( ".testspan", 5000 ).waitForExist();

            expectElement( $( ".testdiv" ) ).toHaveText( "123" );
            expectElement( $( ".testspan" ) ).toHaveText( "2" );
        });

        it( "manipulates DOM correctly", () => {
            runI7Test( "element manipulation" );
        });
    });

    describe( "Prompt", () => {
        it( "doesn't print twice when waiting for user consent", () => {
            sendCommand( "unittest prompt in confirmation" );
            waitForPrompt();

            expect( $( ".yes-no-test" ).getText() ).not.to.contain( />/ );

            // send text that isn't yes or no and check that there's no extra >
            sendCommand( "foo" );
            waitForPrompt();

            expect( $( ".yes-no-test" ).getText() ).not.to.contain( /Please answer yes or no\.\s*>/ );

            // cleanup: must answer something to the question
            sendCommand( "yes" );
        });

        it( "doesn't print twice when asking the final question", () => {
            sendCommand( "unittest prompt at game over" );
            waitForPrompt();

            expect( $( "#output" ).getText() ).not.to.contain( />\s*>$/ );

            // cleanup: undo to get out of the final question
            sendCommand( "undo" );
        });
    });
});
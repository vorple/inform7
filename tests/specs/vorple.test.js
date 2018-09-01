const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const VERSION = require( "../../package.json" ).version;
const {
    flagValue,
    runI7Test,
    sendCommand,
    waitForPrompt
} = require( "../utility" );

describe( "Core library", () => {
    describe( "UI state", () => {
        // This test must be the first one!
        it( "runs the construction rulebook on turn 1", () => {
            expect( flagValue( "ui construction 1" ) ).to.be.true;
        });

        it( "interface setup rulebook executes successfully", () => {
            expect( flagValue( "ui setup" ) ).to.be.true;
        });

        it( "runs the construction rulebook every turn", () => {
            expect( flagValue( "ui construction 2" ) ).to.be.false;
            sendCommand( "z" );
            waitForPrompt();
            expect( flagValue( "ui construction 2" ) ).to.be.true;
        });

        it( "runs the rulebook after undo", () => {
            sendCommand( "unittest state 3 on" );
            waitForPrompt();
            expect( flagValue( "ui construction 3" ) ).to.be.true;
            sendCommand( "undo" );
            waitForPrompt();
            expect( flagValue( "ui construction 3" ) ).to.be.false;
        });
    });

    describe( "Version", () => {
        it( "is printed in the banner", () => {
            expect( "#output" ).to.have.text( new RegExp( "Vorple version " + VERSION.replace( ".", "\\." ) ) );
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
    });

    describe( "JavaScript string escaping", () => {
        it( "works for strings without line breaks", () => {
            sendCommand( "unittest string escaping" );
            waitForPrompt();
            expect( ".string-escaping" ).to.have.text( `\\ Testy "Tester" O'Testface /` );
        });

        it( "removes line breaks by default", () => {
            sendCommand( "unittest string escaping with line breaks" );
            waitForPrompt();
            expect( ".string-escaping-no-linebreaks" ).to.have.text( `\\ Testy "Tester" O'Testface /` );
        });

        it( "replaces line breaks", () => {
            sendCommand( "unittest string escaping with line break changes" );
            waitForPrompt();
            expect( ".string-escaping-linebreaks-change" ).to.have.text( `\\ ** Testy ** "Tester" ** O'Testface ** /` );
        });

        it( "prints Unicode properly", () => {
            sendCommand( "unittest unicode" );
            browser.waitForExist( ".unicode-test", 5000 );

            expect( ".unicode-test" ).to.have.text( "ÜNÏCÖDÉ⁈" );
        });
    });

    describe( "DOM manipulation", () => {
        it( "creates new elements and switches focus", () => {
            sendCommand( "unittest create containers" );
            // if the containers never appear, these will throw an error
            browser.waitForExist( ".testdiv", 5000 );
            browser.waitForExist( ".testspan", 5000 );

            expect( ".testdiv" ).to.have.text( "123" );
            expect( ".testspan" ).to.have.text( "2" );
        });

        it( "manipulates DOM correctly", () => {
            runI7Test( "element manipulation" );
        });
    });
});
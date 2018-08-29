const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const VERSION = require( "../../package.json" ).version;
const { runI7Test, sendCommand } = require( "../utility" );

describe( "Core library", () => {
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

    // This tests that the interface setup rulebook works
    describe( "Interface setup", () => {
        it( "rule executes successfully", () => {
            runI7Test( "interface setup" );
        })
    });

    describe( "JavaScript evaluation", () => {
        it( "escapes strings correctly", () => {
            runI7Test( "string escaping" );
        });

        it( "evaluates JavaScript code", () => {
            runI7Test( "JS evaluation" );
        });

        it( "treats objects with circular references as null", () => {
            runI7Test( "circular reference" );
        });

        it( "escapes and prints Unicode properly", () => {
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
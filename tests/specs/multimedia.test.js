const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const { sendCommand } = require( "../utility" );

describe( "Multimedia", () => {
    describe( "Image", () => {
        it( "is created", () => {
            sendCommand( "unittest image" );
            $( "div.vorple-image.logo img" ).waitForExist();
        });

        it( "has the correct URL", () => {
            expect( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).src ) ).to.include( "/media/vorple.png" );
        });

        it( "has the correct alt text", () => {
            expect( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).alt ) ).to.equal( "Vorple's logo" );
        });

        it( "is centered", () => {
            expect( "div.vorple-image.logo.centered img" ).to.be.there();
        });
    });
});
const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const { sendCommand } = require( "../utility" );

describe( "Multimedia", () => {
    describe( "Image", () => {
        it( "is created", () => {
            sendCommand( "unittest image" );
            browser.waitForExist( "div.vorple-image.logo img" );
        });

        it( "has the correct URL", () => {
            expect( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).src ).value ).to.include( "/media/vorple.png" );
        });

        it( "has the correct alt text", () => {
            expect( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).alt ).value ).to.equal( "Vorple's logo" );
        });

        it( "is centered", () => {
            expect( "div.vorple-image.logo.centered img" ).to.be.there();
        });
    });
});
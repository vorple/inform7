const expectElement = expect;
const assert = require( "chai" ).expect;
const { sendCommand } = require( "../utility" );

describe( "Multimedia", () => {
    describe( "Image", () => {
        it( "is created", () => {
            sendCommand( "unittest image" );
            expectElement( $( "div.vorple-image.logo img" ) ).toExist();
        });

        it( "has the correct URL", () => {
            assert( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).src ) ).to.include( "/media/vorple.png" );
        });

        it( "has the correct alt text", () => {
            assert( browser.execute( () => document.querySelector( "div.vorple-image.logo img" ).alt ) ).to.equal( "Vorple's logo" );
        });

        it( "is centered", () => {
            expectElement( $( "div.vorple-image.logo.centered img" ) ).toExist();
        });
    });
});
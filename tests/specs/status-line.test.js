const { sendCommand } = require( "../utility" );

describe( "Status Line", () => {
    describe( "Element", () => {
        it( "is added to the correct place", () => {
            expectElement( $( "#output .status-line-container:first-child" ) ).toExist();
        });
    });
});
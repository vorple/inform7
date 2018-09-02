const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const {
    flagValue,
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Notifications", () => {
    describe( "appear", () => {
        // TBA
    });
});
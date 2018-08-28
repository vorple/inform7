const chai = require( "chai" );
const expect = chai.expect;

const runVorpleCommand = ( module, method, ...params ) => {
    return browser.execute( ( module, method, ...params ) => {
        if( module ) {
            return window.vorple[ module ][ method ]( ...params );
        }

        return window.vorple[ method ]( ...params );
    }, module, method, ...params ).value;
};

const getFailedI7TestName = () => browser.execute( () => window.failedI7Test ).value;
const i7TestPassed = () => browser.execute( () => window.checkI7TestStatus() ).value;

/**
 * Retrieves the value of a flag set by the test story.
 */
module.exports.flagValue = flagName => browser.execute( flagName => !!window.testFlags[ flagName ], flagName ).value;


/**
 * Get the name of the test that failed inside the I7 story
 */
module.exports.getFailedI7TestName = getFailedI7TestName;


/**
 * Returns the vorple object. Note that methods are returned as empty objects.
 */
module.exports.getVorple = () => browser.execute( () => window.vorple ).value;


/**
 * Check if the tests carried out by the story file passed or not
 */
module.exports.i7TestPassed = i7TestPassed;


/**
 * Runs a unit test inside the story file
 */
module.exports.runI7Test = testName => {
    runVorpleCommand( "prompt", "queueCommand", "unittest " + testName );
    browser.waitForVisible( "#lineinput-field", 15000 );

    const result = i7TestPassed();

    if( !result ) {
        console.error( `Failed I7 test name for test ${testName}: ${getFailedI7TestName()}` );
    }

    expect( result ).to.be.true;
};


/**
 * Sends a command to the prompt
 */
module.exports.sendCommand = command => runVorpleCommand( "prompt", "queueCommand", command );


/**
 * Waits for the prompt to appear, which means that the turn has finished
 * and we can evaluate the results
 */
module.exports.waitForPrompt = () => browser.waitForVisible( "#lineinput-field" );


/**
 * Executes a Vorple method in the game.
 *
 * For example, vorple( "prompt", "queueCommand", "undo", true )
 * is the same as vorple.prompt.queueCommand( "undo", true )
 *
 * If the first parameter (module) is null, the method is evaluated as
 * vorple[ method ]( ...params )
 */
module.exports.vorple = runVorpleCommand;

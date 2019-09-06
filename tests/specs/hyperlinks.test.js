const chai = require( "chai" );
const chaiWebdriver = require( "chai-webdriverio" ).default;
chai.use( chaiWebdriver( browser ) );
const { expect } = chai;

const {
    flagValue,
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Hyperlinks", () => {
    describe( "URL hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "unittest URL hyperlinks" );
            $( ".url-hyperlinks" ).waitForExist();
            expect( ".url-hyperlinks a" ).to.have.count( 6 );
        });

        it( "have the correct URL", () => {
            const countURLs = browser.execute( () => $(".url-hyperlinks a[href='http://vorple-if.com']").length );

            expect( countURLs ).to.equal( 5 );
        });

        it( "have the correct classes", () => {
            expect( ".url-hyperlinks a.hyperlink1" ).to.be.there();
            expect( ".url-hyperlinks a.hyperlink2" ).to.be.there();
            expect( ".url-hyperlinks a.hyperlink3" ).to.be.there();
        });

        it( "have the target set", () => {
            // there are 6 links, one of them has "opening in the same window"
            // option so the rest should have target="_blank"
            const targetBlanks = browser.execute( () => $( ".url-hyperlinks a[target='_blank']" ).length );

            expect( targetBlanks ).to.equal( 5 );
        });

        it( "have the correct content", () => {
            expect( ".url-hyperlinks a.hyperlink1" ).to.have.text( "link1" );
            expect( ".url-hyperlinks a.hyperlink2" ).to.have.text( "link2" );
            expect( ".url-hyperlinks a.hyperlink3" ).to.have.text( "http://vorple-if.com" );
        });
    });

    describe( "Command hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "unittest command hyperlinks" );
            $( ".command-hyperlinks" ).waitForExist();
            expect( ".command-hyperlinks a" ).to.have.count( 5 );
        });

        it( "have the correct classes", () => {
            expect( ".command-hyperlinks a.commandlink1" ).to.be.there();
            expect( ".command-hyperlinks a.commandlink2" ).to.be.there();
            expect( ".command-hyperlinks a.commandlink3" ).to.be.there();
        });

        it( "have the correct target", () => {
            waitForPrompt();
            $( ".command-hyperlinks a.commandlink1" ).click();
            waitForPrompt();
            expect( flagValue( "command link 1" ) ).to.be.true;

            // link 2 tested in the next rule

            $( ".command-hyperlinks a.commandlink3" ).click();
            waitForPrompt();
            expect( flagValue( "command link 3" ) ).to.be.true;
        });

        it( "silent commands don't print the command", () => {
            $( ".command-hyperlinks a.commandlink2" ).click();
            waitForPrompt();
            expect( flagValue( "command link 2" ) ).to.be.true;

            // the previously printed prompt value should be the command before this one
            expect( '.lineinput.last .prompt-input' ).to.have.text( "unittest command link 3");
        });

        it( "have the correct content", () => {
            expect( ".command-hyperlinks a.commandlink1" ).to.have.text( "link1" );
            expect( ".command-hyperlinks a.commandlink2" ).to.have.text( "silent" );
            expect( ".command-hyperlinks a.commandlink3" ).to.have.text( "unittest command link 3" );
        });
    });

    describe( "JavaScript hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "unittest JS hyperlinks" );
            $( ".js-hyperlinks" ).waitForExist();
            expect( ".js-hyperlinks a" ).to.have.count( 2 );
        });

        it( "have the correct classes", () => {
            expect( ".js-hyperlinks a.jslink1" ).to.be.there();
        });

        it( "evaluate the JavaScript assigned to them", () => {
            $( ".js-hyperlinks a.jslink1" ).click();
            waitForPrompt();
            expect( flagValue( "js link 1" ) ).to.be.true;
        });

        it( "have the correct content", () => {
            expect( ".js-hyperlinks a.jslink1" ).to.have.text( "link1" );
        });
    });

    describe( "Disabling links", () => {
        it( "one at a time", () => {
            const originalLinks = browser.execute( () => $( "a" ).length );

            sendCommand( "unittest disabling one link" );
            waitForPrompt();

            const linksAfterDisabling = browser.execute( () => $( "a" ).length );

            expect( linksAfterDisabling ).to.equal( originalLinks - 1 );
        });

        it( "in a container", () => {
            sendCommand( "unittest disabling link in containers" );
            waitForPrompt();

            const linksAfterDisabling = browser.execute( () => $( ".hyperlink-unittest a" ).length );

            expect( linksAfterDisabling ).to.equal( 0 );
        });

        it( "everything", () => {
            sendCommand( "unittest disabling all links" );
            waitForPrompt();

            const linksAfterDisabling = browser.execute( () => $( "a" ).length );

            expect( linksAfterDisabling ).to.equal( 0 );
        });
    });
});
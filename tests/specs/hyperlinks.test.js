const {
    flagValue,
    sendCommand,
    waitForPrompt
} = require( "../utility" );


describe( "Hyperlinks:", () => {
    describe( "URL hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "unittest URL hyperlinks" );
            $( ".url-hyperlinks" ).waitForExist();
            expectElement( $$( ".url-hyperlinks a" ) ).toBeElementsArrayOfSize( 6 );
        });

        it( "have the correct URL", () => {
            const countURLs = browser.execute( () => $(".url-hyperlinks a[href='http://vorple-if.com']").length );

            expect( countURLs ).to.equal( 5 );
        });

        it( "have the correct classes", () => {
            expectElement( $( ".url-hyperlinks a.hyperlink1" ) ).toExist();
            expectElement( $( ".url-hyperlinks a.hyperlink2" ) ).toExist();
            expectElement( $( ".url-hyperlinks a.hyperlink3" ) ).toExist();
        });

        it( "have the target set", () => {
            // there are 6 links, one of them has "opening in the same window"
            // option so the rest should have target="_blank"
            expectElement( $$( ".url-hyperlinks a[target='_blank']" ) ).toBeElementsArrayOfSize( 5 );
        });

        it( "have the correct content", () => {
            expectElement( $( ".url-hyperlinks a.hyperlink1" ) ).toHaveText( "link1" );
            expectElement( $( ".url-hyperlinks a.hyperlink2" ) ).toHaveText( "link2" );
            expectElement( $( ".url-hyperlinks a.hyperlink3" ) ).toHaveText( "http://vorple-if.com" );
        });
    });

    describe( "Command hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "generate content" );  // make sure the page has to scroll
            sendCommand( "unittest command hyperlinks" );
            $( ".command-hyperlinks" ).waitForExist();
            expectElement( $$( ".command-hyperlinks a" ) ).toBeElementsArrayOfSize( 5 );
        });

        it( "have the correct classes", () => {
            expectElement( $( ".command-hyperlinks a.commandlink1" ) ).toExist();
            expectElement( $( ".command-hyperlinks a.commandlink2" ) ).toExist();
            expectElement( $( ".command-hyperlinks a.commandlink3" ) ).toExist();
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
            expectElement( $( '.lineinput.last .prompt-input' ) ).toHaveText( "unittest command link 3");
        });

        it( "have the correct content", () => {
            expectElement( $( ".command-hyperlinks a.commandlink1" ) ).toHaveText( "link1" );
            expectElement( $( ".command-hyperlinks a.commandlink2" ) ).toHaveText( "silent" );
            expectElement( $( ".command-hyperlinks a.commandlink3" ) ).toHaveText( "unittest command link 3" );
        });

        it( "scroll the content to the bottom of the page", () => {
            browser.execute( () => window.scrollTo( 0, document.body.scrollHeight ) );

            // must try a few times to be sure that a Firefox bug doesn't appear
            for( let i = 0; i < 3; ++i ) {
                $( ".command-hyperlinks a.commandlink2" ).click();
                expect( browser.execute( () => window.scrollY ) ).not.to.equal( 0 );
            }
        });
    });

    describe( "JavaScript hyperlinks", () => {
        it( "are created", () => {
            sendCommand( "unittest JS hyperlinks" );
            $( ".js-hyperlinks" ).waitForExist();
            expectElement( $$( ".js-hyperlinks a" ) ).toBeElementsArrayOfSize( 2 );
        });

        it( "have the correct classes", () => {
            expectElement( $( ".js-hyperlinks a.jslink1" ) ).toExist();
        });

        it( "evaluate the JavaScript assigned to them", () => {
            $( ".js-hyperlinks a.jslink1" ).click();
            waitForPrompt();
            expect( flagValue( "js link 1" ) ).to.be.true;
        });

        it( "have the correct content", () => {
            expectElement( $( ".js-hyperlinks a.jslink1" ) ).toHaveText( "link1" );
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
            expectElement( $$( ".hyperlink-unittest a" ) ).toBeElementsArrayOfSize( 0 );
        });

        it( "everything", () => {
            sendCommand( "unittest disabling all links" );
            waitForPrompt();
            expectElement( $$( "a" ) ).toBeElementsArrayOfSize( 0 );
        });
    });
});
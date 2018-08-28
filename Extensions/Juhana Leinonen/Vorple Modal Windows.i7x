Version 3/170429 of Vorple Modal Windows (for Glulx only) by Juhana Leinonen begins here.

"Modal windows are dialog prompts or other information windows that pop up on top of the play area and require user action to dismiss."

Include version 3 of Vorple by Juhana Leinonen.

Use authorial modesty.

Chapter 1 - Modal windows

To show a/-- modal window reading (content - text), without pausing:
	let modal message be escaped content using "\n" as line breaks;
	execute JavaScript code "vex.closeAll();vex.dialog.open({message:'[modal message]',buttons:[bracket]vex.dialog.buttons.YES[close bracket],callback:vorple.layout.unblock});vorple.layout.block()";
	if Vorple is not supported:
		say "[content][paragraph break]";
	if not without pausing:
		wait for any key.

To show a/-- modal window:
	show a modal window reading "", without pausing.

To set output focus to the/-- modal window:
	set output focus to the element called "vex-dialog-message".
	

Chapter 2 - Waiting for keypress (for use without Basic Screen Effects by Emily Short)

To wait for any key:
	(- KeyPause(); -).
	
Include (-
	[ KeyPause key; 
		while ( 1 )
		{
			key = VM_KeyChar();
			#Ifdef TARGET_ZCODE;
			if ( key == 63 or 129 or 130 or 132 )
			{
				continue;
			}
			#Ifnot; ! TARGET_GLULX
			if ( key == -4 or -5 or -10 or -11 or -12 or -13 )
			{
				continue;
			}
			#Endif; ! TARGET_
			rfalse;
		}
	];
-).

Vorple Modal Windows ends here.


---- DOCUMENTATION ----

A modal window is a screen that pops up on top of the interpreter with text content and a button that closes the modal.


Chapter: Simple modals

A modal window with plain text content can be created with:
	
	show a modal window reading "Hello World!";
	
The modal pops up with the text and an OK button and waits for the player to either click on the button, press enter, space or esc, or click somewhere outside the modal window.


Chapter: Modals with styled content

The "show a modal window reading ..." lets us show only plain text, but if we want more complex content, we can open the modal as empty and then redirect all output to it. Anything between phrases "set output focus to the modal window" and "set output focus to the main window" is printed inside the modal.

	show a modal window;
	set output focus to the modal window;
	say "[bold type]Welcome![roman type]";
	place the image "Cover.jpg" with description "Cover page", centered;
	set output focus to the main window;
	wait for any key;

("Place the image" phrase is from the Vorple Multimedia extension.)

Note that when creating a modal window this way we should "wait for any key" after creating the modal so that the game pauses to wait for the player to act.


Example: * The Greeter - Showing a modal at the start of the play
	
This basic example pops up the modal when the play begins and displays the story title and some basic gameplay instructions.

	*: "The Greeter"
	
	Include Vorple Modal Windows by Juhana Leinonen.
	Release along with the "Vorple" interpreter.
	
	There is a room.
	
	When play begins:
		show a modal window reading "Welcome to [story title]! Use LOOK to look around, EXAMINE what you see, and TAKE what you can!".


Example: ** Version Popup - Show the version information in a modal window
	
	*: "Version Popup"
	
	Include Vorple Modal Windows by Juhana Leinonen.
	Release along with the "Vorple" interpreter.
	
	There is a room.
	
	Check requesting the story file version:
		show a modal window;
		set output focus to the modal window.
		
	Report requesting the story file version:
		set output focus to the main window.
		
	Test me with "version".
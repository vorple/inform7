Version 3 of Vorple Modal Windows (for Glulx only) by Juhana Leinonen begins here.

"Modal windows are dialog prompts or other information windows that pop up on top of the play area and require user action to dismiss."

Include version 3 of Vorple by Juhana Leinonen.

Use authorial modesty.

To show a/-- modal window reading (content - text):
	let modal message be escaped content using "\n" as line breaks;
	execute JavaScript code "vex.closeAll();vex.dialog.open({message:'[modal message]',buttons:[bracket]vex.dialog.buttons.YES[close bracket],callback:vorple.prompt.unhide});vorple.prompt.hide()".

To show a/-- modal window:
	show a modal window reading "".
	
To set output focus to the/-- modal window:
	set output focus to the element called "vex-dialog-message".
	
To close the/-- modal window:
	execute JavaScript code "vex.closeAll()".

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

("Place the image" phrase is from the Vorple Multimedia extension.)


Chapter: Closing modals programmatically

The modal can be closed with the phrase "close the modal window". This is useful if we have links inside the modal that trigger parser commands, so we can have the command close the modal. If no modals are open the phrase doesn't do anything.

Opening a new modal automatically closes any modal that is already open.


Chapter: A note about non-blocking modal behavior

Modals don't pause the story while they're waiting for the player to click on the OK button. The turn continues to the end where it would start waiting for new player input.

For example:
	
	say "One.";
	show a modal window reading "Two.";
	say "Three.";
	show a modal window reading "Four.";
	say "Five.";
	
What happens here is that the story prints "One" to the main window, then pops up a modal that reads "Two", then without waiting, prints "Three" to the main window. Then it shows a new modal that reads "Four" and closes the old modal (which means that the player will never see the first modal), then again without wating prints "Five" to the main window.


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
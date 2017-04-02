Version 3 of Vorple Status Line (for Glulx only) by Juhana Leinonen begins here.

"The Vorple version of the standard status line."

Use authorial modesty.

Include version 3 of Vorple Screen Effects by Juhana Leinonen.
Include version 3 of Vorple Element Manipulation by Juhana Leinonen.


Chapter 1 - Constructing the status line

Left hand Vorple status line, middle Vorple status line, right hand Vorple status line and mobile Vorple status line are text that varies.

The left hand Vorple status line is "[left hand status line]".
The right hand Vorple status line is "[right hand status line]".
The mobile Vorple status line is "[if the Vorple status line size is 1][middle Vorple status line][otherwise][left hand status line][end if]".

[don't change this number directly – internal use only]
The Vorple status line size is a number that varies. The Vorple status line size is 0.

Constructing the Vorple status line is an activity.

To construct the/a/-- Vorple status line with (column count - number) column/columns:
	if column count > 3 or column count < 0:
		throw Vorple run-time error "Vorple Status Line: status line must have exactly 1, 2 or 3 columns, [column count] requested";
		rule fails;
	now Vorple status line size is column count;
	refresh the Vorple status line.
	
Last rule for constructing the Vorple status line (this is the default Vorple status line rule):
	if an element called "status-line-container.row" doesn't exist:
		place a block level element called "row";
		set output focus to element called "status-line-container.row";	
	if Vorple status line size is greater than 1:
		if an element called "status-line-left" exists:
			display text left hand Vorple status line in the element called "status-line-left";
		otherwise:
			place a block level element called "status-line-left col-xs lg-only" reading the left hand Vorple status line;
	if Vorple status line size is not 2:
		if an element called "status-line-middle" exists:
			display text middle Vorple status line in the element called "status-line-middle";
		otherwise:
			place a block level element called "status-line-middle col-xs lg-only" reading the middle Vorple status line;
	if Vorple status line size is greater than 1:
		if an element called "status-line-right" exists:
			display text right hand Vorple status line in the element called "status-line-right";
		otherwise:
			place a block level element called "status-line-right col-xs lg-only" reading the right hand Vorple status line;
	if an element called "status-line-mobile" exists:
		display text mobile Vorple status line in the element called "status-line-mobile";
	otherwise:
		place a block level element called "status-line-mobile col-xs sm-only" reading the mobile Vorple status line;
	make no decision.

To refresh the/-- Vorple status line:
	if Vorple is supported and the Vorple status line size > 0:
		if an element called "status-line-container" doesn't exist:
			place an element called "status-line-container" at the top level;
			execute JavaScript command "$('.status-line-container').prependTo('main#haven')";
		set output focus to element called "status-line-container";
		carry out the constructing the Vorple status line activity;
		set output focus to the main window.
		
To clear the status line:
	clear the element called "status-line-container".
	
Last every turn (this is the refresh Vorple status at the end of turn rule):
	refresh Vorple status line.

Vorple Status Line ends here.


---- DOCUMENTATION ----

By default Vorple doesn't show the standard Glulx status line. This extension re-adds the status line feature, with some extra functionality.


Chapter: Constructing the status line

Just like the standard status line, the Vorple status line can have either 1, 2 or 3 columns.
	construct the status line with 3 columns;

	
Chapter: Mobile status line

If the browser screen is 568 pixels wide or smaller, the usual status line columns are replaced with a special mobile status line. The idea is to automatically reduce two and three column status lines to just one so that individual columns don't become too narrow on phones. The contents of the mobile status line are centered.

The default content of the mobile status line is the same as the left hand status line. It can be changed by setting the value of "mobile Vorple status line". 

Here we'll set the mobile status line to all three columns separated by slashes. This works well when the columns have very short content.

	*: The mobile Vorple status line is "[left hand Vorple status line] / [middle Vorple status line] / [right hand Vorple status line]".
	
If there's longer content, it's better to place the columns on top of each other.

	*: The mobile Vorple status line is "[left hand Vorple status line][line break][middle Vorple status line][line break][right hand Vorple status line]".


Example: *** The Petting Zoo - An icon in the status line to show the player character's mood

The icon files can be downloaded from http://vorple-if.com/doc/inform7/examples .

	*: "The Petting Zoo"

	Include Vorple Status Line by Juhana Leinonen.
	Include Vorple Multimedia by Juhana Leinonen.
	
	Release along with the "Vorple" interpreter.
	
	Release along with the file "Face-crying.png".
	Release along with the file "Face-sad.png".
	Release along with the file "Face-neutral.png".
	Release along with the file "Face-smiling.png".
	Release along with the file "Face-happy.png".
	
	
	Chapter 1 - Status line
	
	When play begins:
		construct a Vorple status line with 2 columns.
	
	To say player mood depiction:
		place an image "Face-[mood of the player].png" with the description "[mood of the player]".
		
	Rule for constructing the Vorple status line:
		clear the status line;
		place an image "Face-[mood of the player].png" with the description "[mood of the player]", floating right;
		say "[line break]  [the player's surroundings]";
		rule succeeds.
	
	
	Chapter 2 - Moods
	
	A mood is a kind of value. Moods are crying, sad, neutral, smiling and happy.
	
	A person has a mood. The mood of a person is usually neutral.
	
	To make the player sadder:
		if the player is not crying:
			now the player is the mood before the mood of the player.
	
	To make the player happier:
		if the player is not happy:
			now the player is the mood after the mood of the player.
	
	When play begins (this is the plain status line setup rule): 
		now the right hand status line is "[the mood of the player]".
		
	When play begins (this is the preload mood icons rule):
		repeat with M running through moods:
			preload image "Face-[M].png".
	
	
	Chapter 3 - World
	
	The Petting Zoo is a room. "There are many kinds of animals you can pet here."
	
	Understand the command "pet" as "touch".
	
	An animal can be friendly or dangerous.
	
	A bunny is here. The bunny is a friendly animal.
	A puppy is here. The puppy is a friendly animal.
	A sheep is here. The sheep is a friendly animal.
	
	A crocodile is here. The crocodile is a dangerous animal.
	A warthog is here. The warthog is a dangerous animal.
	A snake is here. The snake is a dangerous animal.
	
	Instead of touching a friendly animal:
		say "You pet [the noun] and feel better.";
		make the player happier.
		
	Instead of touching a dangerous animal:
		say "You approach [the noun] and it almost bites your hand off!";
		make the player sadder.
		
	Test me with "pet crocodile / pet warthog / pet bunny / pet puppy/ pet sheep / pet bunny".
		

"Vorple Feature Demo" by Juhana Leinonen.

Release along with the "Vorple" interpreter.


Book 1 - Setup

The Hallway is a room. "From here there are several doorways leading to different feature demonstrations.
[ul][li][link to north]: Core features.[/li][li][link to east]: Command Prompt Control.[/li][li][link to south]: Multimedia.[/li][li][link to west]: Screen Effects.[/li][li][link to up]: Notifications.[/li][/ul]Hyperlinks are used throughout."

To say ul:
	if Vorple is supported:
		open HTML tag "ul";
	otherwise:
		say line break.
	
To say /ul:
	if Vorple is supported:
		close HTML tag;
	otherwise:
		say paragraph break.

To say li:
	if Vorple is supported:
		open HTML tag "li";
	otherwise:
		say line break.

To say /li:
	close HTML tag.

To say link to (d - direction):
	let uppercase dir be "[d]" in upper case;
	place a link to command "GO [uppercase dir]" reading uppercase dir.


Part 1 - Credits

After printing the banner text when Vorple is supported:
	say "Music by Eric Matyas (";
	place a link to web site "http://www.soundimage.org" reading "www.soundimage.org";
	say ")[line break]".


Book 2 - Core

Include Vorple by Juhana Leinonen.

The Library is north of the Hallway. "This library is rather sparse - it contains only one book called [italic type][The Encyclopedia of Everything][roman type]. You can LOOK UP anything you want in it."

The currently demonstrated feature of the Library is "Core features".


Part 1 - Realtime Clock

The grandfather clock is in the Library. "A grandfather clock shows that the current time is [current time]." The description is "The clock shows the time [current time]." The grandfather clock is fixed in place.

To say current time:
	if Vorple is supported:
		execute JavaScript command "var now = new Date(); ((now.getHours()%12)||12)+':'+('0'+now.getMinutes()).slice(-2)";
		say the text returned by the JavaScript command;
	otherwise:
		say "[time of day]".


Part 2 - Wikipedia
	
Release along with JavaScript "encyclopedia.js".

The Encyclopedia of Everything is in the Library. The description is "This book claims to contain all human knowledge.

[italic type]Command LOOK UP followed by a topic to read the book.[roman type]"

Understand "book" as the Encyclopedia.

Instead of consulting the Encyclopedia about when Vorple is supported:
	place a block level element called "dictionary-entry";
	execute JavaScript command "wikipedia_query('[escaped topic understood]')";
	say run paragraph on;
	block the user interface. [the Wikipedia script will unblock the UI]
		
After consulting the Encyclopedia about when Vorple is not supported:
	say "You find the correct volume and learn about [topic understood].".
	
Looking up is an action applying to one topic.
Understand "look up [text]" as looking up.
Understand "read about [text]" as looking up.

Instead of looking up when the player can see the Encyclopedia:
	try consulting the Encyclopedia about the topic understood.
	 	
Test wikipedia with "look up ducks / look up Atlantic Ocean / look up interactive fiction".


Book 3 - Command Prompt Control

Include Vorple Command Prompt Control by Juhana Leinonen

The Office is east of Hallway.
The currently demonstrated feature of the Office is "Command Prompt Control".


Part 1 - Prefilling the prompt

After issuing the response text of a response (called R):
	if R is parser clarification internal rule response (D) or R is parser clarification internal rule response (E):
		prefill the command line with "[parser command so far] ".
		
A desk is in the office. The desk is fixed in place. A memo is on the desk. The description is "The memo reads, 'Try typing a partial command that triggers a 'What do you want to...' question, like TAKE, and see what happens to the next command prompt.'"


Part 2 - Changing the previous command

Sycophant is in the Office. It is fixed in place. "There's a friendly looking robot here. 'Hello! My name is Sycophant,' it says. 'Please [TALK TO] me!'"

To say TALK TO:
	place a link to command "TALK TO SYCOPHANT" reading "TALK TO".	

Sycophant is proper-named. Understand "robot" as Sycophant.

Talking to is an action applying to one visible thing.
Understand "talk to/with [something]" as talking to.

Check talking to when the noun is not Sycophant:
	say "[The noun] [aren't] in a talkative mood."
	
Carry out talking to Sycophant:
	say "'Hello! I'm Sycophant! When you talk to me, you can only say yes!'[paragraph break]'[one of]Do you understand[or]So, having fun[or]Can you say 'yes'[or]Do you think it'll work if you try one more time[stopping]?'[paragraph break]";
	if the player consents:
		say "'All right! Next time try to say 'no' if you can!'";
	otherwise:
		if Vorple is supported:
			change the text of the player's previous command to "yes";
			change the last command in the command history to "yes";
			say "'[one of]That's great to hear[or]Good for you[or]Stay positive[or]That's what I thought[or]All right then[at random]!'";
		otherwise:
			say "'Well, it would have worked in a Vorple interpreter...' the robot says, looking a bit disappointed."
	
 
Book 4 - Hyperlinks

Include Vorple Hyperlinks by Juhana Leinonen.


Book 5 - Multimedia

Include Vorple Multimedia by Juhana Leinonen.
Release along with the file "Great-Minds.mp3".

The Gallery is south of Hallway. "The gallery features three paintings: [Hope], [Primavera] and [Achelous]."
The currently demonstrated feature of the Gallery is "Multimedia".

A credits plaque is in the Gallery. "There's a plaque on the wall with the title [CREDITS link]." The description is "[multimedia credits]".

To say CREDITS link:
	place a link to command "READ PLAQUE" reading "'credits'".	

To say multimedia credits:
	say "Music by Eric Matyas[paragraph break]";
	place a link to web site "http://www.soundimage.org" reading "www.soundimage.org";
	

Part 1 - Images

Release along with the file "Vorple-header.png".
Release along with the file "Hope.jpg".
Release along with the file "Primavera.jpg".
Release along with the file "Achelous and Hercules.jpg".

A painting is a kind of thing. Hope, Primavera and Achelous are paintings in the Gallery.
Understand "painting" and "picture" as a painting.

A painting has some text called the corresponding image file.

The corresponding image file of Hope is "Hope.jpg".
The corresponding image file of Primavera is "Primavera.jpg".
The corresponding image file of Achelous is "Achelous and Hercules.jpg".

The printed name of Achelous is "Achelous and Hercules". Understand "Hercules" and "Achelous and Hercules" as Achelous.

Instead of examining a painting:
	if Vorple is supported:
		place an image corresponding image file of the noun with description "[Noun]", centered;
	otherwise:
		say "You study [Noun] for a while."
	
When play begins:
	if Vorple is supported:
		place an image "Vorple-header.png" with description "Vorple".
		

Part 2 - Audio

After going to the gallery:
	play music file "Great-Minds.mp3";
	continue the action.
	
After going from the gallery:
	stop music;
	continue the action.


Book 6 - Notifications

Include Vorple Notifications by Juhana Leinonen.

The Control Room is up from Hallway.
The currently demonstrated feature of Control Room is "Notifications".

The control panel is in the Control Room. "There's a control panel here with four buttons: [an info button], [a success button], [a warning button] and [an error button]."

The control panel is fixed in place.

A notification button is a kind of thing.
Understand "button" as a notification button.

An info button, a success button, a warning button and an error button are notification buttons. The info button, the success button, the warning button and the error button are part of the control panel.

Rule for printing the name of a notification button (called this one) while looking and Vorple is supported:
	let name be "[printed name of this one]" in upper case;
	place a link to command "PUSH [name]" reading "[printed name of this one]".

Instead of pushing the info button:
	display an info notification with title "Please note" reading "No animals were harmed in the production of this demo.".
	
Instead of pushing the success button:
	display a success notification with title "Success!" reading "You have successfully pushed a button.".
	
Instead of pushing the warning button:
	display a warning notification with title "Warning" reading "Do not use excessive force when pushing buttons."
	
Instead of pushing the error button:
	display an error notification with title "System error" reading "This button doesn't work."

Before pushing a notification button:
	say "A hidden loudspeaker system activates."

Book 7 - Screen Effects

Include Vorple Screen Effects by Juhana Leinonen.

The Recreation Room is west of Hallway.
The currently demonstrated feature of Recreation Room is "Screen Effects".


Part 1 - Styles

The list of text styles is in the Recreation Room.

Instead of examining the list of text styles:
	say "This is the complete list of all custom styles provided in the Vorple Screen Effects extension.[paragraph break]";
	repeat with X running through Vorple styles:
		say "[X style][X][end style][line break]";
	repeat with X running from 1 to 6:
		place a "h[X]" element reading "Level [X] header";
	display an ordered list { "one", "two", "three" };
	display an unordered list { "four", "five", "six" };
	say "A [green letters style]frog[end style] jumps into the [white letters style][blue background style]pond[end style][end style].";


[
The status lne extension isn't ready.

Book 8 - Status Line

Include Vorple Status Line by Juhana Leinonen.

When play begins:
	now the left hand status line is "[the player's surroundings]";
	now the right hand status line is "[the currently demonstrated feature of the location]";
	now the mobile Vorple status line is "[the player's surroundings][line break][the currently demonstrated feature of the location]";
	construct a Vorple status line with 2 columns.

]

A room has some text called currently demonstrated feature.

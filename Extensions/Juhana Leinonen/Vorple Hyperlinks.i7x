Version 3 of Vorple Hyperlinks (for Glulx only) by Juhana Leinonen begins here.

"Hyperlinks that either open a web site or execute a parser command."

Include Vorple by Juhana Leinonen.

Use authorial modesty.


Chapter 1 - Placing links

Section 1 - Web sites

To place a/-- link to a/the/-- web site (url - text) called (classes - text) reading (txt - text), opening in the same window:
	let id be unique identifier;
	place "a" element called "link-[id] vorple-link vorple-weblink [classes]" reading txt;
	execute JavaScript command "$('a.link-[id]').attr('href','[escaped url]')";
	if not opening in the same window:
		execute JavaScript command "$('a.link-[id]').attr('target','_blank')".
		
To place a/-- link to a/the/-- web site (url - text) reading (txt - text), opening in the same window:
	if opening in the same window:
		place a link to the web site url called "" reading txt, opening in the same window;
	otherwise:
		place a link to the web site url called "" reading txt.
		
To place a/-- link to a/the/-- web site (url - text) called (classes - text), opening in the same window:
	if opening in the same window:
		place a link to the web site url called classes reading url, opening in the same window;
	otherwise:
		place a link to the web site url called classes reading url.
		
To place a/-- link to a/the/-- web site (url - text), opening in the same window:
	if opening in the same window:
		place a link to the web site url reading url, opening in the same window;
	otherwise:
		place a link to the web site url reading url.


Section 2 - Commands

To place a/-- link to a/the/-- command (cmd - text) called (classes - text) reading (txt - text), without showing the command:
	let silent be false;
	if without showing the command:
		now silent is true;
	let id be unique identifier;
	place "a" element called "link-[id] vorple-link vorple-commandlink [classes]" reading txt;
	execute JavaScript command "$('a.link-[id]').attr('href','[escaped cmd]').on('click', function(e) {e.preventDefault(); vorple.prompt.queueCommand('[escaped cmd]'[if silent is true], true[end if])})".

To place a/-- link to a/the/-- command (cmd - text) called (classes - text), without showing the command:
	if without showing the command:
		place a link to the command cmd called classes reading cmd, without showing the command;
	otherwise:
		place a link to the command cmd called classes reading cmd.

To place a/-- link to a/the/-- command (cmd - text) reading (txt - text), without showing the command:
	if without showing the command:
		place a link to the command cmd called "" reading txt, without showing the command;
	otherwise:
		place a link to the command cmd called "" reading txt.

To place a/-- link to a/the/-- command (cmd - text), without showing the command:
	if without showing the command:
		place a link to the command cmd called "" reading cmd, without showing the command;
	otherwise:
		place a link to the command cmd called "" reading cmd.


Section 3 - JavaScript commands

To place a/-- link to execute a/the/-- JavaScript command (cmd - text) called (classes - text) reading (txt - text):
	let id be unique identifier;
	place "a" element called "link-[id] vorple-link vorple-jslink [classes]" reading txt;
	execute JavaScript command "$('a.link-[id]').attr('href','#').on('click', function(e) {e.preventDefault();[cmd]})".
	
To place a/-- link to execute a/the/-- JavaScript command (cmd - text) reading (txt - text):
	place a link to execute the JavaScript command cmd called "" reading txt.


Chapter 2 - Disabling links

To disable a/the/-- link/links called (classes - text):
	execute JavaScript command "$('a.vorple-link.[classes]').replaceWith(function() { return $('<span>').addClass('vorple-disabled-link [classes]').html($(this).html())}).length".

To disable all the/-- links inside element called (elem - text):
	execute JavaScript command "$('.[elem] a.vorple-link').replaceWith(function() { return $('<span>').addClass('vorple-disabled-link').html($(this).html())}).length".

To disable all links:
	execute JavaScript command "$('a.vorple-link').replaceWith(function() { return $('<span>').addClass('vorple-disabled-link').html($(this).html())}).length".
	
Vorple Hyperlinks ends here.


---- DOCUMENTATION ----


There are three kinds of hyperlinks that we can add to the story with this extension: a link to another web site, a link that triggers a parser command, or a link that runs JavaScript code.

In non-Vorple interpreters the links are just plain text that can't be clicked.


Chapter: Links to web sites

Hyperlinks open web pages in new browser windows. The URLs should include the "http://" or "https://" prefix.

	place a link to web site "http://vorple-if.com" reading "Vorple web page";

An optional "called" part defines the link element's additional classes.

	place a link to web site "http://vorple-if.com" called "system-credits" reading "Vorple web page";
	[creates <a href="http://vorple-if.com" class="system-credits weblink">Vorple web page</a>]

Clicking on the links open the target web page on a new browser window. The link can be opened in the same window by passing an option:

	place a link to web site "http://vorple-if.com" reading "Vorple web page", opening in the same window;

If the story is run in a normal interpreter, the link description text is displayed but not the web site address (and of course clicking on the text won't do anything).


Chapter: Links to commands

Links to commands by default work just as if they would have been typed on the prompt.

	place a link to command "open door" reading "door";

Leaving out the text content will print the link target instead (so you don't have to write 'place a link to "ask the custodian about the missing artifacts" reading "ask the custodian about the missing artifacts"' and so on).

	say "Feel free to ";
	place a link to command "look";
	say " around.";

The option "without showing the command" runs the command but doesn't show it in the scrollback. The story's response is still printed.

	place a link to command "inventory" reading "my stuff", without showing the command;

In a non-Vorple interpreter only the link text is displayed.


Chapter: Links that execute JavaScript code

The click event object is available as a variable called "e" in the


Example: * Click to Learn More - Hyperlinks to external web pages, email links and action links, with a fallback if Vorple is not available.

Email links ("mailto:") open an external mail program with the address pre-filled.


	*: "Click to Learn More"
	
	Include Vorple Hyperlinks by Juhana Leinonen.
	
	Release along with the "Vorple" interpreter.

	Lounge is a room.

	Getting information is an action out of world.
	Understand "about" and "info" as getting information.

	Carry out getting information:
		say "This fine story has been made possible by ";
		if Vorple is supported:
			place a link to web site "http://vorple-if.com" reading "Vorple";
		otherwise:
			say "Vorple (vorple-if.com)";
		say ". Please contact us at ";
		place a link to web site "mailto:if@example.com" reading "if@example.com";
		say "."

	After looking for the first time:
		say "(Type ";
		place a link to command "ABOUT";
		say " for more information.)[line break]".

	Test me with "about".
		
		
Example: ** Click to Retry - Clickable options when play ends.

If the story makes use of hyperlinks, we will probably want the options presented when the play ends be clickable as well. This example replaces the rule in the Standard Rules with one that prints the options as hyperlinks.

Because we can't print the topic entry that contains the actual command, we'll assume that the word written in all caps is the correct command.


	*: "Click to Retry"
	
	Chapter 1 - Clickable end of story options
 
	Include Vorple Hyperlinks by Juhana Leinonen.
	Release along with the "Vorple" interpreter.
	
	This is the clickable print the final question rule:
		let named options count be 0;
		repeat through the Table of Final Question Options:
			if the only if victorious entry is false or the story has ended finally:
				if there is a final response rule entry
					or the final response activity entry [activity] is not empty:
					if there is a final question wording entry, increase named options count by 1;
		if the named options count is less than 1, abide by the immediately quit rule;
		say "Would you like to " (A);
		repeat through the Table of Final Question Options:
			if the only if victorious entry is false or the story has ended finally:
				if there is a final response rule entry 
					or the final response activity entry [activity] is not empty:
					if there is a final question wording entry and final question wording entry matches the regular expression "<A-Z>{2,}":
						place a link to command text matching regular expression reading final question wording entry;
						decrease named options count by 1;
						if the named options count is 1:
							if the serial comma option is active, say ",";
							say " or " (B);
						otherwise if the named options count is 0:
							say "?[paragraph break]";
						otherwise:
							say ", ";
	
	The clickable print the final question rule is listed instead of the print the final question rule in the before handling the final question rulebook.
	
	
	Chapter 2 - Story
	
	The Treasury is a room.	The gem is in the treasury.
	
	After taking the gem:
		end the story finally.
		
	Test me with "take gem".


Version 3 of Vorple Command Prompt Control (for Glulx only) by Juhana Leinonen begins here.

"Changing the style and contents of the command prompt and manipulating the command history."

Use authorial modesty.

Include version 3 of Vorple by Juhana Leinonen.

Chapter 1 - Queueing parser commands

To queue a/the/-- parser command (cmd - text), without showing the command:
	let hideCommand be "false";
	if without showing the command:
		now hideCommand is "true";
	execute JavaScript command "vorple.prompt.queueCommand('[escaped cmd]',[hideCommand])".
	

Chapter 2 - Command history

To add a/the/-- command (cmd - text) to the/-- command history:
	execute JavaScript command "haven.prompt.history.add('[escaped cmd]')".
	
To remove the/-- last command from the/-- command history:
	execute JavaScript command "haven.prompt.history.remove()".
	
To change the/-- last command in the/-- command history to (cmd - text):
	remove the last command from the command history;
	add the command cmd to the command history.
	
To clear the command history:
	execute JavaScript command "haven.prompt.history.clear()".
	

Chapter 3 - Prefilling the command line

To prefill the/-- command line with (cmd - text):
	execute JavaScript command "vorple.prompt.setValue('[escaped cmd]')".
	

Chapter 4 - Changing the previous command

To change the/-- text of the player's previous command to (cmd - text):
	execute JavaScript command "$('.lineinput.last .prompt-input').text('[escaped cmd]')".


Vorple Command Prompt Control ends here.


---- DOCUMENTATION ----

Chapter: Queueing parser commands

The phrase

	queue a parser command "test me";
	
adds a command to a queue that executes player input whenever the prompt becomes available. For example, the following code runs the commands "about" and "inventory" when the play begins, just as if the player would have typed the commands:

	When play begins:
		queue a parser command "about";
		queue a parser command "inventory".
		
Specifying "without showing the command" hides the command from view, but not the result of the command. The following example runs the command "inventory" whenever the player examines the player character:
	
	After examining the player:
		queue a parser command "inventory", without showing the command.
		
Because of the modifier the output is something like:
	
	>x me
	As good-looking as ever.
	
	You are carrying nothing.
	
Hiding the command is only a visual effect. It doesn't e.g. stop the turn counter from incrementing or block every turn rules from running.
	
The feature should be used sparingly, though: unless there's a specific reason to pass the commands automatically this way, in vast majority of cases it's better to trigger actions using the standard "try" construct. In the previous example you should rather write "After examining the player: try taking inventory."

Why queue the commands instead of just running them immediately? Technically the input prompt is available only between turns, so we must wait for it to become available. The story can't process a new turn while it's still processing the previous one.


Chapter: Manipulating the command history

The command history is the list of commands that the player has typed previously and can be accessed by pressing the up key on the keyboard. The phrases to add, remove, change and clear the command history are these:
	
	add the command "version" to the command history;
	remove the last command from the command history;
	change the last command in the command history to "examine mailbox";
	clear the command history;

Additions, removals and changes always operate on the most recent command in the history. Trying to remove commands from the history when there's nothing to remove doesn't cause an error, the phrase just doesn't do anything. The "clear the command history" wipes out all of them at once.

This feature can be useful when combined with hidden parser commands described in the previous chapter:
	
	queue a parser command "act secretly", without showing the command;
	
	Before acting secretly when "[player's command]" is "act secretly":
		remove the last command from the command history.

...although this is somewhat cumbersome and, as said before, much easier with a standard "try acting secretly" unless there's a very good reason to pass the command through the parser.


Chapter: Prefilling the command line

We can insert some text into the command line the player will see next:

	prefill the command line with "look";

At the end of the turn when it's the player's turn to type a command, the word "look" is already entered into the command line. The player can then either continue to type the rest of the command or delete the prefilled text and issue some other command.


Example: ** - 
	
	*: 
		
	Include Vorple Command Prompt Control by Juhana Leinonen.
	
	After issuing the response text of a response (called R):
		if R is parser clarification internal rule response (D) or R is parser clarification internal rule response (E):
			prefill the command line with "[parser command so far] ".
			
	There is a room.
	
	Test me with "x".


Example: ** The Manchurian Candidate - Retroactively replacing the player's commands

A common trick to force the player to type a specific command is to print a fake command prompt, wait for keypresses and print the predetermined command one character at a time, regardless of what keys the player actually presses.

Thanks to the full control we have over the command line and the output, we can take the effect one step further and switch the player's command to something else after the player has already typed it.

This example gives the effect the full treatment: the player's command is intercepted and replaced with a new one inside the game itself, in the scrollback, and in the command history. The fake commands are functionally identical to any commands the user would have typed themselves.


	*: "The Manchurian Candidate"
	
	Include Vorple Command Prompt Control by Juhana Leinonen.
	
	
	Chapter 1 - Forcing commands
	
	The list of forced commands is a list of text that varies. The list of forced commands is {"enter book depository", "up", "open window", "inventory", "put rifle on window sill", "shoot"}.
	
	After reading a command when the list of forced commands is not empty:
		let the new command be entry 1 in the list of forced commands;
		change the text of the player's command to the new command;
		change the text of the player's previous command to the new command;
		change the last command in the command history to the new command;
		remove entry 1 from the list of forced commands.
	
		
	Chapter 2 - World Setup
	
	Elm Street is a room. The book repository is scenery in Elm Street.
	
	The Book Repository Foyer is a room.
	
	Instead of entering the book repository:
		say "Something compels you to go inside the book repository.";
		now the player is in the Book Repository Foyer.
		

Version 3 of Vorple Status Line (for Glulx only) by Juhana Leinonen begins here.

"The Vorple version of the standard status line."

Use authorial modesty.

Include version 3 of Vorple Screen Effects by Juhana Leinonen.
Include version 3 of Vorple Element Manipulation by Juhana Leinonen.


Chapter 1 - Constructing the status line

The left hand Vorple status line, middle Vorple status line, right hand Vorple status line and mobile Vorple status line are text that varies.

The left hand Vorple status line is usually "[left hand status line]".
The right hand Vorple status line is usually "[right hand status line]".
The mobile Vorple status line is usually "[left hand status line]".

[don't change this number directly – internal use only]
The Vorple status line size is a number that varies.

To construct the/a/-- status line with (column count - number) column/columns:
	if column count > 3 or column count < 0:
		throw Vorple run-time error "Vorple Status Line: status line must have exactly 1, 2 or 3 columns, [column count] requested";
		rule fails;
	now Vorple status line size is column count;
	remove element called "status-line-container";
	place an element called "status-line-container row" at the top level;
	execute JavaScript command "$('.status-line-container').prependTo('main#haven')";
	set output focus to element called "status-line-container";
	if Vorple status line size is greater than 1:
		place a block level element called "status-line-left col-xs lg-only";
	if Vorple status line size is not 2:
		place a block level element called "status-line-middle col-xs lg-only";
	if Vorple status line size is greater than 1:
		place a block level element called "status-line-right col-xs lg-only";
	place a block level element called "status-line-mobile col-xs sm-only";
	refresh Vorple status line;
	set output focus to the main window.

To refresh Vorple status line:
	display text left hand Vorple status line in the element called "status-line-left";
	display text middle Vorple status line in the element called "status-line-middle";
	display text right hand Vorple status line in the element called "status-line-right";
	display text mobile Vorple status line in the element called "status-line-mobile".

Before reading a command (this is the refresh Vorple status line at the start of the play rule):
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


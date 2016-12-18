Version 3 of Vorple Status Line (for Glulx only) by Juhana Leinonen begins here.

"The Vorple version of the standard status line."

Use authorial modesty.

Include version 3 of Vorple Element Manipulation by Juhana Leinonen.
Include version 3 of Vorple Screen Effects by Juhana Leinonen.

Use separate Vorple status line translates as (- Constant VP_SEPARATE_STATUS_LINE; -).

Chapter 1 - Constructing the status line

Vorple status line container is a kind of value. Vorple status line containers are left hand Vorple status line, middle Vorple status line and right hand Vorple status line.

Vorple status line container has some text called content.

[don't change this number directly – internal use only]
The Vorple status line size is a number that varies.

To construct a/-- status line with (column count - number) column/columns:
	if column count > 3 or column count < 0:
		throw Vorple run-time error "Vorple Status Line: status line must have exactly 1, 2 or 3 columns, [column count] requested";
		rule fails;
	if column count is 1:
		now the middle Vorple status line is "[the player's surroundings]";
	otherwise:
		now the left hand Vorple status line is "[the player's surroundings]";
		now the middle Vorple status line is "";
		now the right hand Vorple status line is "[if the scoring option is active][score]/[end if][turn count]";
	now Vorple status line size is column count.

To refresh the status line:
	say "[Vorple status line size]: [content of left hand Vorple status line] - [content of middle Vorple status line] - [content of right hand Vorple status line]";


Chapter 2 - Responsive functionality

Table of Vorple Status Line Container Settings
container	desktop alignment	mobile alignment	mobile hidden
left hand Vorple status line	left aligned	center aligned	false
middle Vorple status line	center aligned	center aligned	false
right hand Vorple status line	right aligned	center aligned	false

To hide the/-- left hand status line in mobile view:
	now mobile left hand status line hidden is true;
	apply responsive classes to the status line.

To hide the/-- middle status line in mobile view:
	now mobile middle status line hidden is true;
	apply responsive classes to the status line.

To hide the/-- right hand status line in mobile view:
	now mobile right hand status line hidden is true;
	apply responsive classes to the status line.

To show the/-- left hand status line in mobile view:
	now mobile left hand status line hidden is false;
	apply responsive classes to the status line.

To show the/-- middle status line in mobile view:
	now mobile middle status line hidden is false;
	apply responsive classes to the status line.

To show the/-- right hand status line in mobile view:
	now mobile right hand status line hidden is false;
	apply responsive classes to the status line.

To apply responsive classes to the status line:
	do nothing. [**]
	
Vorple Status Line ends here.


---- DOCUMENTATION ----


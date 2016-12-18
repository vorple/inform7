Version 3 of Vorple Element Manipulation (for Glulx only) by Juhana Leinonen begins here.

"Adding, removing, hiding, moving and other basic manipulation of HTML document elements."

Use authorial modesty.

Include Vorple by Juhana Leinonen.


To clear the/-- element called/-- (classes - text):
	execute JavaScript command "$('.[classes]').last().empty()".

To clear all the/-- elements called/-- (classes - text):
	execute JavaScript command "$('.[classes]').empty()".

To remove the/-- element called/-- (classes - text):
	execute JavaScript command "$('.[classes]').last().remove()".

To remove all the/-- elements called/-- (classes - text):
	execute JavaScript command "$('.[classes]').remove()".

To move the/-- element called/-- (classes - text) under (target - text):
	execute JavaScript command "$('.[classes]').first().appendTo('.[target]')".

To move all the/-- elements called/-- (classes - text) under (target - text):
	execute JavaScript command "$('.[classes]').appendTo('.[target]')".


Vorple Element Manipulation ends here.
#! /bin/bash

I7_DIR="/Applications/Inform.app/Contents"
EXEC_DIR="$I7_DIR/MacOS"

set -e

mkdir -p tmp/Source
cp unittest.i7 tmp/Source/story.ni
$EXEC_DIR/ni -internal $I7_DIR/Resources/Internal -external ../ -project tmp/ -format=ulx
$EXEC_DIR/inform6 -kE2SDwG +include_path=$I7_DIR/Resources/Library/6.11/ tmp/Build/auto.inf unittest.ulx

/Applications/Inform.app/Contents/MacOS/inform6 \
	-kE2SDwG +include_path=/Applications/Inform.app/Contents/Resources/Library/6.11,.,../Source /Users/jleinonen/Documents/code/Inform/Vorple.inform/Build/auto.inf /Users/jleinonen/Documents/code/Inform/Vorple.inform/Build/output.ulx

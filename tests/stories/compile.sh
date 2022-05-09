#! /bin/bash

# go to correct directory if the script was run from somewhere else
cd "$( dirname "${BASH_SOURCE[0]}" )"

# set the environment variables from .env file in the project root (see .env.example)
set -o allexport
. ../../.env
set +o allexport

# exit if any of the following commands return an error
set -e

# run the I7 compiler
$I7_DIR/Tangled/inform7 \
  -internal $I7_DIR/Internal \
  -external ../../ \
  -source ./unittest.ni \
  -o ./unittest.i6 \
  -format=Inform6/32d \
  -no-census-update -no-index -no-problems

# run the I6 compiler
$I6_DIR/Tangled/inform6 \
  -kE2SDwG \
  \$OMIT_UNUSED_ROUTINES=1 \
  ./unittest.i6 \
  ./unittest.ulx

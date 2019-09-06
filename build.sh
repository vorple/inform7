#! /bin/bash

# This creates the Inform 7 distribution package.

rm -rf dist
mkdir dist
cp -r Extensions Templates dist

# We assume that the main Vorple repository is in ../vorple and it's already been built
cp ../vorple/dist/interpreter/* dist/Templates/Vorple

# Put the list of interpreter files into the manifest file
find ../vorple/dist/interpreter/ -type f -exec basename {} \; >> dist/Templates/Vorple/\(manifest\).txt


cd dist
zip -r vorple-inform7.zip Extensions Templates -x "*/.*"

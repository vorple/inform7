# Inform 7 extensions for Vorple

This repository contains the official Inform 7 extensions for Vorple.

The documentation for how to use the extensions as a game author is at [vorple-if.com](https://vorple-if.com).


## Inform version compatibility

The `master` branch of the repository is for the latest Inform version and should be used together with the `master` branch of [the JavaScript library](https://github.com/vorple/vorple). The [`v3` branch](https://github.com/vorple/inform7/tree/v3) is compatible with Inform 7 version 6M62 (only) and should be used with the [`v3` branch of the JavaScript library](https://github.com/vorple/vorple/tree/v3).


## Creating release packages

The build.sh script packages everything into a zip file that contains the Inform 7 extensions and interpreter template. The zip file is placed into the `dist` directory along with copies of the Extensions and Templates directories.

The script also creates the correct (manifest).txt file for Inform 7 by adding the list of all interpreter files to it. The (manifest).txt template it uses is in Templates/Vorple/(manifest).txt.

The script assumes that the [main Vorple repository](https://github.com/vorple/vorple) is at the same level as this project (i.e. at ../vorple in relation to the build script) and that it has already been build (`yarn build` inside the vorple repository.)

The build script works only in Mac or Linux. It can also be run with `yarn build`.


## Unit tests

See [this document](tests/README.md) for information on how to run the unit tests.

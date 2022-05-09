## Unit tests

The unit tests for Inform 7 extensions use the same system as the test suite for the JavaScript library. See [its documentation](https://github.com/vorple/vorple) for instructions on how to set it up – the basic procedure is identical.

The test setup assumes that you have both this and the main Vorple repository cloned in the same parent directory.

The Inform 7 tests have tasks split between the JavaScript test rules and the Inform 7 test story in the `tests/stories` directory. The test story runs the extension features and the JavaScript side confirms that they have done what they were supposed to, apart from some cases where it makes more sense for the I7 story to check the results itself.

The `compile.sh` file in the `stories` directory is a shell script for Mac and Linux that builds the unit test story automatically. The script is run when you run the unit tests with the `npm test` command. It can also be run with `npm run build:test` without running the test suite.

The script needs to know where the Inform executables are located. Set up the script by copying the `.env.example` file to `.env` in the project's root directory. Edit the file and set the correct paths to the Inform executables.

# Micropython-REPLink 🐍

Handy shortcuts for interacting with a Micropython REPL terminal. This extension enables rapid development on embedded hardware by providing file uploading and code execution within the same REPL environment.

## Commands

* Run current script on the remote device
* Run selected text on the remote device
* Save current script as a file on the remote device

## How it works

The three commands provided by this extension essentially copy the contents of the script (or selected text) into the VS Code terminal as a raw string literal with the name `vscode_contents`. This variable is then either executed using the python `exec()` function, or written to the file system. 

The user is responsible for initializing the REPL in the terminal. 

To access these commands, use the command palette (ctrl+shift+P and search for Micropython) or assign them to a keybinding.

## Requirements

This extension does not provide a REPL. Various options are available but [MPFshell](https://github.com/wendlers/mpfshell) is tested and recommended. MPFshell works via serial, websockets and telnet. So far only serial has been tested but the other methods should also work.


## Release Notes

### 1.0.0

Initial release.



# firmware-flasher

Console flasher tool for the following Dygma products:

- Defy Wired
- Defy Wireless
- Raise 2 Wired
- Raise 2 Wireless

Usage:

- run locally the compiled script, do so using two arguments:
  - Arg 0: Full or relative path to the firmware hex file.
  - Arg 1: Full erase option, "true" activates it, "false" disables it.

The flasher will fail to execute if the provided path is not a path or the second argument is not "true" or "false"

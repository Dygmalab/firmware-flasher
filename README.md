# firmware-flasher

Console flasher tool for the following Dygma products:

- Defy Wired
- Defy Wireless
- Raise 2 Wired
- Raise 2 Wireless

Made with NodeJS and packaging tools for JS environment.

Part of the source code comes from Bazecor, specifically the flasher tool for Dygma's keyboards.

To be used when developing the Neuron Wired/Wireless firmware for Defy & Raise 2.

Usage:

- run locally the compiled script, do so using two arguments:
  - Arg 0: Full or relative path to the firmware hex file.
  - Arg 1: Full erase option, "true" activates it, "false" disables it.

The flasher will fail to execute if the provided path is not a path or the second argument is not "true" or "false"

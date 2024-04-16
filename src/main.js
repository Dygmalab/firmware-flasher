import Focus from "./focus.js";
import NRf52833 from "./nRF-flasher.js";

/**
 * [External arguments for script]
 * @param  {[type]} filename [filename of the .hex FW to be loaded]
 * @return {{filename: string, fullErase: boolean}}      [Returns data object with the two values]
 */
function validate() {
    let fileName = "../release/NRF-Neuron.hex";
    let fullErase = true;
    let args = process.argv.slice(2);
    fileName = args[0] || fileName;
    console.log("Searching file to flash: ", fileName);
    fullErase = (args[1] === "false") || fullErase;
    console.log("Default erase full flash: ", fullErase);
    return {fileName, fullErase};
}

//Check if the input parameters are valid
let {fileName, fullErase} = validate();

// Create focus and open it against the provided device
console.log("searching for N2...");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let focus = new Focus();
let info = {usb: {productId: 0x0012, vendorId: 0x35ef}};
let open = false;
try {
    open = await focus.open(info, info);
} catch (e) {
    console.error(e);
}
if (open !== false) {
    await focus.request("upgrade.start");
    let ready = false;
    do {

        let isReady = await focus.request("upgrade.isReady");
        if (isReady !== "true ") {
            console.log("Device not ready for upgrade disconnect all sides or is sides are connected press esc");
            await delay(500);
        } else {
            ready = true;
        }
    } while (ready === false);

    try {
        await focus.request("upgrade.neuron");
    } catch (e) {
        console.error(e);
    }
}
info = {usb: {productId: 0x0013, vendorId: 0x35ef}};
if (focus.closed)
    open = await focus.open(info, info);


// Begin the update process of the FW
console.log("Begin update firmware with NRf52833...");
try {
    await NRf52833.flash(fileName, async (err, result) => {
        if (err) throw new Error(`Flash error ${result}`);
        else {
            console.log("Firmware update of NRf52833 ended succesfully");
        }
    }, fullErase);
} catch (e) {
    console.error("something went wrong!", e);
}

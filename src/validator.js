("use strict");
const localeData = require("./locale.js")

var validator = module.exports = {
    printLines: "",
    params: null,
    errors: [],
    commands: [],
    checksComplete: 0,
    commandCount: 0,
    parsedLines: [],
    locale: null,
    contentIndexCounter: 0,

    validate(printLines, params) {
        validator.printLines = printLines;
        validator.params = params;
        validator.locale = localeData[params.locale];

        validator.validateHeader();
        validator.validateBody();
        validator.validateFooter();

        validator.validateContent();

        console.log(validator.parsedLines);

        if(validator.errors.length != 0) {
            console.log("Validation failed")
            validator.errors.forEach(function(error) {
                console.log(error);
            });
        }
        else
            console.log("Validation passed")
        console.log(`PrintLines contained ${validator.commandCount} commands. Ran ${validator.checksComplete} checks.`)
    },

    validateHeader() {
        if (!validator.printLines.startsWith("^XA^CI28^^LL"))
            validator.errors.push(`Header does not start with '^XA^CI28^^LL'. Header received as ${validator.printLines.slice(0, 15)}...`)
        validator.checksComplete++;
    },

    hex2a(hexx) {
    var hex = hexx.replace(/_/g,'');
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
    },

    validateField(fieldArray) {
        var font, fieldBlock, fieldHex, fieldData;
        var isHex = false;
        //use this loop to find properties to test on.
        fieldArray.forEach(function(command) {
            if(command == "FH") {
                isHex = true;
            }
        });
        //use this loop to consume commands
        while(fieldArray.length) {
            var command = fieldArray.shift();

            if(isHex && command.startsWith("FD")) {
                validator.parsedLines.push(validator.hex2a(command.slice(3)));
            }

            else {
                //we didn't parse anything so fix checksComplete counter
                //validator.errors.push(`Unknown command ${command} found in printLines.`);
            }
        }
        

    },

    validateBody() {
        validator.commands = validator.printLines.split("^");
        validator.commandCount = validator.commands.length;
        while (validator.commands.length) {
            var command = validator.commands.shift();
            validator.checksComplete++;

            if(command == "FS") {
                var fieldArray = [];
                var i = 0;
                do {
                    fieldArray.push(command);
                    command = validator.commands.shift();
                } while(command && command != "FS");
                if (!command) {
                    //shift last FS off fieldArray, then put the rest back on commands. 
                    fieldArray.shift();
                    fieldArray.forEach(function(command) {
                        validator.commands.push(command);
                    });
                    //set command to empty string so it can fall through the rest of the checks
                    command = "";
                }
                else {
                    validator.validateField(fieldArray);
                    validator.commands.unshift("FS")
                }
            }
            else if(command.startsWith("MM")) {
                if(!command.endsWith("K")) {
                    validator.errors.push(`Print Mode (MM) command should be Kiosk (K) mode. Expected 'MMK'; was ${command}`);
                }
            }

            else if(command.startsWith("LL")) {
                var number = Number(command.slice(2));
                if(command.length == 2) {
                    //pass
                }
                else if(!(number >= 1) || !(number <= 32000)) {
                    validator.errors.push(`Label Length (LL) command accepts an integer (1-32000) or nothing. Expected 'LL****'; was ${command}`);
                }
            }

            else if(command.startsWith("MN")) {
                if(!command.endsWith("N")) {
                    validator.errors.push(`Media Tracking (MN) should be Continuous Media (N) mode. Expected 'MNN' was ${command}`);
                }
            }

            else if(command.startsWith("MF")) {
                if(!command.endsWith("N,N")) {
                    validator.errors.push(`Media Feed (MF) should be No Media Feed (N) for power-up and closing printhead. Expected 'MFN,N' was ${command}`);
                }
            }

            else if(command.startsWith("PO")) {
                if(!command.endsWith("I")) {
                    validator.errors.push(`Print Orientation (PO) should be Invert (I). Expected 'POI'; was ${command}`)
                }
            }

            else if(command.startsWith("PW")) {
                //pass. I don't know yet. Example shows PW576~PL0. ~PL is a separate setting that adds ejection length to ^PN commands.
            }

            else if(command.startsWith("LH")) {
                if(command.length == 2) {
                    //pass
                }
                else {
                    var stringNumbers = command.slice(2).split(",");
                    if(stringNumbers.length != 2) {
                        validator.errors.push(`Label Home (LH) takes 2 or 0 arguments. Expected 'LH*,*'; received ${command}`);
                    }
                    else {
                        var number0 = Number(stringNumbers[0]);
                        var number1 = Number(stringNumbers[1]);
                        if(!(number0 >= 0) || !(number0 <= 32000) || !(number1 >= 0) || !(number1 <= 32000)) {
                            validator.errors.push(`Label Home (LH) command accepts integers (0-32000) or nothing. Expected 'LH*,*'; was ${command}`);
                        }
                    }
                }
            }

            else if(command.startsWith("FW")) {
                if(!command.endsWith("N")) {
                    validator.errors.push(`Field Orientation (FW) should be Normal (N). Expected 'FWN'; was ${command}`);
                }
            }

            else if(command.startsWith("KV")) {
                if(!command.endsWith("0,9,0,0,0")) {
                    validator.errors.push(`Kiosk Values (KV) should be 0, 9, 0, 0, 0. Expected 'KV0,9,0,0,0'; was ${command}`)
                }
            }

            else if(command.startsWith("LS")) {
                if(!command.endsWith("0")) {
                    validator.errors.push(`Label Shift (LS) should be 0. Expected 'LS0'; was ${command}`);
                }
            }

            else if(command.startsWith("FO")) {
                if(command.length == 2) {
                    //pass
                }
                else {
                    var stringNumbers = command.slice(2).split(",");
                    if(stringNumbers.length != 2) {
                        validator.errors.push(`Field Origin (FO) takes 2 or 0 arguments. Expected 'FO*,*'; received ${command}`);
                    }
                    else {
                        var number0 = Number(stringNumbers[0]);
                        var number1 = Number(stringNumbers[1]);
                        if(!(number0 >= 0) || !(number0 <= 32000) || !(number1 >= 0) || !(number1 <= 32000)) {
                            validator.errors.push(`Field Origin (FO) command accepts integers (0-32000) or nothing. Expected 'FO*,*'; was ${command}`);
                        }
                    }
                }
            }
            else if(command.startsWith("XG")) {
                if(!command.endsWith("E:SWOOSH.GRF,1,1")) {
                    validator.errors.push(`Recall Graphic (XG) should have device E:, image SWOOSH.GRF, x-magnification 1, y-magnification 1. Expected 'XGE:SWOOSH.GRF,1,1'; was ${command}`);
                }
            }
            else if(command.startsWith("CI")) {
                if(!command.endsWith("28")) {
                    validator.errors.push(`Change International Font/Encoding (CI) should be Unicode (28). Expected 'CI28'; was ${command}`);
                }

            }
            else if(command.startsWith("PN")) {
                if(command.slice(2) != "0") {
                    validator.errors.push(`Present Now (PN) should be 0. Expected 'PN0'; was ${command}`);
                }
            }
            else if(command == "XA") {
                //pass, command to start printLines
            }
            else if(command == "XZ") {
                //pass, command to end printlines
            }
            else if(command == "") {
                //nothing here, ignore
            }

            else {
                //we didn't parse anything so fix checksComplete counter
                validator.errors.push(`Unknown command ${command} found in printLines.`);
                validator.checksComplete--;
            }
        }
    },

    validateFooter() {
        if(!validator.printLines.endsWith("^PN0^XZ"))
            validator.errors.push("Error in footer. Does not end with '^PN0^XZ'")
        validator.checksComplete++;
    },

    validateContent() {
        // Verify all of the actual content on the receipt that comes from the parsed hex data
        validator.fieldIndexCounter = 0;
        validator.validateStringLine("nike", validator.locale.nike);
        validator.validateStringLine("location", validator.params.location);
        validator.validateStringLine("address1", validator.params.address1);
        validator.validateStringLine("address2", validator.params.address2);
        validator.validateStringLine("telephone", `${validator.locale.telephone}: ${validator.params.telephone}`);

        validator.validateItems(validator.contentIndexCounter);

        validator.validateAmountLine("subtotal", validator.locale.subtotal, validator.params.subtotal);
        validator.validateAmountLine("tax", validator.locale.tax, validator.params.tax);
        validator.validateAmountLine("total", validator.locale.total, validator.params.total);

        validator.validateStringLine("numSold", `${validator.locale.numSold}: ${validator.params.numSold}`);
        validator.validateStringLine("numReturned", `${validator.locale.numReturned}: ${validator.params.numReturned}`);

        validator.validateAmountLine("cash", validator.locale.cash, validator.params.cash);

    },

    validateStringLine(name, expected) {
        // Validate that a line at the current contentIndexCounter called <name> is equal to the string <expected>
        if(validator.parsedLines[validator.contentIndexCounter] != expected) {
            validator.errors.push(`Error in element: ${name}. Expected '${expected}'; was '${validator.parsedLines[validator.contentIndexCounter]}'`);
        }
        validator.checksComplete++;
        validator.contentIndexCounter++;
    },

    validateAmountLine(name, localName, value) {
        // Validate that a line at the current contentIndexCounter called <name> has the correct <localName> and <value>
        if(!validator.parsedLines[validator.contentIndexCounter].startsWith(localName)) {
            validator.errors.push(`Error in element: ${name}. Expected ${localName}; was ${validator.parsedLines[validator.contentIndexCounter]}`);
        }
        validator.checksComplete++;
        if(!validator.parsedLines[++validator.contentIndexCounter].split(" ")[-1] == value) {
            validator.errors.push(`Error in element: ${name}. Expected ${value}; was ${validator.parsedLines[validator.contentIndexCounter].split(" ")[-1]}`);
        }
        validator.checksComplete++;
    },

    validateItems() {
        //Look at all the items on the receipt and return the index at the end of the items
        var line = validator.parsedLines[validator.contentIndexCounter];
        while(!(line.startsWith(validator.locale.subtotal))) {
            // verify item desc
            ++validator.contentIndexCounter;
            line = validator.parsedLines[validator.contentIndexCounter];
            // verify gtin and size line
            ++validator.contentIndexCounter;
            line = validator.parsedLines[validator.contentIndexCounter];
        }
    }
}

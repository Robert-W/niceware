#!/usr/bin/env node
const niceware = require('./main');

const error = message => {
  console.log(`\x1B[1m\x1b[31m${message}\x1B[0m`);
}

const parseArguments = (args) => {
  const argumentMap = {};
  for (let index = 0; index < args.length; index += 2) {
    argumentMap[args[index]] = args[index + 1];
  }
  return argumentMap;
};

const printMenu = () => {
  console.log();
  console.log('\x1B[1mUsage:\x1b[0m niceware \x1b[1m[options]\x1b[0m\n');
  console.log('\x1B[1mOptions:\x1B[0m\n');
  console.log('-h, --help             Output usage');
  console.log('-g, --generate <size>  Generate a password with the provided number of bytes')
};

const run = () => {
  const argsMap = parseArguments(process.argv.slice(2));
  // If they're asking for help, print the menu and exit
  if (argsMap.hasOwnProperty('-h') || argsMap.hasOwnProperty('--help')) {
    printMenu();
    process.exit(0);
  }

  // Check for the generate argument
  if (argsMap['-g'] || argsMap['--generate']) {
    const size = argsMap['-g'] || argsMap['--generate'];
    try {
      const passphrase = niceware.generatePassphrase(+size);
      console.log(passphrase);
      process.exit(0);
    } catch (error) {
      error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
  
  // No valid commands entered
  error('Error: Invalid Arguments');
  printMenu();
  process.exit(1);
};

run();
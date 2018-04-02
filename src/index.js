import commander from 'commander';


  const program = require('commander');
  
 program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format[type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
 
   // .action((firstConfig, secondConfig) => {
    // firstValue = firstConfig;
    // seconValue = secondConfig;
 // });

 
export default program;

import commander from 'commander';

commander
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format[type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>');

export default commander;

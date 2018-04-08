#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../';

commander
  .version('1.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, commander.format)))
  .parse(process.argv);

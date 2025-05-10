#! /usr/bin/env node
import { Command } from 'commander';
// import config from '../../package.json';


const program = new Command();
program
  .name('inventory')
//   .version(config.version)
  .command('people', 'Query and interact with employees in inventory')
  .command('equipment', 'Query and interact with equipment in inventory')

program.parse(process.argv);

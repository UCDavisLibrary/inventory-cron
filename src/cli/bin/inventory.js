#! /usr/bin/env node
import { Command } from 'commander';


const program = new Command();
program
  .name('inventory')
  .command('people', 'Query and interact with employees in inventory')
  .command('equipment', 'Query and interact with equipment in inventory')

program.parse(process.argv);

import { Command } from 'commander';
// import equipment from '../lib/equipment.js';
import inventory from '../../lib/utils/inventory.js';

const program = new Command();

const searchOptions = ['name', 'type', 'model', 'key'];

program
  .command('lansweeper-list')
  .alias('lls')
  .description('List Lansweeper equipment records')
  .option('-t, --table', 'Enable table mode') // Boolean flag
  .action((options) => {
    let table = options.table ? true:false;
    console.log(`Table mode: ${table ? 'Enabled' : 'Disabled'}`);

    inventory.lansweeperList(table);
  }
);

program
  .command('peaks-list')
  .alias('pls')
  .description('List PEAKS people records')
  .option('-t, --table', 'Enable table mode') // Boolean flag
  .action((options) => {
    let table = options.table ? true:false;
    console.log(`Table mode: ${table ? 'Enabled' : 'Disabled'}`);

    inventory.peaksEquipmentList(table);
  }
);

program
  .command('update')
  .description('Check update for people records')
  .action(() => {

    inventory.equipmentUpdate();
  }
);


program
  .command('search')
  .description('Search assets based on name, type, model, or key')
  .option(
    '-c, --category <category>',
    'Choose the category',
    (val) => val.toLowerCase(),
    searchOptions[0] // Default value if none provided
  )
  .option('-k, --keyword <keyword>', 'Keyword to search for')
  .option('-t, --table', 'Enable table mode') // Boolean flag
  .action((options) => {
    let category, keyword;
    let table = options.table ? true:false;

    // Check if the category is valid
    if (!searchOptions.includes(options.category)) {
      console.error(`Invalid category. Choose from: ${searchOptions.join(', ')}`);
      process.exit(1);
    }

    // If no keyword is provided, ask for it
    if (!options.keyword) {
      console.error('You must provide a keyword to search.');
      process.exit(1);
    }

    if(options.category == "name"){
      category = "assetName";
    } else if(options.category == "type"){
      category = "assetType";
    } else if(options.category == "model"){
      category = "customModel";
    } else if(options.category == "key"){
      category = "key";
    }
    keyword = options.keyword;

    console.log(`Searching for ${keyword} in category '${category}'...\n`);
    console.log(`Table mode: ${table ? 'Enabled' : 'Disabled'}`);

    inventory.lansweeperSearch(table, category, keyword);
  });

program.parse(process.argv);

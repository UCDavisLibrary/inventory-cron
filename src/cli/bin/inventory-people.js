import { Command } from 'commander';
import inventory from '../../lib/utils/inventory.js';
const program = new Command();

const searchOptions = ['id', 'supervisorId', 'kerberos'];


program
  .command('iam-list')
  .alias('ils')
  .description('List IAM people records')
  .option('-t, --table', 'Enable table mode') // Boolean flag
  .action((options) => {
    let table = options.table ? true:false;
    console.log(`Table mode: ${table ? 'Enabled' : 'Disabled'}`);

    inventory.employeeList(table);
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

    inventory.peaksEmployeeList(table);
  }
);

program
  .command('update')
  .description('Check update for people records')
  .action(() => {

    inventory.employeeUpdate();
  }
);

program
  .command('search')
  .description('Search assets based on id, supervisorId, or kerberos')
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

    if(options.category == "id"){
      category = "iamId";
    } else if(options.category == "supervisorId"){
      category = "reportsToIAMID";
    } else if(options.category == "kerberos"){
      category = "userId";
    } 
    keyword = options.keyword;


    console.log(`Searching for ${keyword} in category '${category}'...`);
    console.log(`Table mode: ${table ? 'Enabled' : 'Disabled'}`);


    inventory.employeeSearch(table, category, keyword);
    
  });

// program
//   .command('assign')
//   .description('Assign/Revoke')
//   .action((id, options) => {
//     people.remove(id, options);
//   }
// );

  program.parse(process.argv);

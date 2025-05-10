# Inventory Cron

This is a CLI for taking the inventory from the Lansweeper API and the employees from the IAM API, parsing it, and supplying the information to the PEAKS application.



## App Components
### CLI
A CLI that utilizes the IAM Employees List, Lansweeper Equipment List, and the Peaks Employees and Equipment List.  The functionality is as follows:
1. List Peaks Employees: Lists the employees who are currently in the Peaks Database.  It can be displayed as a list and/or in table form on the console.
2. List Peaks Equipment: Lists the equipment who are currently in the Peaks Database.  It can be displayed as a list and/or in table form on the console.
3. List IAM Employees: Lists the employees who are currently in the IAM Database.  It can be displayed as a list and/or in table form on the console.
4. List Lansweeper Equipment: Lists the equipment who are currently in the Lansweeper Database.  It can be displayed as a list and/or in table form on the console.
5. Search IAM Employees: Search through the IAM list with parameters IAM ID, Supervisor ID, or Kerberos ID. It can be displayed as a list and/or in table form on the console.
6. Search Lansweeper Equipment: Search through the Lansweeper list with the parameters Equipment Name,  Type, Model, and Key. It can be displayed as a list and/or in table form on the console.
7. Update Equipment Peaks: Checks Lansweeper and Peaks for new Equipment and adds them if there is any changes.
8. Update Employee Peaks: Checks IAM and Peaks for new Employees and adds them if there is any changes.

### Cron
The cron runs every day at 7 am to start the functions for equipment and employee updates. 

## Deployment
### Local Deployment
1. Clone this repository
2. Checkout the branch you want to work on
3. Get .env from Google Cloud repository and put it into `./deploy/compose/ucdlib-inventory-cron-local-dev`
4. Build images by `docker-compose build --no-cache`
5. Run `docker-compose run cron` to run the cron container that runs 7 am
6. Run `docker-compose run cli sh` to bash into the CLI to run 




### Production Deployment
## Using CLI

To run CLI:

In folder `./deploy/compose/ucdlib-inventory-cron-local-dev` run `docker-compose run cli sh`

To run commands type: `node inventory.js [command] [options]`

**Examples** 

1. `node inventory.js people pls`
2. `node inventory.js equipment lls`
3. `node inventory.js people search *username*`

### Inventory Starter Menu:



**Usage**: *`inventory [command] [options]`*

  `people`: query and interact with employees in inventory

  `equipment`: Query and interact with equipment in inventory

  `help` [command]: display help for command



### Inventory People Menu
**Usage**: *`inventory-people [command] [options]`*



**Options**:

  `-h, --help`                display help for command



**Commands**:

  `iam-list|ils [options]`: List IAM people records

  `peaks-list|pls [options]`: List PEAKS people records

  `update`: Check update for people records

  `search [options]`:  Search assets based on id, supervisorId, or kerberos

  `help [command]`: display help for command



### Inventory Equipment Menu
**Usage**: `inventory-equipment [command] [options]`



Options:
  `-h, --help `                    display help for command



**Commands:**

  `lansweeper-list|lls [options]`: List Lansweeper equipment records

  `peaks-list|pls [options]`: List PEAKS people records

  `update`: Check update for people records

  `search [options]`:  Search assets based on name, type, model, or key

  `help [command]`: display help for command



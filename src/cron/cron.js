import cron from 'node-cron';
import serverConfig from "../serverConfig.js";
import inventory from '../lib/utils/inventory.js';

/**
 * @class InventoryCron
 * @description Utility class for Cron
 * Does auth.
 */
class InventoryCron {

  constructor(){

    // Credentials from env file
    this.config = serverConfig.libraryIamApi;
    this.configured = (this.config.url && this.config.user && this.config.key) ? true : false;
    this.configuredError = 'Library IAM API not configured in env file. Cannot query employee data.';
  }

  async startCron(){
    console.log("Cron is running");

    if(serverConfig.cron.enableCron) {
          cron.schedule(serverConfig.cron.cronSchedule, async () => {
            
            console.log("Running Employee Update Check...\n\n");
            inventory.employeeUpdate();

            console.log("Running Inventory Update Check...\n\n");
            inventory.equipmentUpdate();
          });
    }
  }

}

export default new InventoryCron();

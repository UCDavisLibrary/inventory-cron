import employeeFunctions from './employee_functions.js' 
import equipmentFunctions from './equipment_functions.js';

class Inventory {

  async lansweeperList(table=false){
    let assets = await equipmentFunctions.getAssets();

    if(!assets) {
      console.log("No Equipment from Lansweeper is Given.  Are you connected to Lansweeper?")
      return;
    } 

    let flattenArray = await equipmentFunctions.equipmentFlattenArray(assets);

    if(table){
      await equipmentFunctions.equipmentTable(flattenArray);
    }else{
      console.log(flattenArray)
    }  
  }

  async employeeList(table=false){
    let employees = await employeeFunctions.mergeEmployeeNames();

    if(!employees) {
      console.log("No Employees from IAM is Given.  Are you connected to the IAM List?")
      return;
    } 

    let flattenArray = await employeeFunctions.employeeFlattenArray(employees);

    if(table){
      await employeeFunctions.employeeTable(flattenArray);
    }else{
      console.log(flattenArray)
    }  
  }

  async lansweeperSearch(table=false, category, keyword){
    let assets = await equipmentFunctions.getAssets();
    assets = await equipmentFunctions.search(assets, category, keyword);

    if(table){
      await equipmentFunctions.equipmentTable(assets);
    }else{
      console.log(assets)
    } 
  }

  async employeeSearch(table=false, category, keyword){
    let employees = await employeeFunctions.mergeEmployeeNames()
    employees = await employeeFunctions.search(employees, category, keyword);

    if(table){
      await employeeFunctions.employeeTable(employees);
    }else{
      console.log(employees)
    }
    
  }

  async peaksEmployeeList(table=false){
    let employees = await employeeFunctions.getPeaksList();

    if(!employees) {
      console.log("No Employees from Peaks is Given.  Is there anything in Peaks Employees?")
      return;
    } 

    let flattenArray = await employeeFunctions.employeePeaksFlattenArray(employees);
    
    if(table){
      await employeeFunctions.employeeTable(flattenArray);
    }else{
      console.log(flattenArray)
    }

  }

  async peaksEquipmentList(table=false){
    let equipment = await equipmentFunctions.getPeaksList();

    if(!equipment) {
      console.log("No Equipment from Peaks is Given.  Is there anything in Peaks Equipment?")
      return;
    } 
    let flattenArray = await equipmentFunctions.equipmentPeaksFlattenArray(equipment);
    
    if(table){
      await equipmentFunctions.equipmentTable(flattenArray);
    }else{
      console.log(flattenArray)
    }

  }

  async employeeUpdate(){
    let peaksList = await employeeFunctions.getPeaksList();
    let iamList = await employeeFunctions.mergeEmployeeNames();

    let newEmployees = await employeeFunctions.compareLists(iamList, peaksList)

    if( Array.isArray(newEmployees) && newEmployees.length === 0){
      console.log("No new employees. Ending update process.");
      return;
    }
    console.log(`${newEmployees.length} Updates Found! Starting new updates...`)
    
    await employeeFunctions.createPeople(newEmployees);


  }

  async equipmentUpdate(){

    let peaksList = await equipmentFunctions.getPeaksList();
    let assetsList = await equipmentFunctions.getAssets();

    let newAssets = await equipmentFunctions.compareLists(assetsList, peaksList)

    if( Array.isArray(newAssets) && newAssets.length === 0){
      console.log("No new employees. Ending update process.");
      return;
    }
    console.log(`${newAssets.length} Updates Found! Starting new updates...`)
    
    await equipmentFunctions.createAssets(newAssets);
    
  }

}

export default new Inventory();

import {UcdiamModel, PeaksModel} from '../../lib/index.js'
import config from '../../serverConfig.js';

UcdiamModel.init(config.libraryIamApi);
PeaksModel.init(config.peaks)

class employeeFunctions {

    async mergeEmployeeNames(){
      let departmentList = await this.getDepartmentEmployees();
      departmentList = await this.assignNamesToList(departmentList.results);
      return departmentList;

    }

    async employeeFlattenArray(employees){
        let flattenArray = [];

        employees.map(emp => {
            let flattenData = {};

            if (emp?.iamId) flattenData.iamId = emp.iamId; else {flattenData.iamId = 'N/A'};
            if (emp?.ppsId) flattenData.ppsId = emp.ppsId; else {flattenData.ppsId = 'N/A'};
            if (emp?.oFullName) flattenData.oFullName = emp.oFullName; else {flattenData.oFullName = 'N/A'};
            if (emp?.userId) flattenData.userId = emp.userId; else {flattenData.userId = 'N/A'};
            if (emp?.campusEmail) flattenData.campusEmail = emp.campusEmail; else {flattenData.campusEmail = 'N/A'};
            if (emp?.employeeId) flattenData.employeeId = emp.employeeId; else {flattenData.employeeId = 'N/A'};
            if (emp?.pps?.deptCode) flattenData.deptCode = emp.pps.deptCode; else {flattenData.deptCode = 'N/A'};
            if (emp?.pps?.deptDisplayName) flattenData.deptDisplayName = emp.pps.deptDisplayName; else {flattenData.deptDisplayName = 'N/A'};
            if (emp?.pps?.adminBouOrgOId) flattenData.adminBouOrgOId = emp.pps.adminBouOrgOId; else {flattenData.adminBouOrgOId = 'N/A'};
            if (emp?.pps?.assocStartDate) flattenData.assocStartDate = emp.pps.assocStartDate; else {flattenData.assocStartDate = 'N/A'};
            if (emp?.pps?.assocEndDate) flattenData.assocEndDate = emp.pps.assocEndDate; else {flattenData.assocEndDate = 'N/A'};
            if (emp?.pps?.positionType) flattenData.positionType = emp.pps.positionType; else {flattenData.positionType = 'N/A'};
            if (emp?.pps?.percentFullTime) flattenData.percentFullTime = emp.pps.percentFullTime; else {flattenData.percentFullTime = 'N/A'};
            if (emp?.pps?.titleOfficialName) flattenData.titleOfficialName = emp.pps.titleOfficialName; else {flattenData.titleOfficialName = 'N/A'};
            if (emp?.pps?.reportsToIAMID) flattenData.reportsToIAMID = emp.pps.reportsToIAMID; else {flattenData.reportsToIAMID = 'N/A'};
            if (emp?.supervisor?.oFullName) flattenData.supervisorFullName = emp.supervisor.oFullName; else {flattenData.supervisorFullName = 'N/A'};

        
            flattenArray.push(flattenData);
        })

        return flattenArray;
    }

    async employeePeaksFlattenArray(employees){
        let flattenArray = [];

        employees.map(emp => {
            let flattenData = {};

            if (emp?.person?.id) flattenData.id = emp.person.id; else {flattenData.id = 'N/A'};
            if (emp?.person?.active) flattenData.active = emp.person.active; else {flattenData.active = 'N/A'};
            if (emp?.person?.userId) flattenData.userId = emp.person.userId; else {flattenData.userId = 'N/A'};
            if (emp?.person?.name) flattenData.name = emp.person.name; else {flattenData.name = 'N/A'};
            if (emp?.person?.email) flattenData.email = emp.person.email; else {flattenData.email = 'N/A'};
            if (emp?.person?.title) flattenData.title = emp.person.title; else {flattenData.title = 'N/A'};
            if (emp?.equipmentCount) flattenData.equipmentCount = emp.equipmentCount; else {flattenData.equipmentCount = emp.equipmentCount};
            if (emp?.keyCount) flattenData.keyCount = emp.keyCount; else {flattenData.keyCount = emp.keyCount};
            if (emp?.workstationCount) flattenData.workstationCount = emp.workstationCount; else {flattenData.workstationCount = emp.workstationCount};
            if (emp?.accessCount) flattenData.accessCount = emp.accessCount; else {flattenData.accessCount = emp.accessCount};

            flattenArray.push(flattenData);
        })

        return flattenArray;
    }

    async getDepartmentEmployees(){
        let peopleRes = await UcdiamModel.deptlist();
        return peopleRes.payload.responseData;
    }

    async assignNamesToList(deptList){
        let assignedList = [];
        
        
        for(let dList of deptList){
            let newList = {};
            newList.pps = dList;
            let employee = await UcdiamModel.employeeID(parseInt(dList.iamId));
            employee = employee.payload.responseData.results[0];

            let supervisor = await UcdiamModel.employeeID(parseInt(dList.reportsToIAMID));
            supervisor = supervisor.payload.responseData.results[0];
            newList.supervisor = supervisor;

            const combinedObj = { ...newList, ...employee };
            assignedList.push(combinedObj);

        }

        return assignedList;       

    }

    async employeeTable(peopleJson){
        console.table(peopleJson);
    }

    async search(peopleJson, key ,value){
        let flattenArray = await this.employeeFlattenArray(peopleJson);

        const result = flattenArray.filter(item => item[key] == value);
        return result;
    }

    async getPeaksList() {
        let peaksEmployee = await PeaksModel.listEmployee();
        peaksEmployee = peaksEmployee.payload;

        return peaksEmployee;
    }
  
    async compareLists(iamList, peaksList){
        let difference; 

        if(peaksList){
            difference = iamList.filter(item1 => 
                !peaksList.some(item2 => item2.person?.userId === item1.userId)
            );
        } else {
            console.log("First time uploading people...")
            difference = iamList;
        }

        return difference;
    }

    async createPeople(newPeopleArray) {

        let formatPeaksArray = []

        newPeopleArray.map(iam => {
            let peaks = {};
            peaks["User"] = {};

            peaks["TeamId"] = 70;
            peaks["Active"] = true;
            peaks["SupervisorId"] = null;
            if (iam.iamId) peaks.User["Iam"] = iam.iamId; else {peaks.User["Iam"] = null};
            if (iam.userId) peaks["UserId"] = iam.userId; else {peaks["UserId"] = null};
            if (iam?.oFirstName || iam?.dFirstName) peaks.User["FirstName"] = iam?.oFirstName || iam?.dFirstName; else {peaks.User["FirstName"] = null};
            if (iam?.oLastName || iam?.dLastName) peaks.User["LastName"] = iam?.oLastName || iam?.dLastName; else {peaks.User["LastName"] = null};
            if (iam?.campusEmail) peaks.User["Email"] = iam?.campusEmail; else {peaks.User["Email"] = null};
            if (iam?.oFirstName || iam?.dFirstName) peaks["FirstName"] = iam?.oFirstName || iam?.dFirstName; else {peaks["FirstName"] = null};
            if (iam?.oLastName || iam?.dLastName) peaks["LastName"] = iam?.oLastName || iam?.dLastName; else {peaks["LastName"] = null};
            if (iam?.campusEmail) peaks["Email"] = iam?.campusEmail; else {peaks["Email"] = null};
            if (iam?.pps?.titleOfficialName) peaks["Title"] = iam?.pps?.titleOfficialName; else {peaks["Title"] = null};
            if (iam?.pps?.assocStartDate) peaks["StartDate"] = iam?.pps?.assocStartDate; else {peaks["StartDate"] = null};
            if (iam?.pps?.assocEndDate) peaks["EndDate"] = iam?.pps?.assocEndDate; else {peaks["EndDate"] = null};
            if (iam?.oFullName || iam?.dFullName) peaks["Name"] = iam?.oFullName || iam?.dFullName; else {peaks.User["Name"] = null};

            formatPeaksArray.push(peaks);
        })

        // console.log(formatPeaksArray);

        //uncomment after testing

        // let test = [
        //     {
        //         "Active": true,
        //         "TeamId": 70,
        //         "UserId": "xxxx",
        //         "User": {
        //             "Iam": "5555555555",
        //             "FirstName": "Test B First",
        //             "LastName": "Test B Last",
        //             "Email": "ss@ucdavis.edu"
        //         },
        //         "FirstName": "Test B First",
        //         "LastName": "Test B Last",
        //         "Name": "Test B Name 4",
        //         "Email": "ss@ucdavis.edu",
        //         "Tags": null,
        //         "Title": "STDT 4",
        //         "HomePhone": null,
        //         "TeamPhone": null,
        //         "SupervisorId": null,
        //         "StartDate": "2025-03-18 00:00:00",
        //         "EndDate": "2029-03-17 00:00:00",
        //         "Category": null,
        //         "Notes": null
        //     },
        //     {
        //         "Active": true,
        //         "TeamId": 70,
        //         "UserId": "sbagg",
        //         "User": {
        //             "Iam": "6666666666",
        //             "FirstName": "Test C First",
        //             "LastName": "Test C Last",
        //             "Email": "rr@ucdavis.edu"
        //         },
        //         "FirstName": "Test C First",
        //         "LastName": "Test C Last",
        //         "Name": "Test C Name 4",
        //         "Email": "rr@ucdavis.edu",
        //         "Tags": null,
        //         "Title": "STDT 4",
        //         "HomePhone": null,
        //         "TeamPhone": null,
        //         "SupervisorId": null,
        //         "StartDate": "2025-03-18 00:00:00",
        //         "EndDate": "2029-03-17 00:00:00",
        //         "Category": null,
        //         "Notes": null
        //     }
        // ];
        // await this.postPeaksEmployees(test);


        await this.postPeaksEmployees(formatPeaksArray);


    }

    async postPeaksEmployees(newEmployeesArray){
        // newEmployeesArray.map(async (emp) => {
        //     let person = emp;
        //     console.log("x:",person);
        //     let r = await PeaksModel.createPeople(JSON.stringify(person));
        //     console.log("R:", r);
        //     // Report updated Employee to logger
        // });

        for (const emp of newEmployeesArray) {
            console.log("Sending:", emp.Name);
            await PeaksModel.clearCache("employee");
            try {
                let r = await PeaksModel.createPeople(JSON.stringify(emp));
                console.log("Response:", r.state);
            } catch (error) {
                console.error("Error posting employee:", error);
            }
        }

    }
  
  }
  
  export default new employeeFunctions();
  
import {LansweeperModel, PeaksModel} from '../../lib/index.js'
import config from '../../serverConfig.js';
import loggerMessage from './logger.js'

LansweeperModel.init(config.lansweeper);
PeaksModel.init(config.peaks)

class equipmentFunctions {

    async getAssets(){
      let equipmentList = await LansweeperModel.getAssets();

      if(equipmentList.error){
        await loggerMessage('ERROR', equipmentList.error);
        throw new Error('Error getting Lansweeper Equipment List.');
      }

      return equipmentList.payload;

    } 

    async equipmentFlattenArray(assets){
        let flattenArray = [];

        assets.map(equip => {
            let flattenData = {};

            if (equip?.assetBasicInfo?.name) flattenData.assetName = equip.assetBasicInfo.name; else {flattenData.assetName = 'N/A'};
            if (equip?.assetBasicInfo?.type) flattenData.assetType = equip.assetBasicInfo.type; else {flattenData.assetType = 'N/A'};
            if (equip?.assetBasicInfo?.description) flattenData.assetDescription = equip.assetBasicInfo.description; else {flattenData.assetDescription = 'N/A'};
            if (equip?.assetCustom?.serialNumber) flattenData.customSerialNo = equip.assetCustom.serialNumber; else {flattenData.customSerialNo = 'N/A'};
            if (equip?.assetCustom?.manufacturer) flattenData.customManufacturer = equip.assetCustom.manufacturer; else {flattenData.customManufacturer = 'N/A'};
            if (equip?.assetCustom?.model) flattenData.customModel = equip.assetCustom.model; else {flattenData.customModel = 'N/A'};
            if (equip?.key) flattenData.key = equip.key; else {flattenData.key = 'N/A'};
            if (equip?.url) flattenData.url = equip.url; else {flattenData.url = 'N/A'};
            if (equip?.assetBasicInfo?.firstSeen) flattenData.firstSeen = equip.assetBasicInfo.firstSeen; else {flattenData.firstSeen = 'N/A'};
            if (equip?.assetBasicInfo?.lastSeen) flattenData.lastSeen = equip.assetBasicInfo.lastSeen; else {flattenData.lastSeen = 'N/A'};
        
            flattenArray.push(flattenData);
        })

        return flattenArray;
    }

    async equipmentPeaksFlattenArray(equipment){
        let flattenArray = [];

        equipment.map(equip => {
            let flattenData = {};

            if (equip?.id) flattenData.id = equip.id; else {flattenData.id = equip.id};
            if (equip?.name) flattenData.name = equip.name; else {flattenData.name = equip.name};
            if (equip?.type) flattenData.type = equip.type; else {flattenData.type = equip.type};
            if (equip?.serialNumber) flattenData.serialNumber = equip.serialNumber; else {flattenData.serialNumber = equip.serialNumber};
            if (equip?.make) flattenData.make = equip.make; else {flattenData.make = equip.make};
            if (equip?.model) flattenData.model = equip.model; else {flattenData.model = equip.model};
            if (equip?.assignment) flattenData.assignment = equip.assignment; else {flattenData.assignment = equip.assignment};

            flattenArray.push(flattenData);
        })

        return flattenArray;
    }

    async equipmentTable(assets){
        console.table(assets);

    }

    async search(assets, key ,value){
        let flattenArray = await this.equipmentFlattenArray(assets);

        const result = flattenArray.filter(item => item[key] == value);
        return result;
    }

    async getPeaksList() {
        let peaksEquipment = await PeaksModel.listEquipment();

        if(peaksEquipment.error){
            await loggerMessage('ERROR', peaksEquipment.error);
            throw new Error('Error getting Peaks Employees List.');
        }

        peaksEquipment = peaksEquipment.payload;

        return peaksEquipment;
    }

    async compareLists(assetList, peaksList){
        let difference; 

        console.log(assetList);


        if(peaksList){
            difference = assetList.filter(item1 => 
                !peaksList.some(item2 => item2.name === item1.assetBasicInfo.name)
            );
        } else {
            console.log("First time uploading equipment...")
            difference = assetList;
        }

        return difference;
    }

        async createAssets(newAssetsArray) {
            let formatPeaksArray = []
    
            newAssetsArray.map(assets => {
                let peaks = {};
    
                peaks["Active"] == true;
                peaks["Type"] = "Default";
                peaks["TeamId"] = 70;

                if (assets?.assetBasicInfo?.name) peaks.Name = assets.assetBasicInfo.name; else {peaks.Name = null};
                if (assets?.assetCustom?.serialNumber) peaks.SerialNumber= assets.assetCustom.serialNumber; else {peaks.SerialNumber = null};
                if (assets?.assetCustom?.manufacturer) peaks.Make = assets.assetCustom.manufacturer; else {peaks.Make= null};
                if (assets?.assetCustom?.model) peaks.Model = assets.assetCustom.model; else {peaks.Model = null};

                formatPeaksArray.push(peaks);
            })
    
            await this.postPeaksAssets(formatPeaksArray);

        }

        async postPeaksAssets(newAssetsArray){
            for (const assets of newAssetsArray) {
                console.log("Sending:", assets.Name);
                await PeaksModel.clearCache("equipment");
                try {
                    let r = await PeaksModel.createEquipment(JSON.stringify(assets));
                    await loggerMessage('INFO', r.state);
                    console.log("Response:", r.state);
                } catch (error) {
                    await loggerMessage('ERROR', error);
                    console.error("Error posting employee:", error);
                }
            }
        }

  
  
  }
  
  export default new equipmentFunctions();
  
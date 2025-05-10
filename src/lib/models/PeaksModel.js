import {BaseModel} from '@ucd-lib/cork-app-utils';
import PeaksService from '../services/PeaksService.js';
import PeaksStore from '../stores/PeaksStore.js';

class PeaksModel extends BaseModel {

  constructor() {
    super();

    this.store = PeaksStore;
    this.service = PeaksService;
      
    this.register('PeaksModel');
  }

    /**
   * @description Initialize the model by passing through an API key
   * @param {String|Object} config - Either API key or config object.
   */
    init(config={}){
      const defaultConfig = {
        url: 'https://peaks.ucdavis.edu/api',
        version: '1.0',
        key: ''
      };
      if ( typeof config === 'string' ){
        config = {key: config};
      }
      this.service.config = {
        ...defaultConfig,
        ...config
      };
    }

  async assignEquipment(personID, equipmentID){
    let state = this.store.data.peaksAssignEquipment;
    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.assignEquipment(personID, equipmentID);
      }
    } catch(e) {}

    return this.store.data.peaksAssignEquipment;
  }
  
  async revokeEquipment(equipmentID){
    let state = this.store.data.peaksRevokeEquipment;

    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.revokeEquipment(equipmentID);
      }
    } catch(e) {}

    return this.store.data.peaksRevokeEquipment;
  }

  async searchEquipment(query){
    let state = this.store.data.peaksSearchEquipment;

    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.searchEquipment(query);
      }
    } catch(e) {}

    return this.store.data.peaksSearchEquipment;
  }

  async searchPeople(query){
    let state = this.store.data.peaksSearchPeople;

    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.searchPeople(query);
      }
    } catch(e) {}

    return this.store.data.peaksSearchPeople;
  }

  async createEquipment(equipment){
    let state = this.store.data.peaksCreatedEquipment;
    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.createEquipment(equipment);
      }
    } catch(e) {}

    return this.store.data.peaksCreatedEquipment;
  }

  async createPeople(person){
    let state = this.store.data.peaksCreatedPeople;
    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.createPeople(person);
      }
    } catch(e) {}

    return this.store.data.peaksCreatedPeople;
  }

  async listEquipment(filter={}){
    let state = this.store.data.peaksEquipmentList;

    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.listEquipment(filter={});
      }
    } catch(e) {}

    return this.store.data.peaksEquipmentList;
  }


  async listEmployee(filter={}){
    let state = this.store.data.peaksEmployeeList;
    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.listEmployee(filter={});
      }
    } catch(e) {}

    return this.store.data.peaksEmployeeList;
  }

    /**
   * @description Clear cache of single Peaks request
   * @param {String} type - the type of query to clear
   */
    clearCache(type) {
      if (type === "equipment") {
          this.store.data.peaksCreatedEquipment = {};
          this.store.data.peaksEquipmentList = {};
      } else if (type === "employee") {
          this.store.data.peaksCreatedPeople = {};
          this.store.data.peaksEmployeeList = {};
      }
  }

}

const model = new PeaksModel();
export default model;
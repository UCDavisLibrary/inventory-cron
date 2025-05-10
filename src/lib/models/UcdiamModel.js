import {BaseModel} from '@ucd-lib/cork-app-utils';
import UcdiamService from '../services/UcdiamService.js';
import UcdiamStore from '../stores/UcdiamStore.js';

class UcdiamModel extends BaseModel {

  constructor() {
    super();

    this.store = UcdiamStore;
    this.service = UcdiamService;
      
    this.register('UcdiamModel');
  }
  /**
   * @description Initialize the model by passing through an API key
   * @param {String|Object} config - Either API key or config object.
   */
    init(config={}){
      const defaultConfig = {
        url: 'https://iet-ws.ucdavis.edu/api',
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

  /**
   * @description Get list of employees in library department
   * @returns {Array}
   */
  async deptlist(){
    let state = this.store.data.deptList;
    try {
      if ( state.state === 'loading' ){
        await state.request
      } else {
        await this.service.deptlist();
      }
    } catch(e) {}

    return this.store.data.deptList;
  }

    /**
   * @description Get employees by IDs in library department
   * @returns {Array}
   */
    async employeeID(id){
      let state = this.store.data.employeeID;
      try {
        if ( state.state === 'loading' ){
          await state.request
        } else {
          await this.service.employeeID(id);
        }
      } catch(e) {}
      return this.store.data.employeeID;
    }
  

}

const model = new UcdiamModel();
export default model;
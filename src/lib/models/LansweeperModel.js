import {BaseModel} from '@ucd-lib/cork-app-utils';
import LansweeperService from '../services/LansweeperService.js';
import LansweeperStore from '../stores/LansweeperStore.js';

class LansweeperModel extends BaseModel {

  constructor() {
    super();

    this.store = LansweeperStore;
    this.service = LansweeperService;
      
    this.register('LansweeperModel');
  }

  /**
   * @description Initialize the model by passing through an API key
   * @param {String|Object} config - Either API key or config object.
   */
    init(config={}){
      const defaultConfig = {
        url: 'https://api.lansweeper.com/api/v2/graphql',
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

    async getAssets(){
      let state = this.store.data.assets;
      try {
        if ( state.state === 'loading' ){
          await state.request
        } else {
          await this.service.getAssets();
        }
      } catch(e) {}

      return this.store.data.assets;
    }

}

const model = new LansweeperModel();
export default model;
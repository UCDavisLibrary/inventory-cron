import {BaseService} from '@ucd-lib/cork-app-utils';
import PeaksStore from '../stores/PeaksStore.js';

class PeaksService extends BaseService {

  constructor() {
    super();
    this.store = PeaksStore;
  }

  async assignEquipment(personID, equipmentID){
    const url = `${this.config.url}/${this.config.team}/equipment/Assign`;

    const params = new URLSearchParams({
      personId: personID, 
      equipmentId: equipmentID
    });

    return this.request({
      url : `${url}?${params.toString()}`,
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getAssignEquipmentLoading(request),
      checkCached : () => this.store.data.peaksAssignEquipment,
      onLoad : result => this.store.getAssignEquipmentLoaded(result.body),
      onError : e => this.store.getAssignEquipmentError(e)
    });
  }

  async revokeEquipment(equipmentID){
    const url = `${this.config.url}/${this.config.team}/equipment/Revoke/${equipmentID}`;
    
    return this.request({
      url : `${url}`,
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getRevokeEquipmentLoading(id, request),
      checkCached : () => this.store.data.peaksRevokeEquipment,
      onLoad : result => this.store.getRevokeEquipmentLoaded(id, result.body),
      onError : e => this.store.getRevokeEquipmentError(id, e)
    });
  }

  async searchEquipment(query){
    const url = `${this.config.url}/${this.config.team}/equipment/Search`;
    const params = new URLSearchParams({
      q: query
    });
    
    return this.request({
      url : `${url}?${params.toString()}`,
      fetchOptions : {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getSearchEquipmentLoading(query, request),
      checkCached : () => this.store.data.peaksSearchEquipment,
      onLoad : result => this.store.getSearchEquipmentLoaded(query, result.body),
      onError : e => this.store.getSearchEquipmentError(query, e)
    });
  }

  async searchPeople(query){
    const url = `${this.config.url}/${this.config.team}/people/SearchPeople`;
    const params = new URLSearchParams({
      q: query
    });
    
    return this.request({
      url : `${url}?${params.toString()}`,
      fetchOptions : {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getSearchPeopleLoading(query, request),
      checkCached : () => this.store.data.peaksSearchPeople,
      onLoad : result => this.store.getSearchPeopleLoaded(query, result.body),
      onError : e => this.store.getSearchPeopleError(query, e)
    });
  }

  async createEquipment(payload){
    const url = `${this.config.url}/${this.config.team}/equipment/Create`;
    
    return this.request({
      url : `${url}`,
      fetchOptions : {
        method : 'POST',
        body: payload,
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getCreatedEquipmentLoading(request),
      checkCached : () => this.store.data.peaksCreatedEquipment,
      onLoad : result => this.store.getCreatedEquipmentLoaded(result.body),
      onError : e => this.store.getCreatedEquipmentError(e)
    });
  }

  async createPeople(payload){
  const url = `${this.config.url}/${this.config.team}/people/Create`;

    return this.request({
      url : `${url}`,
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        },
        body: payload
      },
      onLoading : request => this.store.getCreatedPeopleLoading(request),
      checkCached : () => this.store.data.peaksCreatedPeople,
      onLoad : result => this.store.getCreatedPeopleLoaded(result.body),
      onError : e => this.store.getCreatedPeopleError(e)
    });
  }

  async listEquipment(filter={}){
    const url = `${this.config.url}/${this.config.team}/equipment/List`;
    
    return this.request({
      url : `${url}`,
      fetchOptions : {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getEquipmentListLoading(request),
      checkCached : () => this.store.data.peaksEquipmentList,
      onLoad : result => this.store.getEquipmentListLoaded(result.body),
      onError : e => this.store.getEquipmentListError(e)
    });
  }

  async listEmployee(filter={}){
    const url = `${this.config.url}/${this.config.team}/people/List`;
    
    return this.request({
      url : `${url}`,
      fetchOptions : {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'X-Auth-Token' : this.config.key
        }
      },
      onLoading : request => this.store.getEmployeeListLoading(request),
      checkCached : () => this.store.data.peaksEmployeeList,
      onLoad : result => this.store.getEmployeeListLoaded(result.body),
      onError : e => this.store.getEmployeeListError(e)
    });
  }

}

const service = new PeaksService();
export default service;
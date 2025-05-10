import {BaseService} from '@ucd-lib/cork-app-utils';
import UcdiamStore from '../stores/UcdiamStore.js';

class UcdiamService extends BaseService {

  constructor() {
    super();
    this.store = UcdiamStore;
  }

  deptlist(){
    const url = `${this.config.url}/iam/associations/pps/search`
    const params = new URLSearchParams({
      deptCode: '060500',
      v: this.config.version, 
      key: this.config.key
    });
    
    return this.request({
      url : `${url}?${params.toString()}`,
      onLoading : request => this.store.getDeptListLoading(request),
      checkCached : () => this.store.data.deptList,
      onLoad : result => this.store.getDeptListLoaded(result.body),
      onError : e => this.store.getDeptListError(e)
    });
  }

  employeeID(id){
    const url = `${this.config.url}/iam/people/${id}`
    const params = new URLSearchParams({
      v: this.config.version, 
      key: this.config.key
    });

    return this.request({
      url : `${url}?${params.toString()}`,
      onLoading : request => this.store.getEmployeeIDLoading(request, id),
      checkCached : () => this.store.data.employeeID[id],
      onLoad : result => this.store.getEmployeeIDLoaded(result.body, id),
      onError : e => this.store.getEmployeeIDError(e, id)
    });
  }


}

const service = new UcdiamService();
export default service;
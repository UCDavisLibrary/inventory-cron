import {BaseStore} from '@ucd-lib/cork-app-utils';

class UcdiamStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      deptList: {},
      employeeID: {}
    };
    this.events = {
      UCDIAM_DEPTLIST_FETCH: 'ucdiam-deptlist-fetch',
      UCDIAM_EMPLOYEE_ID_FETCH: 'ucdiam-employeeid-fetch'
    };
  }

  getDeptListLoading(request) {
    this._setDeptListState({
      state : this.STATE.LOADING,
      request
    });
  }

  getDeptListLoaded(payload) {
    this._setDeptListState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getDeptListError(error) {
    this._setDeptListState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setDeptListState(state) {
    this.data.deptList = state;
    this.emit(this.events.UCDIAM_DEPTLIST_FETCH, state);
  }

  getEmployeeIDLoading(request, id) {
    this._setEmployeeIDState({
      state : this.STATE.LOADING,
      request
    }, id);
  }

  getEmployeeIDLoaded(payload, id) {
    this._setEmployeeIDState({
      state : this.STATE.LOADED,
      payload
    }, id);
  }

  getEmployeeIDError(error, id) {
    this._setEmployeeIDState({
      state : this.STATE.ERROR,
      error
    }, id);
  }

  _setEmployeeIDState(state, id) {
    this.data.employeeID = state;
    this.emit(this.events.UCDIAM_EMPLOYEE_ID_FETCH, state);
  }

}

const store = new UcdiamStore();
export default store;
import {BaseStore} from '@ucd-lib/cork-app-utils';

class PeaksStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      peaksCreatedEquipment: {},
      peaksCreatedPeople: {},
      peaksAssignEquipment: {},
      peaksRevokeEquipment: {},
      peaksSearchPeople: {},
      peaksSearchEquipment: {},
      peaksEquipmentList: {},
      peaksEmployeeList: {}
    };
    this.events = {
      PEAKS_EQUIPMENT_CREATED: 'peaks-equipment-equipment',
      PEAKS_PEOPLE_CREATED: 'peaks-people-equipment',
      PEAKS_EQUIPMENT_ASSIGN: 'peaks-equipment-assign',
      PEAKS_EQUIPMENT_REVOKE: 'peaks-equipment-revoke',
      PEAKS_PEOPLE_SEARCH: 'peaks-people-search',
      PEAKS_EQUIPMENT_SEARCH: 'peaks-equipment-search',
      PEAKS_EQUIPMENT_LIST_FETCH: 'peaks-equipment-list-fetch',
      PEAKS_EMPLOYEE_LIST_FETCH: 'peaks-employee-list-fetch',
    };
  }

  getAssignEquipmentLoading(request) {
    this._setAssignEquipmentState({
      state : this.STATE.LOADING,
      request
    });
  }

  getAssignEquipmentLoaded(payload) {
    this._setAssignEquipmentState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getAssignEquipmentError(error) {
    this._setAssignEquipmentState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setAssignEquipmentState(state) {
    this.data.peaksAssignEquipment = state;
    this.emit(this.events.PEAKS_EQUIPMENT_ASSIGN, state);
  }

  getRevokeEquipmentLoading(id, request) {
    this._setRevokeEquipmentState({
      state : this.STATE.LOADING,
      request
    }, id);
  }

  getRevokeEquipmentLoaded(id, payload) {
    this._setRevokeEquipmentState({
      state : this.STATE.LOADED,
      payload
    }, id);
  }

  getRevokeEquipmentError(id, error) {
    this._setRevokeEquipmentState({
      state : this.STATE.ERROR,
      error
    }, id);
  }

  _setRevokeEquipmentState(state, id) {
    this.data.peaksRevokeEquipment[id] = state;
    this.emit(this.events.PEAKS_EQUIPMENT_REVOKE, state);
  }

  getSearchEquipmentLoading(query, request) {
    this._setRevokeEquipmentState({
      state : this.STATE.LOADING,
      request
    }, query);
  }

  getSearchEquipmentLoaded(query, payload) {
    this._setRevokeEquipmentState({
      state : this.STATE.LOADED,
      payload
    }, query);
  }

  getSearchEquipmentError(query, error) {
    this._setRevokeEquipmentState({
      state : this.STATE.ERROR,
      error
    }, query);
  }

  _setSearchEquipmentState(state, query) {
    this.data.peaksSearchEquipment[query] = state;
    this.emit(this.events.PEAKS_EQUIPMENT_SEARCH, state);
  }

  getSearchPeopleLoading(query, request) {
    this._setSearchPeopleState({
      state : this.STATE.LOADING,
      request
    }, query);
  }

  getSearchPeopleLoaded(query, payload) {
    this._setSearchPeopleState({
      state : this.STATE.LOADED,
      payload
    }, query);
  }

  getSearchPeopleError(query, error) {
    this._setSearchPeopleState({
      state : this.STATE.ERROR,
      error
    }, query);
  }

  _setSearchPeopleState(state, query) {
    this.data.peaksSearchPeople[query] = state;
    this.emit(this.events.PEAKS_PEOPLE_SEARCH, state);
  }


  getCreatedEquipmentLoading(request) {
    this._setCreatedEquipmentState({
      state : this.STATE.LOADING,
      request
    });
  }

  getCreatedEquipmentLoaded(payload) {
    this._setCreatedEquipmentState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getCreatedEquipmentError(error) {
    this._setCreatedEquipmentState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setCreatedEquipmentState(state) {
    this.data.peaksCreatedEquipment = state;
    this.emit(this.events.PEAKS_EQUIPMENT_CREATED, state);
  }

  getCreatedPeopleLoading(request) {
    this._setCreatedPeopleState({
      state : this.STATE.LOADING,
      request
    });
  }

  getCreatedPeopleLoaded(payload) {
    this._setCreatedPeopleState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getCreatedPeopleError(error) {
    this._setCreatedPeopleState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setCreatedPeopleState(state) {
    this.data.peaksCreatedPeople = state;
    this.emit(this.events.PEAKS_PEOPLE_CREATED, state);
  }

  getEquipmentListLoading(request) {
    this._setEquipmentListState({
      state : this.STATE.LOADING,
      request
    });
  }

  getEquipmentListLoaded(payload) {
    this._setEquipmentListState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getEquipmentListError(error) {
    this._setEquipmentListState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setEquipmentListState(state) {
    this.data.peaksEquipmentList = state;
    this.emit(this.events.PEAKS_EQUIPMENT_LIST_FETCH, state);
  }

  getEmployeeListLoading(request) {
    this._setEmployeeListState({
      state : this.STATE.LOADING,
      request
    });
  }

  getEmployeeListLoaded(payload) {
    this._setEmployeeListState({
      state : this.STATE.LOADED,
      payload
    });
  }

  getEmployeeListError(error) {
    this._setEmployeeListState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setEmployeeListState(state) {
    this.data.peaksEmployeeList = state;
    this.emit(this.events.PEAKS_EMPLOYEE_LIST_FETCH, state);
  }


}

const store = new PeaksStore();
export default store;
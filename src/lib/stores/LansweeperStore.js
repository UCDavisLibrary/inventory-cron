import {BaseStore} from '@ucd-lib/cork-app-utils';

class LansweeperStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      assets: {}
    };
    this.events = {
      LANSWEEPER_GET_ASSETS_FETCH: 'lansweeper-get-assets-fetch'
    };
  }

  getAssetsLoading(request, filters) {
    this._setAssetsState({
      state : this.STATE.LOADING,
      request
    }, filters);
  }

  getAssetsLoaded(payload, filters) {
    this._setAssetsState({
      state : this.STATE.LOADED,
      payload
    }, filters);
  }

  getAssetsError(error, filters) {
    this._setAssetsState({
      state : this.STATE.ERROR,
      error
    }, filters);
  }

  _setAssetsState(state, filters) {
    this.data.assets = state;
    this.emit(this.events.LANSWEEPER_GET_ASSETS_FETCH, state);
  }

}

const store = new LansweeperStore();
export default store;
import {BaseService} from '@ucd-lib/cork-app-utils';
import LansweeperStore from '../stores/LansweeperStore.js';

class LansweeperService extends BaseService {

  constructor() {
    super();
    this.store = LansweeperStore;
  }

  async getAssets(filters = {}){
    const url = `${this.config.url}`;

    let allAssets = [];
    let cursor = null;
    let nextPage = "FIRST";
    const limit = 500;

    while (nextPage) {

        let pageOptions = (nextPage == "FIRST") ? 
        {
          limit: limit,
          page: nextPage
        }
        : 
        {
          limit: limit,
          cursor: cursor,
          page: nextPage
        };

        let response = await this.request({
          url: `${url}`,
            fetchOptions: {
                method: "POST",
                headers: {
                    "Authorization": `Token ${this.config.key}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  query: `query getAssets($siteId: ID!, $pagination: AssetsPaginationInputValidated) {
                      site(id: $siteId) {
                          assetResources(assetPagination: $pagination, fields: [
                              "assetBasicInfo.firstSeen",
                              "assetBasicInfo.lastSeen",
                              "assetBasicInfo.upTime",
                              "assetBasicInfo.userName",
                              "assetBasicInfo.domain",
                              "assetBasicInfo.name",
                              "assetBasicInfo.type",
                              "assetBasicInfo.description",
                              "assetBasicInfo.ipAddress",
                              "assetBasicInfo.mac",
                              "assetCustom.manufacturer",
                              "assetCustom.model",
                              "assetCustom.serialNumber",
                              "assetCustom.warrantyDate",
                              "operatingSystem.name",
                              "operatingSystem.buildNumber",
                              "operatingSystem.installDate",
                              "url"
                          ]) {
                              total
                              pagination {
                                  limit
                                  current
                                  next
                                  page
                              }
                              items
                          }
                      }
                  }`,
                  variables: {
                      siteId: `${this.config.siteID}`,
                      pagination: pageOptions
                  }
              }),
              json: true,
            }
            
      })

      if(response.error) {
        this.store.getAssetsError(response.response, filters);
        return;
      }
      
      const data = response.body;
      const assets = data.data.site.assetResources;

      if (assets) {
          if(!assets.pagination.current){
            nextPage = null;
            this.store.getAssetsLoaded(allAssets, filters);
            break;
          }
          allAssets.push(...assets.items);
          cursor = assets.pagination.next;
          nextPage = "NEXT";
          this.store.getAssetsLoading(this.request, filters);
      } 
    }

    return;

  }
}
const service = new LansweeperService();
export default service;
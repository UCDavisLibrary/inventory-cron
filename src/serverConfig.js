import * as dotenv from 'dotenv'
dotenv.config();


/**
 * @description Server configuration file. Reads environment variables and sets defaults.
 * To pass any of these variables to the browser, see static.js
 */
class ServerConfig {
    constructor() {
  
      this.version = this.getEnv('APP_VERSION', '0.0.9');
      this.env = process?.env?.APP_ENV === 'dev' ? 'dev' : 'prod';
      
      this.apiRoot = this.getEnv('APP_API_ROOT', '/api');

      this.port = {
        container: this.getEnv('APP_CONTAINER_PORT', 3000), // server port within docker container
        host: this.getEnv('APP_HOST_PORT', 3000), // server port on host machine
      }
  
  
      // Made available to the browser-side app, so don't put any secrets here.
      this.auth = {
        // forces browser-side authentication. Browser then passes auth token to server.
        requireAuth: this.getEnv('APP_REQUIRE_AUTH', true),
  
        // passed to the browser-side keycloak library initialization
        keycloakJsClient: {
          url: this.getEnv('APP_KEYCLOAK_URL', 'https://auth.library.ucdavis.edu'),
          realm: this.getEnv('APP_KEYCLOAK_REALM', 'internal'),
          clientId: this.getEnv('APP_KEYCLOAK_CLIENT_ID', 'inventory-cli')
        },
        oidcScope: this.getEnv('APP_OIDC_SCOPE', 'profile ucd-ids'),
        serverCacheExpiration: this.getEnv('APP_SERVER_CACHE_EXPIRATION', '12 hours')
      };
  
      this.libraryIamApi = {
        url: this.getEnv('UCD_IAM_API_USER_URL', 'https://iet-ws.ucdavis.edu/api'),
        user: this.getEnv('UCD_IAM_API_USER', ''),
        key: this.getEnv('UCD_IAM_API_KEY', ''),
        serverCacheExpiration: this.getEnv('UCD_IAM_API_CACHE_EXPIRATION', '24 hours'),
      }

      this.lansweeper = {
        url: this.getEnv('UCDLIB_LANSWEEPER_URL', 'https://api.lansweeper.com/api/v2/graphql'),
        user: this.getEnv('UCDLIB_LANSWEEPER_API_USER', ''),
        key: this.getEnv('UCDLIB_LANSWEEPER_API_KEY', ''),
        siteID: this.getEnv('UCDLIB_LANSWEEPER_SITE_ID', ''),
        pagination: this.getEnv('UCDLIB_LANSWEEPER_PAGINATION', 'null'),
      }
  
      this.peaks = {
        url: this.getEnv('UCDLIB_PEAKS_URL', 'https://peaks-test.ucdavis.edu/api'),
        team: this.getEnv('UCDLIB_PEAKS_API_TEAM_SLUG', 'dale-snapp'),
        name: this.getEnv('UCDLIB_PEAKS_API_TEAM_NAME', 'Dale Snapp'),
        key: this.getEnv('UCDLIB_PEAKS_API_KEY', ''),
      }

      this.cron = {
        enabled: this.getEnv('APP_INVENTORY_PERSONNEL_CHECK_NOTIFICATIONS', false),
        enableCron: this.getEnv('UCDLIB_PERSONNEL_API_ENABLE_CRON', true),
        cronSchedule: this.getEnv('UCDLIB_PERSONNEL_API_CRON_SCHEDULE', '0 7 * * *')
      }
  
    }
  
  
    /**
     * @description Get an environment variable.  If the variable is not set, return the default value.
     * @param {String} name - The name of the environment variable.
     * @param {*} defaultValue - The default value to return if the environment variable is not set.
     * @returns
     */
    getEnv(name, defaultValue=false){
      let v;
      const env = process?.env?.[name]
      if ( env ) {
        if ( env.toLowerCase() == 'true' ) return true;
        if ( env.toLowerCase() == 'false' ) return false;
        return env;
      }
      return defaultValue;
    }
  }
  
  export default new ServerConfig();
  
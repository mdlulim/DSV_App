var Config = {};
Config.STAGE = process.ENV ? process.ENV : 'dev';
// Config.BASE_URL = '//localhost:3001/';
Config.API = {
    EPIC_BASE_URL       : 'http://dev.api.rewards.co.za/Epic.Api/DSVBookit/',
    EPIC_API_USERNAME   : 'BookitPortal',
    EPIC_API_PASSWORD   : 'D3CAFAA5-92AD-4CB6-85B0-CA677CF66738'
};

export default Config;

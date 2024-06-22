const axios = require('axios');
const URL = require('./config.js');

async function businessDiscoveryApi() {
    try {
        const response = await axios.get(URL);
        if (response.data) {
            const data = response.data;
            console.log(data);
            console.log(data.business_discovery.media.data);
            return data;
        } else {
            console.error("Graph APIリクエストでエラーが発生しました。");
            return null;
        }
    } catch (error) {
        console.error("Graph APIのレスポンス解析中にエラーが発生しました。", error);
        return null;
    }
}
businessDiscoveryApi();
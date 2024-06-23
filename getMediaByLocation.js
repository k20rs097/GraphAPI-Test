const axios = require("axios");
const { ACCESS_TOKEN, LOCATION_NAME, DATE } = require("./config.js");

async function getLocationId(locationName) {
  try {
    const response = await axios.get(`https://graph.facebook.com/v20.0/serach`, {
        params: {
            type: "place",
            q: locationName,
            fields: "id,name,location",
            access_token: ACCESS_TOKEN
        }
    });
    if (response.data.data.length > 0) {
        const location = response.data.data[0];
        console.log(`Location ID: ${location.id}`);
        console.log(`Location Name: ${location.name}`);
        console.log(`Location Details: ${JSON.stringify(location.location)}`);
    } else {
        console.log('場所が見つかりませんでした。');
    }
  } catch (error) {
    console.error("場所IDの取得に失敗しました。", error);
    return null;
  }
}

async function getMediaByLocation(locationId, date) {
  const URL = `https://graph.facebook.com/v20.0/${locationId}/media?fields=caption,media_url,permalink,timestamp,username&since=${new Date(
    date
  ).toISOString()}&access_token=${ACCESS_TOKEN}`;
  try {
    const response = await axios.get(URL);
    if (response.data) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("場所の投稿取得に失敗しました。");
      return null;
    }
  } catch (error) {
    console.error("場所の投稿取得中にエラーが発生しました。", error);
    return null;
  }
}

// (async () => {
//   const locationId = await getLocationId(LOCATION_NAME);
//   if (locationId) {
//     await getMediaByLocation(locationId, DATE);
//   }
// })();

getLocationId(LOCATION_NAME);

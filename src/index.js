import eun1API from "./riotAPI.js";
import { KEY } from "./API_KEY.js";

const getSummonerByName = async name => {
  return await eun1API.get(
    `/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`
  );
};

const getSummonersRank = async id => {
  return await eun1API.get(
    `/league/v4/entries/by-summoner/${id}?api_key=${KEY}`
  );
};

const getSummonerData = async name => {
  const { data } = await getSummonerByName("yakaii");
  const res = await getSummonersRank(data.id);
  console.log(res.data);
};

getSummonerData();

import eun1API from "./riotAPI.js";
import { KEY } from "./API_KEY.js";
import { SUMMONER_ICONS_LINK } from "./config.js";

const summonerIcon = document.querySelector(".summoner-icon");
const summonerName = document.querySelector(".summoner-name");
const summonerLvl = document.querySelector(".summoner-level");
const summonerRank = document.querySelector(".summoner-rank");
const summonerWins = document.querySelector(".summoner-rank-wins");
const summonerLosses = document.querySelector(".summoner-rank-losses");
const summonerWinrate = document.querySelector(".summoner-rank-winrate");

const state = {
  summonerId: null,
};

const getSummonerByName = async name => {
  const { data } = await eun1API.get(
    `/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`
  );
  summonerIcon.style.backgroundImage = `url(${SUMMONER_ICONS_LINK}/${data.profileIconId}.png)`;
  summonerName.innerHTML = data.name;
  summonerLvl.innerHTML = data.summonerLevel;
  getSummonersRank(data.id);
};
getSummonerByName("yakaii");

const getSummonersRank = async id => {
  const { data } = await eun1API.get(
    `/league/v4/entries/by-summoner/${id}?api_key=${KEY}`
  );
  const { losses, rank, tier, wins } = data[1];
  summonerRank.innerHTML = `${tier} ${rank}`;
  summonerWins.innerHTML = wins;
  summonerLosses.innerHTML = losses;
  summonerWinrate.innerHTML = Math.round((wins / (wins + losses)) * 100);
};

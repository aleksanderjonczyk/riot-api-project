import eun1API from "./riotAPI.js";
import { KEY } from "./API_KEY.js"; // Key expires every 24 hours so ask me for one or create your own on https://developer.riotgames.com
import { SUMMONER_ICONS_LINK } from "./config.js";
import { rankingEmblem } from "./rankingEmblem.js";
const summonerHeader = document.querySelector(".summoner__header");
const summonerIcon = document.querySelector(".summoner-data__icon");
const summonerName = document.querySelector(".summoner-data__name");
const summonerLvl = document.querySelector(".summoner-data__level");
const summonerRank = document.querySelector(".summoner-data-ranking__tier");
const summonerLP = document.querySelector(".summoner-data-ranking__lp");
const summonerRankType = document.querySelector(".summoner-data-ranking__type");
const summonerEmblem = document.querySelector(".summoner-data-ranking__emblem");
const summonerWins = document.querySelector(".summoner-rank-wins");
const summonerLosses = document.querySelector(".summoner-rank-losses");
const summonerWinrate = document.querySelector(".summoner-rank-winrate");
const searchButton = document.querySelector(".search__button");
const search = document.querySelector(".search__input");

const getSummonerByName = async name => {
  const res = await eun1API.get(
    `/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`
  );
  // .catch(() => (summonerHeader.innerHTML = "Summoner does not exist."));
  if (!res) return;
  const { data } = res;
  summonerHeader.innerHTML = "";
  getSummonersRank(data.id);
  summonerIcon.style.backgroundImage = `url(${SUMMONER_ICONS_LINK}/${data.profileIconId}.png)`;
  summonerName.innerHTML = data.name;
  summonerLvl.innerHTML = "Level " + data.summonerLevel;
};

const getSummonersRank = async id => {
  const { data } = await eun1API.get(
    `/league/v4/entries/by-summoner/${id}?api_key=${KEY}`
  );
  if (!data[0]) return;
  const { queueType, losses, rank, tier, wins, leaguePoints } = data[0];
  summonerRankType.innerHTML = queueType;
  summonerEmblem.style.backgroundImage = `url(${rankingEmblem(tier)})`;
  summonerRank.innerHTML = `${tier} ${rank}`;
  summonerLP.innerHTML = "LP: " + leaguePoints;
  summonerWins.innerHTML = "Wins: " + wins;
  summonerLosses.innerHTML = "Loses: " + losses;
  summonerWinrate.innerHTML = `Winrate: ${Math.round(
    (wins / (wins + losses)) * 100
  )}%`;
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  if (!search.value) return;
  getSummonerByName(search.value);
  search.value = "";
});

//Show all other ranks

import eun1API from "./riotAPI.js";
import { KEY } from "./API_KEY.js"; // Key expires every 24 hours so ask me for one or create your own on https://developer.riotgames.com
import { SUMMONER_ICONS_LINK } from "./config.js";
import { rankingEmblem } from "./rankingEmblem.js";
const summonerHeader = document.querySelector(".summoner__header");
const summonerData = document.querySelector(".summoner-data");
const summonerRanking = document.querySelector(".summoner-data-ranking");
const searchButton = document.querySelector(".search__button");
const search = document.querySelector(".search__input");

const getSummonerByName = async name => {
  const { data } = await eun1API
    .get(`/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`)
    .catch(() => (summonerHeader.innerHTML = "Summoner does not exist."));
  if (!data) return;
  summonerHeader.innerHTML = "";
  summonerData.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="summoner-data__icon" style="background-image: url(${SUMMONER_ICONS_LINK}/${data.profileIconId}.png)"></div>
    <h3 class="summoner-data__name">${data.name}</h3>
    <h4 class="summoner-data__level">Level: ${data.summonerLevel}</h4>
  `
  );
  getSummonersRank(data.id);
};

const getSummonersRank = async id => {
  const { data } = await eun1API.get(
    `/league/v4/entries/by-summoner/${id}?api_key=${KEY}`
  );
  if (!data) return;

  data.forEach(queue => {
    summonerRanking.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="summoner-data-rank">
      <h6 class="summoner-data-ranking__type">${
        queue.queueType === "RANKED_SOLO_5x5"
          ? "Soloqueue"
          : "Draft Ranked Flex"
      }</h6>
    <div class="summoner-data-ranking__emblem" style="background-image: url(${rankingEmblem(
      queue.tier
    )})"></div>
      
      <div class="summoner-data-ranking__tier">${queue.tier} ${queue.rank}</div>
      <div class="summoner-data-ranking__lp">LP: ${queue.leaguePoints}</div>
      <div class="summoner-rank">
        <span class="summoner-rank-wins">Wins: ${queue.wins}</span>
        <span class="summoner-rank-losses">Losses: ${queue.losses}</span>
        <span class="summoner-rank-winrate">Winrate: ${Math.round(
          (queue.wins / (queue.wins + queue.losses)) * 100
        )}%</span>
      </div>
    </div>
    </div>
    `
    );
  });
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  summonerData.innerHTML = "";
  summonerRanking.innerHTML = "";
  if (!search.value) return;
  getSummonerByName(search.value);
  search.value = "";
});

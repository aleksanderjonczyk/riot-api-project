import eun1API from "./riotAPI.js";
import { KEY } from "./API_KEY.js"; // Key expires every 24 hours so ask me for one or create your own on https://developer.riotgames.com
import { SUMMONER_ICONS_LINK } from "./config.js";
import { rankingEmblem } from "./rankingEmblem.js";
const summonerHeader = document.querySelector(".summoner__header");
const summonerIcon = document.querySelector(".summoner-data__icon");
const summonerName = document.querySelector(".summoner-data__name");
const summonerLvl = document.querySelector(".summoner-data__level");
const summonerRanking = document.querySelector(".summoner-data-ranking");
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
  summonerRanking.innerHTML = "";
  if (!search.value) return;
  getSummonerByName(search.value);
  search.value = "";
});

// TODO:
// Fix error when you search for summoner that doesnt exist or has rank

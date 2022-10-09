import iron from "../ranked-emblems/Emblem_Iron.png";
import bronze from "../ranked-emblems/Emblem_Bronze.png";
import silver from "../ranked-emblems/Emblem_Silver.png";
import gold from "../ranked-emblems/Emblem_Gold.png";
import platinum from "../ranked-emblems/Emblem_Platinum.png";
import diamond from "../ranked-emblems/Emblem_Diamond.png";
import master from "../ranked-emblems/Emblem_Master.png";
import grandmaster from "../ranked-emblems/Emblem_Grandmaster.png";
import challanger from "../ranked-emblems/Emblem_Challenger.png";

export const rankingEmblem = ranking => {
  if (ranking === "IRON") return iron;
  if (ranking === "BRONZE") return bronze;
  if (ranking === "SILVER") return silver;
  if (ranking === "GOLD") return gold;
  if (ranking === "PLATINUM") return platinum;
  if (ranking === "DIAMOND") return diamond;
  if (ranking === "MASTER") return master;
  if (ranking === "GRANDMASTER") return grandmaster;
  if (ranking === "CHALLENGER") return challanger;
};

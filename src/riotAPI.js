import axios from "axios";
import { EUNE_API_LINK } from "./config";

const eun1API = axios.create({
  baseURL: EUNE_API_LINK,
});

export default eun1API;

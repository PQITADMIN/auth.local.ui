import axios from "axios";
import { VALUE_STORY } from "../../config";

const instance = axios.create({
  baseURL: VALUE_STORY,
});

export default instance;

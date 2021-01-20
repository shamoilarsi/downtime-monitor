import axios from "axios";
const baseURL = "http://localhost:8000";
// const baseURL = "https://downtime-monitoring-system.herokuapp.com/";
const instance = axios.create({ baseURL });

export default instance;

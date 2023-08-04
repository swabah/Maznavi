import axios from "axios"
import {baseUrl} from './constents/Constence'

const instance = axios.create({
    baseURL: baseUrl
  });

export default instance
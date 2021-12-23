import axios from 'axios';
import { fightersIndex } from './../urls/index.js';

export const fetchfighters = () => {
  return axios
    .get(fightersIndex)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

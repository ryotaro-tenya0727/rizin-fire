import axios from 'axios';
import { fightersIndex, fightersPosts } from './../urls/index.js';

export const fetchfighters = () => {
  return axios
    .get(fightersIndex)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.error(err));
};

export const postfighters = (params) => {
  return axios
    .post(fightersPosts, {
      fighter_number: params.fighter_number,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient(
  // {
  // defaultOptions: {
  //   queries: {
  //     // staleTime: 1000 * 60 * 5,
  //   },
  // },
  // }
);


const productionUrl = 'https://dummyapi.io/data/v1/user';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

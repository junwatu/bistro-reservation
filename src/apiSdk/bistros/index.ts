import axios from 'axios';
import queryString from 'query-string';
import { BistroInterface, BistroGetQueryInterface } from 'interfaces/bistro';
import { GetQueryInterface } from '../../interfaces';

export const getBistros = async (query?: BistroGetQueryInterface) => {
  const response = await axios.get(`/api/bistros${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBistro = async (bistro: BistroInterface) => {
  const response = await axios.post('/api/bistros', bistro);
  return response.data;
};

export const updateBistroById = async (id: string, bistro: BistroInterface) => {
  const response = await axios.put(`/api/bistros/${id}`, bistro);
  return response.data;
};

export const getBistroById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bistros/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBistroById = async (id: string) => {
  const response = await axios.delete(`/api/bistros/${id}`);
  return response.data;
};

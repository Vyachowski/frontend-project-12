import {getToken} from "../store/authSlice";

const baseUrl = '/api/v1';
const authConfig = { headers: { 'Authorization': `Bearer ${getToken()}` }};

const getMessageUrl = () => `${baseUrl}/messages`;
const getUserUrl = (option) => option === 'signup' ? `${baseUrl}/signup` : `${baseUrl}/login`;
const getChannelsUrl = (id) => id ? `${baseUrl}/channels/${id}` : `${baseUrl}/channels`;

export {
  authConfig,
  getMessageUrl,
  getUserUrl,
  getChannelsUrl,
};

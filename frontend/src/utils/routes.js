const baseUrl = '/api/v1';

const getMessageUrl = () => `${baseUrl}/messages`;
const getUserUrl = (option) => (option === 'signup' ? `${baseUrl}/signup` : `${baseUrl}/login`);
const getChannelsUrl = (id) => (id ? `${baseUrl}/channels/${id}` : `${baseUrl}/channels`);

const getAuthConfig = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export {
  getMessageUrl,
  getUserUrl,
  getChannelsUrl,
  getAuthConfig,
};

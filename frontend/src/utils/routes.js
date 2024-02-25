const baseUrl = '/api/v1'
const getMessageUrl = () => `${baseUrl}/messages`;
const getUserUrl = (option) => option === 'signup' ? `${baseUrl}/signup` : `${baseUrl}/login`;
const getChannelUrl = (id) => id ? `${baseUrl}/channels/${id}` : `${baseUrl}/channels`;

export {
  getMessageUrl,
  getUserUrl,
  getChannelUrl,
};

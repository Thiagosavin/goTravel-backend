export default {
  JWT: {
    TOKEN: process.env.TOKEN_SECRET || 'default',
    EXPIRE: '1d',
  },
};

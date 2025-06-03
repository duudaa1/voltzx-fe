export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  },
  storage: {
    accessTokenKey: 'access_token',
  },
};

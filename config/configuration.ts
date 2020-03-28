export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    protocol: process.env.DB_PROTOCOL || 'http',
    name: process.env.DB_NAME || 'test',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    user: process.env.DB_USER || 'test',
    password: process.env.DB_PASSWORD || 'test',
    options: process.env.DB_OPTIONS || '',
  },
  externalApis: {
    gobArGeoRef: process.env.API_GOB_AR_GEOREF_URL,
  },
});

export const trustedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://giv.ee',
        'https://www.giv.ee',
        'https://admin.giv.ee',
        'https://marketing.giv.ee',
        'https://api.giv.ee',
        'https://notifications.giv.ee',
      ]
    : [
        'http://localhost:3000', // frontend
        'http://localhost:3001', // API
        'http://localhost:3002', // marketing
        'http://localhost:3005', // notifications
        'http://localhost:3004',
      ];
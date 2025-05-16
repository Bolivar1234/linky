export const prices = {
  development: {
    freeLegacy: 'price_1RP9FjPwpCesJD7ZBwKCChxh',
    premium: 'price_1RP9FjPwpCesJD7ZBwKCChxh',
    team: 'price_1RP9FjPwpCesJD7ZBwKCChxh',
  },
  production: {
    freeLegacy: 'price_1RNRNgLUEZstCukvNlwI8g6P',
    premium: 'price_1RNRNgLUEZstCukvNlwI8g6P',
    team: 'price_1RNRNgLUEZstCukvNlwI8g6P',
  },
};

export const isTeamPlan = (priceId: string) => {
  return (
    priceId === prices.development.team || priceId === prices.production.team
  );
};

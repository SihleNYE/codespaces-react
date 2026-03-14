const currencyByCountry = {
  USA: 'USD',
  Canada: 'CAD',
  UK: 'GBP',
  'South Africa': 'ZAR',
  Nigeria: 'NGN',
  Kenya: 'KES',
  Ghana: 'GHS',
  Egypt: 'EGP',
  Morocco: 'MAD',
  Tunisia: 'TND',
  Algeria: 'DZD',
  Uganda: 'UGX',
  Tanzania: 'TZS',
  Rwanda: 'RWF',
  Zambia: 'ZMW',
  Zimbabwe: 'ZWL',
  Namibia: 'NAD',
  Mozambique: 'MZN',
  Angola: 'AOA',
  Botswana: 'BWP',
  Lesotho: 'LSL',
  Eswatini: 'SZL',
};

const exchangeRateToUsd = {
  USD: 1,
  CAD: 1.36,
  GBP: 1.27,
  ZAR: 18.2,
  NGN: 1430,
  KES: 144,
  GHS: 11.0,
  EGP: 30.9,
  MAD: 10.0,
  TND: 3.1,
  DZD: 140,
  UGX: 3780,
  TZS: 2360,
  RWF: 1345,
  ZMW: 18.4,
  ZWL: 143,
  NAD: 18.2,
  MZN: 63.0,
  AOA: 832.0,
  BWP: 11.5,
  LSL: 18.2,
  SZL: 18.2,
};

export const formatPriceForCountry = (priceUsd, country) => {
  const currency = currencyByCountry[country] || 'USD';
  const rate = exchangeRateToUsd[currency] || 1;
  const converted = priceUsd * rate;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(converted);
};

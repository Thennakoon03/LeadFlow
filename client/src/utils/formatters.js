const currencyLocales = {
  USD: "en-US",
  EUR: "en-IE",
  GBP: "en-GB",
  LKR: "en-LK",
  INR: "en-IN",
};

// Demo exchange table using USD as the stored base currency.
const currencyRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  LKR: 299,
  INR: 83.5,
};

const convertCurrency = (
  value,
  targetCurrencyCode = "USD",
  baseCurrencyCode = "USD"
) => {
  const numericValue = Number(value) || 0;
  const baseRate = currencyRates[baseCurrencyCode] || 1;
  const targetRate = currencyRates[targetCurrencyCode] || 1;

  return (numericValue / baseRate) * targetRate;
};

const formatCurrency = (value, currencyCode = "USD", baseCurrencyCode = "USD") =>
  new Intl.NumberFormat(currencyLocales[currencyCode] || "en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(convertCurrency(value, currencyCode, baseCurrencyCode));

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export { convertCurrency, formatCurrency, formatDate };

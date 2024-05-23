const BINANCE_BASE_URL = "https://api.binance.com/api/v3";

export const getBinanceSymbols = async () => {
  const response = await fetch(`${BINANCE_BASE_URL}/exchangeInfo`);
  const data = await response.json();
  return data.symbols;
};

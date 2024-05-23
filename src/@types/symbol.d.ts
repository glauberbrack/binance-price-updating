declare type TSymbols = {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  otoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: Filter[];
  permissions: string[];
  permissionSets: string[][];
  defaultSelfTradePreventionMode: string;
  allowedSelfTradePreventionModes: string[];
  lastPrice?: string;
  bidPrice?: string;
  askPrice?: string;
  priceChange?: string;
};

type Filter = {
  filterType: string;
  [key: string]: any;
};

declare type TSymbolInfo = {
  A: string;
  B: string;
  C: number;
  E: number;
  F: number;
  L: number;
  O: number;
  P: string;
  Q: string;
  a: string;
  b: string;
  c: string;
  e: string;
  h: string;
  l: string;
  n: number;
  o: string;
  p: string;
  q: string;
  s: string;
  v: string;
  w: string;
  x: string;
};

declare type TSymbolsWebSocket = {
  stream: string;
  data: TSymbolInfo;
};

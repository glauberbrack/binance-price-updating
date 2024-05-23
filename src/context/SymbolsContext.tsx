import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import useWebSocket from "react-use-websocket";

import { getBinanceSymbols } from "../api";

interface SymbolsContextType {
  symbols: TSymbols[];
  selectedSymbols: TSymbols[];
  listSymbols: TSymbols[];
  setSelectedSymbols: (symbols: TSymbols[]) => void;
  addSymbol: (symbol: TSymbols) => void;
  deleteSymbol: (symbol: TSymbols) => void;
  addToList: () => void;
  removeFromList: (symbol: TSymbols) => void;
  pendingChanges: boolean;
  tradeInfo: { [key: string]: TSymbolInfo };
}

const SymbolsContext = createContext<SymbolsContextType | undefined>(undefined);

export const SymbolsProvider = ({ children }: { children: ReactNode }) => {
  const [symbols, setSymbols] = useState<TSymbols[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<TSymbols[]>([]);
  const [listSymbols, setListSymbols] = useState<TSymbols[]>([]);
  const [tradeInfo, setTradeInfo] = useState<{
    [key: string]: TSymbolInfo;
  }>({});

  const addSymbol = (symbol: TSymbols) => {
    setSelectedSymbols((prevSelectedSymbols) =>
      prevSelectedSymbols.find((s) => s.symbol === symbol.symbol)
        ? prevSelectedSymbols
        : [...prevSelectedSymbols, symbol]
    );
  };

  const deleteSymbol = (symbol: TSymbols) => {
    setSelectedSymbols((prevSelectedSymbols) =>
      prevSelectedSymbols.filter((s) => s.symbol !== symbol.symbol)
    );
  };

  const addToList = () => {
    setListSymbols((prevListSymbols) => {
      const newList = prevListSymbols.filter((symbol) =>
        selectedSymbols.some((selected) => selected.symbol === symbol.symbol)
      );

      selectedSymbols.forEach((symbol) => {
        if (
          !newList.some((listSymbol) => listSymbol.symbol === symbol.symbol)
        ) {
          newList.push(symbol);
        }
      });

      return newList;
    });
  };

  const removeFromList = (symbol: TSymbols) => {
    setSelectedSymbols((prevSelectedSymbols) =>
      prevSelectedSymbols.filter((s) => s.symbol !== symbol.symbol)
    );
    setListSymbols((prevListSymbols) =>
      prevListSymbols.filter((s) => s.symbol !== symbol.symbol)
    );
  };

  // Check if there are changes to apply
  const pendingChanges =
    selectedSymbols.some(
      (selected) => !listSymbols.some((list) => list.symbol === selected.symbol)
    ) ||
    listSymbols.some(
      (list) =>
        !selectedSymbols.some((selected) => selected.symbol === list.symbol)
    );

  const getSymbols = async () => {
    const symbols = await getBinanceSymbols();
    setSymbols(symbols.symbols);
  };

  useEffect(() => {
    getSymbols();
  }, []);

  const symbolList = listSymbols
    .map((symbol) => `${symbol.symbol.toLowerCase()}@ticker`)
    .join("/");
  const wsUrl = `wss://stream.binance.com:9443/stream?streams=${symbolList}`;

  const { lastJsonMessage, sendJsonMessage } = useWebSocket<TSymbolsWebSocket>(
    wsUrl,
    {
      onOpen: () => console.log(`Connected to WebSocket`),
      onError: (event) => {
        console.error(event);
      },
      onMessage: () => {
        if (lastJsonMessage) {
          setTradeInfo((prev) => ({
            ...prev,
            [lastJsonMessage.data.s]: lastJsonMessage.data,
          }));
        }
      },
      shouldReconnect: () => true,
      reconnectInterval: 10,
    }
  );

  useEffect(() => {
    setTradeInfo({});
    return () => {
      setTradeInfo({});
    };
  }, [listSymbols]);

  useEffect(() => {
    const pingPongInterval = setInterval(() => {
      if (lastJsonMessage) {
        sendJsonMessage({ ping: "pong" });
      }
    }, 180000);

    return () => {
      clearInterval(pingPongInterval);
    };
  }, [lastJsonMessage, sendJsonMessage]);

  return (
    <SymbolsContext.Provider
      value={{
        symbols,
        selectedSymbols,
        listSymbols,
        setSelectedSymbols,
        addSymbol,
        deleteSymbol,
        addToList,
        removeFromList,
        pendingChanges,
        tradeInfo,
      }}
    >
      {children}
    </SymbolsContext.Provider>
  );
};

export const useSymbols = () => {
  const context = useContext(SymbolsContext);
  if (!context) {
    throw new Error("useSymbols must be used within a SymbolsProvider");
  }
  return context;
};

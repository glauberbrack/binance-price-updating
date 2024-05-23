import React, {
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
  lists: { [key: string]: TSymbols[] };
  currentList: string;
  searchTerm: string;
  setSelectedSymbols: (symbols: TSymbols[]) => void;
  setSearchTerm: (term: string) => void;
  addSymbol: (symbol: TSymbols) => void;
  deleteSymbol: (symbol: TSymbols) => void;
  addToList: () => void;
  removeFromList: (symbol: TSymbols) => void;
  createList: (listName: string) => void;
  selectList: (listName: string) => void;
  pendingChanges: boolean;
  tradeInfo: { [key: string]: TSymbolInfo };
}

const SymbolsContext = createContext<SymbolsContextType | undefined>(undefined);

export const SymbolsProvider = ({ children }: { children: ReactNode }) => {
  const [symbols, setSymbols] = useState<TSymbols[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<TSymbols[]>([]);
  const [lists, setLists] = useState<{ [key: string]: TSymbols[] }>({
    "Default List": [],
  });
  const [currentList, setCurrentList] = useState("Default List");
  const [searchTerm, setSearchTerm] = useState("");
  const [tradeInfo, setTradeInfo] = useState<{ [key: string]: TSymbolInfo }>(
    {}
  );

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
    setLists((prevLists) => {
      const newList = [
        ...prevLists[currentList],
        ...selectedSymbols.filter(
          (symbol) =>
            !prevLists[currentList].some((s) => s.symbol === symbol.symbol)
        ),
      ];
      return { ...prevLists, [currentList]: newList };
    });
  };

  const removeFromList = (symbol: TSymbols) => {
    setLists((prevLists) => {
      const newList = prevLists[currentList].filter(
        (s) => s.symbol !== symbol.symbol
      );
      return { ...prevLists, [currentList]: newList };
    });
  };

  const createList = (listName: string) => {
    setLists((prevLists) => ({
      ...prevLists,
      [listName]: [],
    }));
    setCurrentList(listName);
  };

  const selectList = (listName: string) => {
    setCurrentList(listName);
  };

  // Check if there are changes to apply
  const pendingChanges =
    selectedSymbols.some(
      (selected) =>
        !lists[currentList]?.some((list) => list.symbol === selected.symbol)
    ) ||
    lists[currentList]?.some(
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

  const symbolList = lists[currentList]
    ?.map((symbol) => `${symbol.symbol.toLowerCase()}@ticker`)
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
  }, [lists, currentList]);

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
        lists,
        currentList,
        searchTerm,
        setSelectedSymbols,
        setSearchTerm,
        addSymbol,
        deleteSymbol,
        addToList,
        removeFromList,
        createList,
        selectList,
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

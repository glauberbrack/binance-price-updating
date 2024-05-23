import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { SYMBOLS_MOCK } from "./mocked";
import { getBinanceSymbols } from "../api";

interface SymbolsContextType {
  symbols: TSymbols[];
  selectedSymbols: TSymbols[];
  listSymbols: TSymbols[];
  searchTerm: string;
  setSelectedSymbols: (symbols: TSymbols[]) => void;
  setSearchTerm: (term: string) => void;
  addSymbol: (symbol: TSymbols) => void;
  deleteSymbol: (symbol: TSymbols) => void;
  addToList: () => void;
  removeFromList: (symbol: TSymbols) => void;
  pendingChanges: boolean;
}

const SymbolsContext = createContext<SymbolsContextType | undefined>(undefined);

export const SymbolsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [symbols, setSymbols] = useState<TSymbols[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<TSymbols[]>([]);
  const [listSymbols, setListSymbols] = useState<TSymbols[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <SymbolsContext.Provider
      value={{
        symbols,
        selectedSymbols,
        listSymbols,
        searchTerm,
        setSelectedSymbols,
        setSearchTerm,
        addSymbol,
        deleteSymbol,
        addToList,
        removeFromList,
        pendingChanges,
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

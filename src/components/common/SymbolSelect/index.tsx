import React, { memo } from "react";

import { useSymbols } from "../../../context/SymbolsContext";
import { ListItem } from "./styles";

export const SymbolSelect = memo(
  ({ index, style }: { index: number; style: React.CSSProperties }) => {
    // @context
    const { symbols, selectedSymbols, addSymbol, deleteSymbol } = useSymbols();

    // @constants
    const symbol = symbols[index];

    // @handlers
    const handleToggleSymbol = (symbol: (typeof symbols)[0]) => {
      selectedSymbols.some((s) => s.symbol === symbol.symbol)
        ? deleteSymbol(symbol)
        : addSymbol(symbol);
    };

    return (
      <ListItem style={style}>
        <input
          type="checkbox"
          onChange={() => handleToggleSymbol(symbol)}
          checked={selectedSymbols.some((s) => s.symbol === symbol.symbol)}
        />
        {symbol.symbol}
      </ListItem>
    );
  }
);

import React, { memo } from "react";

import { useSymbols } from "../../../context/SymbolsContext";
import { ListItem } from "./styles";

type Props = {
  index: number;
  style: React.CSSProperties;
  symbols: TSymbols[];
};

export const SymbolSelect = memo(({ index, style, symbols }: Props) => {
  // @context
  const { selectedSymbols, addSymbol, deleteSymbol } = useSymbols();

  // @constants
  const symbol = symbols[index];

  // @hanlders
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
});

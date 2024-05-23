import React from "react";
import { useSymbols } from "../../../context/SymbolsContext";
import {
  TableWrapper,
  TableHeader,
  TableRow,
  TableCell,
  RemoveButton,
} from "./styles";

import { formatDecimalNumber, formatPercentage } from "../../../helpers";

export const Table = () => {
  // @contexts
  const { lists, currentList, removeFromList, tradeInfo } = useSymbols();

  const listSymbols = lists[currentList] || [];

  return (
    <TableWrapper>
      <TableHeader>
        <TableCell>Symbol</TableCell>
        <TableCell>Last Price</TableCell>
        <TableCell>Bid Price</TableCell>
        <TableCell>Ask Price</TableCell>
        <TableCell>Price Change (%)</TableCell>
        <TableCell>Actions</TableCell>
      </TableHeader>
      {listSymbols.map((symbol) => {
        const item = tradeInfo[symbol.symbol.toUpperCase()];
        return (
          <TableRow key={`list-symbol-${symbol.symbol}`}>
            <TableCell>{symbol.symbol}</TableCell>
            <TableCell>{item ? formatDecimalNumber(item.c) : "-"}</TableCell>
            <TableCell>{item ? formatDecimalNumber(item.b) : "-"}</TableCell>
            <TableCell>{item ? formatDecimalNumber(item.a) : "-"}</TableCell>
            <TableCell>{item ? formatPercentage(item.P) : "-"}</TableCell>
            <TableCell>
              <RemoveButton onClick={() => removeFromList(symbol)}>
                X
              </RemoveButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableWrapper>
  );
};

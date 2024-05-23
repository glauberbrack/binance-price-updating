import React from "react";
import { useSymbols } from "../../../context/SymbolsContext";
import {
  TableWrapper,
  TableHeader,
  TableRow,
  TableCell,
  RemoveButton,
} from "./styles";

export const Table: React.FC = () => {
  const { listSymbols, removeFromList } = useSymbols();

  return (
    <TableWrapper>
      <TableHeader>
        <TableCell>Symbol</TableCell>
        <TableCell>Last</TableCell>
        <TableCell>Bid</TableCell>
        <TableCell>Ask</TableCell>
        <TableCell>Change (%)</TableCell>
        <TableCell>Actions</TableCell>
      </TableHeader>
      {listSymbols.map((symbol) => (
        <TableRow key={`list-symbol-${symbol.symbol}`}>
          <TableCell>{symbol.symbol}</TableCell>
          <TableCell>{symbol.lastPrice}</TableCell>
          <TableCell>{symbol.bidPrice}</TableCell>
          <TableCell>{symbol.askPrice}</TableCell>
          <TableCell>{symbol.priceChange}%</TableCell>
          <TableCell>
            <RemoveButton onClick={() => removeFromList(symbol)}>
              X
            </RemoveButton>
          </TableCell>
        </TableRow>
      ))}
    </TableWrapper>
  );
};

export default Table;

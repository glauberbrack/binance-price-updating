import { useSymbols } from "../../../context/SymbolsContext";

import { Wrapper, SearchInput, List, ListItem, AddButton } from "./styles";

export const Sidebar = () => {
  const {
    symbols,
    selectedSymbols,
    addSymbol,
    deleteSymbol,
    searchTerm,
    setSearchTerm,
    addToList,
    pendingChanges,
  } = useSymbols();

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleSymbol = (symbol: (typeof symbols)[0]) => {
    selectedSymbols.some((s) => s.symbol === symbol.symbol)
      ? deleteSymbol(symbol)
      : addSymbol(symbol);
  };

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredSymbols.map((symbol) => (
          <ListItem key={`symbol-${symbol.symbol}`}>
            <input
              type="checkbox"
              onChange={() => handleToggleSymbol(symbol)}
              checked={selectedSymbols.some((s) => s.symbol === symbol.symbol)}
            />
            {symbol.symbol}
          </ListItem>
        ))}
      </List>
      <AddButton
        onClick={addToList}
        pendingChanges={pendingChanges}
        disabled={!pendingChanges}
      >
        Add to List
      </AddButton>
    </Wrapper>
  );
};

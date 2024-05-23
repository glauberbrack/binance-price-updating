import { useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";

import { SymbolSelect } from "../SymbolSelect";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSymbols } from "../../../context/SymbolsContext";

import { Wrapper, SearchInput, AddButton, ListWrapper } from "./styles";

export const Sidebar = () => {
  // @states
  const [searchTerm, setSearchTerm] = useState("");

  // @contexts
  const { symbols, addToList, pendingChanges } = useSymbols();

  // @hooks
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // @memoizations
  const filteredSymbols = useMemo(() => {
    return symbols.filter((symbol) =>
      symbol.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [symbols, debouncedSearchTerm]);

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ListWrapper>
        <List
          height={400}
          itemCount={filteredSymbols.length}
          itemSize={35}
          width="100%"
        >
          {SymbolSelect}
        </List>
      </ListWrapper>
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

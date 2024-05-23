import { Suspense, useMemo, useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";

import { SymbolSelect } from "../SymbolSelect";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSymbols } from "../../../context/SymbolsContext";

import { Wrapper, SearchInput, AddButton, ListWrapper } from "./styles";

export const Sidebar = () => {
  // @states
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Manage loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearchTerm]);

  return (
    <Wrapper>
      <Suspense fallback={<h2>🌀 Loading...</h2>}>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ListWrapper>
          {isLoading ? (
            <p>🔍 Searching...</p>
          ) : (
            <List
              height={400}
              itemCount={filteredSymbols.length}
              itemSize={35}
              width="100%"
            >
              {({ index, style }) => (
                <SymbolSelect
                  index={index}
                  style={style}
                  symbols={filteredSymbols}
                />
              )}
            </List>
          )}
        </ListWrapper>

        <AddButton
          onClick={addToList}
          pendingChanges={pendingChanges}
          disabled={!pendingChanges}
        >
          Add to List
        </AddButton>
      </Suspense>
    </Wrapper>
  );
};

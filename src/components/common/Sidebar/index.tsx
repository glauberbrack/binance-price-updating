import { FixedSizeList as List } from "react-window";
import { useSymbols } from "../../../context/SymbolsContext";
import { Wrapper, SearchInput, AddButton, ListWrapper } from "./styles";

import { SymbolSelect } from "../SymbolSelect";

export const Sidebar = () => {
  const { symbols, searchTerm, setSearchTerm, addToList, pendingChanges } =
    useSymbols();

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

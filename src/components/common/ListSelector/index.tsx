import { useState } from "react";
import { useSymbols } from "../../../context/SymbolsContext";
import { Wrapper, Selector, AddListButton, ListOption } from "./styles";

export const ListSelector = () => {
  const { lists, currentList, createList, selectList } = useSymbols();
  const [newListName, setNewListName] = useState("");

  const handleCreateList = () => {
    if (newListName && !lists[newListName]) {
      createList(newListName);
      setNewListName("");
    }
  };

  return (
    <Wrapper>
      <Selector
        value={currentList}
        onChange={(e) => selectList(e.target.value)}
      >
        {Object.keys(lists).map((listName) => (
          <ListOption key={listName} value={listName}>
            {listName}
          </ListOption>
        ))}
      </Selector>
      <input
        type="text"
        placeholder="Your list name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <AddListButton onClick={handleCreateList}>+</AddListButton>
    </Wrapper>
  );
};

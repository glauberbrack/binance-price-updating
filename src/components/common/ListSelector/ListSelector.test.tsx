/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { SymbolsProvider } from "../../../context/SymbolsContext";
import { ListSelector } from ".";

test("ListSelector works correctly", async () => {
  await React.act(async () => {
    render(
      <SymbolsProvider>
        <ListSelector />
      </SymbolsProvider>
    );
  });

  const listSelector = screen.getByRole("combobox");
  expect(listSelector).toHaveValue("Default List");

  const newListInput = screen.getByPlaceholderText("Your list name");
  await React.act(async () => {
    fireEvent.change(newListInput, { target: { value: "List B" } });
  });
  expect(newListInput).toHaveValue("List B");

  const addButton = screen.getByText("+");
  await React.act(async () => {
    fireEvent.click(addButton);
  });
  expect(newListInput).toHaveValue("");
  expect(screen.getByRole("combobox")).toHaveValue("List B");
});

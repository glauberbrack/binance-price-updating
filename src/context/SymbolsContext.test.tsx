/* eslint-disable testing-library/no-unnecessary-act */
import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SymbolsProvider, useSymbols } from "./SymbolsContext";

const TestComponent = () => {
  const {
    symbols,
    selectedSymbols,
    lists,
    currentList,
    addSymbol,
    deleteSymbol,
    addToList,
    removeFromList,
    createList,
    selectList,
  } = useSymbols();

  return (
    <div>
      <div data-testid="current-list">{currentList}</div>
      <div data-testid="symbol-count">{symbols.length}</div>
      <div data-testid="selected-symbol-count">{selectedSymbols.length}</div>
      <div data-testid="list-symbol-count">
        {lists[currentList]?.length || 0}
      </div>
      <button
        onClick={() =>
          addSymbol({
            symbol: "ETHBTC",
            status: "TRADING",
            baseAsset: "",
            baseAssetPrecision: 0,
            quoteAsset: "",
            quotePrecision: 0,
            quoteAssetPrecision: 0,
            baseCommissionPrecision: 0,
            quoteCommissionPrecision: 0,
            orderTypes: [],
            icebergAllowed: false,
            ocoAllowed: false,
            otoAllowed: false,
            quoteOrderQtyMarketAllowed: false,
            allowTrailingStop: false,
            cancelReplaceAllowed: false,
            isSpotTradingAllowed: false,
            isMarginTradingAllowed: false,
            filters: [],
            permissions: [],
            permissionSets: [],
            defaultSelfTradePreventionMode: "",
            allowedSelfTradePreventionModes: [],
          })
        }
      >
        Add Symbol
      </button>
      <button
        onClick={() =>
          deleteSymbol({
            symbol: "ETHBTC",
            status: "TRADING",
            baseAsset: "",
            baseAssetPrecision: 0,
            quoteAsset: "",
            quotePrecision: 0,
            quoteAssetPrecision: 0,
            baseCommissionPrecision: 0,
            quoteCommissionPrecision: 0,
            orderTypes: [],
            icebergAllowed: false,
            ocoAllowed: false,
            otoAllowed: false,
            quoteOrderQtyMarketAllowed: false,
            allowTrailingStop: false,
            cancelReplaceAllowed: false,
            isSpotTradingAllowed: false,
            isMarginTradingAllowed: false,
            filters: [],
            permissions: [],
            permissionSets: [],
            defaultSelfTradePreventionMode: "",
            allowedSelfTradePreventionModes: [],
          })
        }
      >
        Delete Symbol
      </button>
      <button onClick={addToList}>Add to List</button>
      <button
        onClick={() =>
          removeFromList({
            symbol: "ETHBTC",
            status: "TRADING",
            baseAsset: "",
            baseAssetPrecision: 0,
            quoteAsset: "",
            quotePrecision: 0,
            quoteAssetPrecision: 0,
            baseCommissionPrecision: 0,
            quoteCommissionPrecision: 0,
            orderTypes: [],
            icebergAllowed: false,
            ocoAllowed: false,
            otoAllowed: false,
            quoteOrderQtyMarketAllowed: false,
            allowTrailingStop: false,
            cancelReplaceAllowed: false,
            isSpotTradingAllowed: false,
            isMarginTradingAllowed: false,
            filters: [],
            permissions: [],
            permissionSets: [],
            defaultSelfTradePreventionMode: "",
            allowedSelfTradePreventionModes: [],
          })
        }
      >
        Remove from List
      </button>
      <button onClick={() => createList("List B")}>Create List</button>
      <button onClick={() => selectList("List B")}>Select List B</button>
    </div>
  );
};

test("SymbolsProvider works correctly", async () => {
  await act(async () => {
    render(
      <SymbolsProvider>
        <TestComponent />
      </SymbolsProvider>
    );
  });

  expect(screen.getByTestId("current-list").textContent).toBe("Default List");
  expect(screen.getByTestId("symbol-count").textContent).toBe("0");
  expect(screen.getByTestId("selected-symbol-count").textContent).toBe("0");
  expect(screen.getByTestId("list-symbol-count").textContent).toBe("0");

  await act(async () => {
    fireEvent.click(screen.getByText("Add Symbol"));
  });
  expect(screen.getByTestId("selected-symbol-count").textContent).toBe("1");

  await act(async () => {
    fireEvent.click(screen.getByText("Add to List"));
  });
  expect(screen.getByTestId("list-symbol-count").textContent).toBe("1");

  await act(async () => {
    fireEvent.click(screen.getByText("Delete Symbol"));
  });
  expect(screen.getByTestId("selected-symbol-count").textContent).toBe("0");

  await act(async () => {
    fireEvent.click(screen.getByText("Remove from List"));
  });
  expect(screen.getByTestId("list-symbol-count").textContent).toBe("0");

  await act(async () => {
    fireEvent.click(screen.getByText("Create List"));
    fireEvent.click(screen.getByText("Select List B"));
  });
  expect(screen.getByTestId("current-list").textContent).toBe("List B");
});

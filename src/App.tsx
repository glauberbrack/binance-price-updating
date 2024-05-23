import React from "react";
import { SymbolsProvider } from "./context/SymbolsContext";
import { Dashboard } from "./pages";

const App: React.FC = () => {
  return (
    <SymbolsProvider>
      <Dashboard />
    </SymbolsProvider>
  );
};

export default App;

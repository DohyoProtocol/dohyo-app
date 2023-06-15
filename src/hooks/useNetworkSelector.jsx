import { createContext, useContext, useState } from "react";

const NetworkSelectorContext = createContext({
  currentNetworkSelection: null,
  setCurrentNetworkSelection: undefined,
});

export const NetworkSelectorProvider = ({ children }) => {
  const [currentNetworkSelection, setCurrentNetworkSelection] = useState("Arbitrum");

  return (
    <NetworkSelectorContext.Provider
      value={{ currentNetworkSelection, setCurrentNetworkSelection }}
    >
      {children}
    </NetworkSelectorContext.Provider>
  );
};

export const useNetworkSelectorContext = () => useContext(NetworkSelectorContext);

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App.js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { UserProvider } from "./hooks/useUser";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter as Router } from "react-router-dom";

import { Web3Provider } from "@ethersproject/providers";
import { RPCProvider } from "./hooks/useRPC.jsx";
import { NetworkSelectorProvider } from "./hooks/useNetworkSelector.jsx";
import { TokensProvider } from "./hooks/useTokens.jsx";
import { GameDataProvider } from "./hooks/useGameData.jsx";
import { FilterProvider } from "./hooks/useFilter.jsx";
import { Web3HelperProvider } from "./hooks/useWeb3Helper.jsx";

const getLibrary = (provider) => {
  return new Web3Provider(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <NetworkSelectorProvider>
          <RPCProvider>
            <Web3ReactProvider getLibrary={getLibrary}>
              <FilterProvider>
                <UserProvider>
                  <Web3HelperProvider>
                    <TokensProvider>
                      <GameDataProvider>
                        <App />
                      </GameDataProvider>
                    </TokensProvider>
                  </Web3HelperProvider>
                </UserProvider>
              </FilterProvider>
            </Web3ReactProvider>
          </RPCProvider>
        </NetworkSelectorProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

import { Navbar } from "./components/Navbar";
import { Home } from "./views/Home";
import { Staking } from "./views/Staking";
import { Partners } from "./views/Partners";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Particles from "react-tsparticles";

import { getParticlesTheme } from "./theme";
import { routes } from "./assets/constants";
import { Bonsai } from "./views/Bonsai";
import { Shimo } from "./views/Shimo";
import { Katana } from "./views/Katana";
import { Sumo } from "./views/Sumo";
import { Luffy } from "./views/Luffy";
import { Kami } from "./views/Kami";
import { User } from "./views/User";
import { MyCommunities } from "./views/MyCommunities";
import { AllCommunities } from "./views/AllCommunities";
import { Community } from "./views/Community";
import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useMobileHook } from "./hooks/useMobile";

export const App = () => {
  const { chainId } = useWeb3React();
  const mobile = useMobileHook();
  const isSupportedNetwork = chainId && chainId !== 42161;

  return (
    <>
      <VStack minH={"100vh"} minW={"100vw"} spacing={0}>
        <Particles options={getParticlesTheme()} />

        <HStack pt={isSupportedNetwork ? 20 : 14} justifyContent={"center"} w={"100%"}>
          {isSupportedNetwork && (
            <Text
              w={"100%"}
              bg={"white"}
              textAlign={"center"}
              fontWeight={"extrabold"}
              color={"red.600"}
            >
              YOUR CURRENT NETWORK IS NOT SUPPORTED. PLEASE SWITCH TO ARBITRUM MAINNET.
            </Text>
          )}
        </HStack>

        <Navbar />
        <Switch>
          <Route path={routes.NULL} exact>
            <Redirect to={"/bonsai"} />
          </Route>
          <Route path={routes.HOME} exact>
            <Home />
          </Route>
          <Route path="/user/:name" exact>
            <User />
          </Route>{" "}
          <Route path="/community/:id" exact>
            <Community />
          </Route>{" "}
          <Route path={"/staking"}>
            <Staking />
          </Route>
          <Route path={"/bonsai"}>
            <Bonsai />
          </Route>
          <Route path={"/shimo"}>
            <Shimo />
          </Route>
          <Route path={"/katana"}>
            <Katana />
          </Route>
          <Route path={"/sumo"}>
            <Sumo />
          </Route>
          <Route path={"/luffy"}>
            <Luffy />
          </Route>
          <Route path={"/kami"}>
            <Kami />
          </Route>
          <Route path={routes.PARTNERS}>
            <Partners />
          </Route>
          <Route path={"/mycommunities"}>
            <MyCommunities />
          </Route>
          <Route path={"/allcommunities"}>
            <AllCommunities />
          </Route>
          <Route path="*">
            <Redirect to={routes.HOME} />
          </Route>
        </Switch>
        {!mobile && (
          <>
            <Spacer />
            <HStack bottom={0} h={6} bg={"white"} justifyContent={"center"} w={"100vw"}>
              <HStack spacing={12} bottom={0} h={6} justifyContent={"center"} w={"90vw"}>
                <Text textAlign={"center"} fontWeight={"extrabold"} color={"black"}>
                  {"{ * O * } DOHYŌ!!!"}
                </Text>
                <Text textAlign={"center"} fontWeight={"extrabold"} color={"black"}>
                  {"{ - _ - } ZZZzz zz z..."}
                </Text>
              </HStack>
            </HStack>
          </>
        )}
      </VStack>
    </>
  );
};

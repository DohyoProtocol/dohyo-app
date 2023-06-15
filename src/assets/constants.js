import { ARB_USDC_ABI } from "./ABIS/ARB_USDC";
import { ARB_ARBI_ABI } from "./ABIS/ARB_ARBI";
import { ARB_DOHYO_ABI } from "./ABIS/ARB_DOHYO";
import { ARB_BONSAI_ABI } from "./ABIS/ARB_BONSAI";
import { ARB_SUSHI_ABI } from "./ABIS/ARB_SUSHI";
import { ARB_WETH_ABI } from "./ABIS/ARB_WETH";
//test
export const urls = {
  ARBISCAN_TOKEN: "https://arbiscan.io/token/",
  ARBISCAN_ADDRESS: "https://arbiscan.io/address/",
  ARBISCAN_TX: "https://arbiscan.io/tx/",
};

export const addresses = {
  ARB_TOKEN: "0x912CE59144191C1204E64559FE8253a0e49E6548",
  WETH_TOKEN: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  SUSHI_TOKEN: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
  USDC_TOKEN: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  DOHYO_TOKEN: "0xf595773FA9cA6FfF8AcA680db9c39B94D4478857",
  WETH_USDC_LP: "0x4c42fa9ecc3a17229edf0fd6a8eec3f11d7e00d3",
  ARB_ETH_LP: "0xa6c5c7d189fa4eb5af8ba34e63dcdd3a635d433f",
  SUSHI_ETH_LP: "0x3221022e37029923ace4235d812273c5a42c322d",
  DOHYO_ETH_LP: "0x2565956d4316Fd8F2A625c63B7549ab83834A73E",
  DOHYO_CONTRACT: "0xb9719cc01F65fCEE4ad08f5ce31BCec28F95B562",
  BONSAI_GAME_CONTRACT: "0x36Db05BfAd79Ab019511970f8504858D048a5C7A",
  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",
  NATIVE_ADDRESS: "0x0000000000000000000000000000000000000000",
};

export const decimalsToUnits = (decimals) => {
  if (decimals === 18) return "ether";
  if (decimals === 6) return "mwei";
};

export const tokenAddressToUnits = (tokenAddress) => {
  if (tokenAddress === addresses.USDC_TOKEN) return "mwei";
  return "ether";
};

export const tokenAddressToSymbol = (tokenAddress) => {
  if (tokenAddress === addresses.ARB_TOKEN) return "ARB";
  if (tokenAddress === addresses.USDC_TOKEN) return "USDC";
  if (tokenAddress === addresses.WETH_TOKEN) return "WETH";
  if (tokenAddress === addresses.SUSHI_TOKEN) return "SUSHI";
  if (tokenAddress === addresses.DOHYO_TOKEN) return "DOHYO";
};

export const tokenNameToAddress = (tokenName) => {
  if (tokenName === "ARB") return addresses.ARB_TOKEN;
  if (tokenName === "USDC") return addresses.USDC_TOKEN;
  if (tokenName === "DOHYO") return addresses.DOHYO_TOKEN;
  if (tokenName === "WETH") return addresses.WETH_TOKEN;
  if (tokenName === "SUSHI") return addresses.SUSHI_TOKEN;
};
export const routes = {
  NULL: "/",
  HOME: "/home",
  GAMES: "/games",
  STATS: "/stats",
  PARTNERS: "/partners",
};

export const gamesRoutes = ["/bonsai", "/shimo", "/katana", "/kami", "/sumo", "/luffy"];

export const errors = {
  400: new Error("bad response from server"),
  THROW: new Error("error"),
  NOPROVIDER: new Error("typeof window.ethereum === undefined"),
  DEFAULT: { status: "failed", message: "something went wrong" },
  REJECTION: {
    status: "failed",
    message: "user rejected transaction",
  },
  TXFAILED: { status: "failed", message: "transaction failed" },
};

export const wrongNetwork = (network) => {
  return { status: "failed", message: "wrong network, please switch to " + network };
};

export const getContractParams = (contractName, network) => {
  if (network === 42161) {
    if (contractName === addresses.USDC_TOKEN) {
      return { address: addresses.USDC_TOKEN, abi: ARB_USDC_ABI };
    } else if (contractName === addresses.ARB_TOKEN) {
      return { address: addresses.ARB_TOKEN, abi: ARB_ARBI_ABI };
    } else if (contractName === addresses.SUSHI_TOKEN) {
      return { address: addresses.SUSHI_TOKEN, abi: ARB_SUSHI_ABI };
    } else if (contractName === addresses.WETH_TOKEN) {
      return { address: addresses.WETH_TOKEN, abi: ARB_WETH_ABI };
    } else if (contractName === addresses.DOHYO_TOKEN) {
      return { address: addresses.DOHYO_TOKEN, abi: ARB_USDC_ABI };
    } else if (contractName === "dohyocontract") {
      return { address: addresses.DOHYO_CONTRACT, abi: ARB_DOHYO_ABI };
    } else if (contractName === "bonsai") {
      return { address: addresses.BONSAI_GAME_CONTRACT, abi: ARB_BONSAI_ABI };
    }
  } else {
    if (contractName === addresses.USDC_TOKEN) {
      return { address: addresses.USDC_TOKEN, abi: ARB_USDC_ABI };
    } else if (contractName === addresses.SUSHI_TOKEN) {
      return { address: addresses.SUSHI_TOKEN, abi: ARB_SUSHI_ABI };
    } else if (contractName === addresses.WETH_TOKEN) {
      return { address: addresses.WETH_TOKEN, abi: ARB_WETH_ABI };
    } else if (contractName === addresses.ARB_TOKEN) {
      return { address: addresses.ARB_TOKEN, abi: ARB_ARBI_ABI };
    } else if (contractName === addresses.DOHYO_TOKEN) {
      return { address: addresses.DOHYO_TOKEN, abi: ARB_USDC_ABI };
    } else if (contractName === "dohyocontract") {
      return { address: addresses.DOHYO_CONTRACT, abi: ARB_DOHYO_ABI };
    } else if (contractName === "bonsai") {
      return { address: addresses.BONSAI_GAME_CONTRACT, abi: ARB_BONSAI_ABI };
    }
  }
};

export const toastTypes = {
  ERROR: "Error",
  SUCCESS: "Success",
  RELOADING: "Reloading",
  CONFIRMING: "Confirming",
};

export const messages = {
  ACCOUNTCHANGED: "account changed",
  NETWORKCHANGED: "network changed",
};

export const walletConnectBridgeUrl = "https://bridge.walletconnect.org";

export const variants = { OUTLINE: "outline", SIMPLE: "simple", SOLID: "solid" };

export const colors = {
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  BLACK: "black",
  WHITE900: "whiteAlpha.900",
  WHITE500: "whiteAlpha.500",
  WHITE300: "whiteAlpha.300",
  WHITE100: "whiteAlpha.100",
  WHITE: "whiteAlpha",
  BLACK900: "blackAlpha.900",
  BLACK500: "blackAlpha.500",
  BLUE200: "blue.200",
  PINK: "pink",
  TEAL: "teal",
  ORANGE: "orange",
  PURPLE: "purple",
  PURPLE200: "purple.200",
  RED: "red",
  red200: "red.200",
  YELLOW100: "yellow.100",
  YELLOW200: "yellow.200",
  RED200: "red.200",
  GREEN200: "green.200",
  GRAY500: "gray.500",
  GRAY300: "gray.300",
  GRAY900: "gray.900",
};

export const stackDirectons = { ROW: "row", COLUMN: "column" };

export const sizes = { XS: "xs", SM: "sm", "2XL": "2xl", FULL: "full", XL: "xl" };

export const positions = {
  CENTER: "center",
  TOP: "top",
  AUTO: "auto",
  FIXED: "fixed",
  END: "end",
  BOTTOM: "bottom",
  RIGHT: "right",
  FLEXSTART: "flex-start",
  FLEXEND: "flex-end",
};

export const wrappings = { WRAP: "wrap", NOWRAP: "nowrap" };

export const decorations = { UNDERLINE: "underline" };

export const weights = { BOLD: "bold" };

export const zIndexes = { DROPDOWN: "dropdown" };

export const overflows = { SCROLL: "scroll", HIDDEN: "hidden" };

export const borders = {
  JAZZICONXXL: "15px solid #187DD5",
  JAZZICONXL: "4px solid #187DD5",
  JAZZICONMD: "2px solid #187DD5",
  JAZZICONXS: "1px solid #187DD5",
};

export const hexColors = {
  BLUE: "#90CDF4",
  YELLOW: "#FAF089",
  GREEN: "#9AE6B4",
  RED: "#FEB2B2",
};

// search the networks array by any value and return any value of the result
export const networks = (searchKey, searchValue, returnType) => {
  const res = networksArray.filter((obj) => {
    return obj[searchKey] === searchValue;
  });
  return res[0][returnType];
};

export const networkSearch = {
  SYMBOL: "SYMBOL",
  NAME: "NAME",
  HEXID: "HEXID",
  ID: "ID",
  USDC: "USDC",
  SCANNERLINK: "SCANNERLINK",
  WALLETDATA: "WALLETDATA",
};

//AAA
export const networksArray = [
  {
    HEXID: "0x1",
    SYMBOL: "eth",
    ID: 1,
    NAME: "ethereum",
    SCANNERLINK: "https://etherscan.io/tx/",
    WALLETDATA: {
      chainName: "Ethereum",
      rpcUrls: [`https://mainnet.infura.io/v3/6e0949f7963040c69876953305e103c9`],
    },
  },
  {
    HEXID: "0x5",
    ID: 5,
    NAME: "goerli",
    SYMBOL: "goerliEth",
    SCANNERLINK: "https://goerli.etherscan.io/tx/",
    WALLETDATA: {
      chainId: "0x5",
      chainName: "Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
      blockExplorerUrls: ["https://goerli.etherscan.io/"],
    },
  },

  {
    HEXID: "0x61",
    ID: 56,
    NAME: "bsc",
    SYMBOL: "bnb",
    SCANNERLINK: "https:/bscscan.com/tx/",
    WALLETDATA: {
      chainId: "0x61",
      chainName: "BSC Testnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "tBNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed.binance.org"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  },
  {
    HEXID: "0x61",
    ID: 97,
    NAME: "bsc",
    SYMBOL: "bnb",
    SCANNERLINK: "https://https://testnet.bscscan.com/tx/",
    WALLETDATA: {
      chainId: "0x61",
      chainName: "BSC Testnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "tBNB",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    },
  },
  {
    HEXID: "0xa86a",
    ID: 43114,
    NAME: "avalanche",
    SYMBOL: "avax",
    SCANNERLINK: "https://snowtrace.io/tx/",
    WALLETDATA: {
      chainId: "0xa86a",
      chainName: "Avalanche C-Chain",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://snowtrace.io/"],
    },
  },
  {
    HEXID: "0x152",
    ID: 25,
    NAME: "cronos",
    SYMBOL: "cro",
    SCANNERLINK: "https://cronoscan.com/tx/",
    WALLETDATA: {
      chainId: "0x19",
      chainName: "Cronos Mainnet",
      nativeCurrency: {
        name: "CRO",
        symbol: "CRO",
        decimals: 18,
      },
      rpcUrls: ["https://evm.cronos.org"],
      blockExplorerUrls: ["https://cronoscan.com/"],
    },
  },
  {
    HEXID: "0xfa",
    ID: 250,
    NAME: "fantom",
    SYMBOL: "ftm",
    SCANNERLINK: "https://https://ftmscan.com/tx/",
    WALLETDATA: {
      chainId: "0xfa",
      chainName: "Fantom Opera",
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ftm.tools/"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
  },
  {
    HEXID: "0x13881",
    ID: 80001,
    NAME: "mumbai",
    SYMBOL: "mumbai",
    SCANNERLINK: "https://mumbai.polygonscan.com/",
    WALLETDATA: {
      chainId: "0x13881",
      chainName: "Mumbai",
      nativeCurrency: {
        name: "MUMBAI",
        symbol: "MUMBAI",
        decimals: 18,
      },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  },
  {
    HEXID: "0x89",
    ID: 137,
    NAME: "polygon",
    SYMBOL: "matic",
    SCANNERLINK: "https://polygonscan.com/tx/",
    WALLETDATA: {
      chainId: "0x89",
      chainName: "Polygon",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-bor.publicnode.com	"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
  },
  {
    HEXID: "0xa4b1",
    ID: 42161,
    NAME: "arbitrum",
    SYMBOL: "arbiEth",
    SCANNERLINK: "https://arbiscan.io/tx/",
    WALLETDATA: {
      chainId: "0xa4b1",
      chainName: "Arbitrum",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://1rpc.io/arb"],
      blockExplorerUrls: ["https://arbiscan.io/"],
    },
  },
  {
    HEXID: "0x1e",
    ID: 30,
    NAME: "rootstock",
    SYMBOL: "rbtc",
    SCANNERLINK: "https://explorer.rsk.co/tx/",
    WALLETDATA: {
      chainId: "0x1e",
      chainName: "RSK Mainnet",
      nativeCurrency: {
        name: "RBTC",
        symbol: "RBTC",
        decimals: 18,
      },
      rpcUrls: ["https://mycrypto.rsk.co"],
      blockExplorerUrls: ["https://explorer.rsk.co/"],
    },
  },
  {
    HEXID: "0x505",
    ID: 1285,
    NAME: "moonriver",
    SYMBOL: "movr",
    SCANNERLINK: "https://moonriver.moonscan.io/tx/",
    WALLETDATA: {
      chainId: "0x505",
      chainName: "Moonriver",
      nativeCurrency: {
        name: "MOVR",
        symbol: "MOVR",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
      blockExplorerUrls: ["https://moonriver.moonscan.io/"],
    },
  },
  {
    HEXID: "0x504",
    ID: 1284,
    NAME: "moonbeam",
    SYMBOL: "glmr",
    SCANNERLINK: "https://moonbeam.moonscan.io/tx/",
    WALLETDATA: {
      chainId: "0x504",
      chainName: "Moonbeam",
      nativeCurrency: {
        name: "GLMR",
        symbol: "GLMR",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.api.moonbeam.network"],
      blockExplorerUrls: ["https://moonbeam.moonscan.io/"],
    },
  },
  {
    HEXID: "0xA",
    ID: 10,
    NAME: "optimism",
    SYMBOL: "optiEth",
    SCANNERLINK: "https://optimistic.etherscan.io/tx/",
    WALLETDATA: {
      chainId: "0xA",
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io/"],
      blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    },
  },
  {
    HEXID: "0x2019",
    ID: 8217,
    NAME: "klaytn",
    SYMBOL: "klay",
    SCANNERLINK: "https://scope.klaytn.com/tx/",
    WALLETDATA: {
      chainId: "0x2019",
      chainName: "Klaytn Mainnet Cypress",
      nativeCurrency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
      },
      rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
      blockExplorerUrls: ["https://scope.klaytn.com/"],
    },
  },
  {
    HEXID: "0x440",
    ID: 1088,
    NAME: "metis",
    SYMBOL: "metis",
    SCANNERLINK: "https://andromeda-explorer.metis.io/tx/",
    WALLETDATA: {
      chainId: "0x440",
      chainName: "Metis Andromeda Mainnet",
      nativeCurrency: {
        name: "METIS",
        symbol: "METIS",
        decimals: 18,
      },
      rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
      blockExplorerUrls: ["https://andromeda-explorer.metis.io/"],
    },
  },
  {
    HEXID: "0x42",
    ID: 66,
    NAME: "okxchain",
    SYMBOL: "okt",
    SCANNERLINK: "https://www.oklink.com/en/okc/tx/",
    WALLETDATA: {
      chainId: "0x42",
      chainName: "OKXChain Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "OKT",
        decimals: 18,
      },
      rpcUrls: ["https://exchainrpc.okex.org"],
      blockExplorerUrls: ["https://www.oklink.com/en/okc/"],
    },
  },
  {
    HEXID: "0xC7",
    ID: 199,
    NAME: "bittorrent",
    SYMBOL: "btt",
    SCANNERLINK: "https://scan.bittorrentchain.io/tx/",
    WALLETDATA: {
      chainId: "0xC7",
      chainName: "BitTorrent Chain Mainnet",
      nativeCurrency: {
        name: "BTT",
        symbol: "BTT",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.bittorrentchain.io"],
      blockExplorerUrls: ["https://scan.bittorrentchain.io/"],
    },
  },
];

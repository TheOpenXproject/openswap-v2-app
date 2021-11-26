export const pools = {
  oSWAPWONE: {
    pair: "OpenX/ONE",
    pairaddress: "0xF237c4Ffc7F761eD07D665567DcCF6522B96C1E7",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OpenX", "ONE"],
    decimals: [18, 18],
    pid: "0",
    rewards: "3X",
    i: 0
  },
  oSWAPbBUSD: {
    pair: "OpenX/bBUSD",
    pairaddress: "0x6f850edCE1E3Ea86e6c24317709430cdE3C2e0C4",
    token1address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["OpenX","bBUSD"],
    decimals: [18, 18],
    pid: "1",
    rewards: "3X",
    i: 1
  },
  bBUSDWONE: {
    pair: "bBUSD/ONE",
    pairaddress: "0xEcDB517093fEAC5f686B20FC51e43604B5f40982",
    token0address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBUSD","ONE"],
    decimals: [18, 18],
    pid: "2",
    rewards: "1X",
    i: 2
  },
  WBTCWONE: {
    pair: "eWBTC/ONE",
    pairaddress: "0x7e634AD011C48F686Cd58a124Dd2EFc7A6A660Ae", //
    token0address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eWBTC", "ONE"],
    decimals: [8, 18],
    pid: "3",
    rewards: "1X",
    i: 3
  },
  bBUSDeWBTC: {
    pair: "bBUSD/eWBTC",
    pairaddress: "0x701df8cb10bc265A07c6ef93B8E834F2F007a24f",
    token0address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    token1address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/WBTC.png",
    name: ["bBUSD", "eWBTC"],
    decimals: [18, 8],
    pid: "4",
    rewards: "1X",
    i: 4
  },
  eBUSDeWBTC: {
    pair: "eWBTC/eBUSD",
    pairaddress: "0xCf13B1885C880251b83C30E245c8b313b329D02E", //
    token0address: "0x3095c7557bCb296ccc6e363DE01b760bA031F2d9",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://openfi.dev/tokens/default/WBTC.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eWBTC", "eBUSD" ],
    decimals: [8, 18],
    pid: "5",
    rewards: "1X",
    i: 5
  },
  eBUSDWONE: {
    pair: "ONE/eBUSD",
    pairaddress: "0xa78b64d6Cb3559b84c3D9E1Bd15cFe630E323690",
    token0address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://openfi.dev/tokens/default/ONE.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["ONE","eBUSD"],
    decimals: [18, 18],
    pid: "6",
    rewards: "1X",
    i: 6
  },
  eETHeBUSD: {
    pair: "eETH/eBUSD",
    pairaddress: "0xb7Fe63CbB705E4b79E20Ff9dE5e748D7295569C6", //
    token0address: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["eETH", "eBUSD"],
    decimals: [18, 18],
    pid: "7",
    rewards: "1X",
    i: 7
  } /*
    BNBONE: {
    pair: "bBNB/ONE",
    pairaddress: "0xfaADF659160f8c736f6D502Ac4fa8671b65312f0",
    token0address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["bBNB", "ONE"],
    pid: "8"
    
  }*/,
  BNBONE: {
    pair: "bBNB/ONE",
    pairaddress: "0xf9629F80df22CA6BeA62AaF40b5aDF4aC75e884F",
    token0address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bBNB", "ONE"],
    decimals: [18, 18],
    pid: "8",
    rewards: "1X",
    i: 8
  },
  eUSDCONE: {
    pair: "eUSDC/ONE",
    pairaddress: "0x61AB51f4c85a53Ad1413B1Edf6F4E59D34FeD383",
    token0address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eUSDC", "ONE"],
    decimals: [6, 18],
    pid: "9",
    rewards: "1X",
    i: 9
  },//**************************************************************************
  oSWAPbMATIC: {
    pair: "OpenX/bMATIC",
    pairaddress: "0x2aa71117D13947311794fC9B63Dfa2c4A092d902",
    token1address: "0x6E7bE5B9B4C9953434CD83950D61408f1cCc3bee",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    imgtoken1: "https://openfi.dev/tokens/default/MATIC.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: [ "OpenX" , "bMATIC"],
    decimals: [18, 18],
    pid: "10",
    rewards: "3X",
    i: 10
  },
    oSWAPbBNB: {
    pair: "OpenX/bBNB",
    pairaddress: "0xbdbCbf17cbB86fb4C76B0a68eef0aa476E812Ad6",
    token1address: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["OpenX","bBNB"],
    decimals: [18, 18],
    pid: "11",
    rewards: "3X",
    i: 11
  },

    oSWAPbADA: {
    pair: "OpenX/bADA",
    pairaddress: "0xefD9A4581ae64B60ce1b5D240b7A74314042d561",
    token1address: "0x582617bD8Ca80d22D4432E63Fda52D74dcDCEe4c",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    imgtoken1: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["bADA","OpenX"],
    decimals: [18, 18],
    pid: "12",
    rewards: "3X",
    i: 12
  },
  ONEeETH: {
    pair: "eETH/ONE",
    pairaddress: "0xbf7F693c78039E15e90eFf2C9797fCf3b62cf5cE",
    token0address: "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/ETH.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eETH","ONE"],
    decimals: [18, 18],
    pid: "13",
    rewards: "1X",
    i: 13
  },
  eBUSDbBUSD: {
    pair: "eBUSD/bBUSD",
    pairaddress: "0xBe4a49C74be6f85815Dde22f303da056Cd512cf1",
    token1address: "0xE176EBE47d621b984a73036B9DA5d834411ef734",
    token0address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    imgtoken1: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    name: ["bBUSD","eBUSD"],
    decimals: [18, 18],
    pid: "14",
    rewards: "1X",
    i: 14
  },
  eUSDCbUSDC: {
    pair: "eUSDC/bUSDC",
    pairaddress: "0x58a8CCd055E6eDB891d04C211FE1c3D0c58a5E61",
    token0address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
    token1address: "0x44cED87b9F1492Bf2DCf5c16004832569f7f6cBa",
    imgtoken0: "https://openfi.dev/tokens/default/USDC.png",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    name: ["eUSDC","bUSDC"],
    decimals: [18, 6],
    pid: "15",
    rewards: "1X",
    i: 15
  },
  bBUSDeUSDC: {
    pair: "bBUSD/eUSDC",
    pairaddress: "0x4c32CB4300B96D9Bd4EB2F46405ab679a22019F7",
    token0address: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
    token1address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
    imgtoken0: "https://openfi.dev/tokens/default/BUSD.png",
    imgtoken1: "https://openfi.dev/tokens/default/USDC.png",
    name: ["bBUSD","eUSDC"],
    decimals: [18, 6],
    pid: "16",
    rewards: "1X",
    i: 16
  },
  
  oSWAPWONEs: {
    pair: "OpenX/WONE VENOM-LP",
    pairaddress: "0xef5e22f3866807ef8345b36cfc05e221240460b3",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["OpenX", "ONE"],
    decimals: [18, 18],
    pid: "18",
    rewards: "2X",
    i: 17
  },
  bCAKEWONE: {
    pair: "bCAKE/ONE",
    pairaddress: "0x40f582032D5281CAfC0C9D14A2e2C0d56eDcE8c5",
    token0address: "0x3e9D32580B0BF3aE72AFCBEbC68710d2Fd9a18F0",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://s2.coinmarketcap.com/static/img/coins/128x128/7186.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["bCake", "ONE"],
    decimals: [18, 18],
    pid: "20",
    rewards: "2X",
    i: 18
  },
  USTWONE: {
    pair: "tUST/ONE",
    pairaddress: "0xbF6b68d9446E7c392967C94D283210F43DB118Bc",
    token0address: "0x224e64ec1BDce3870a6a6c777eDd450454068FEC",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://assets.terra.money/icon/60/UST.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["UST", "ONE"],
    decimals: [18, 18],
    pid: "21",
    rewards: "2X",
    i: 19
  },
  LUNAWONE: {
    pair: "tLUNA/ONE",
    pairaddress: "0x1E0e3Ec3Db09bf0f1cEfEdA528cbe315C4e85758",
    token0address: "0x95CE547D730519A90dEF30d647F37D9E5359B6Ae",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://assets.terra.money/icon/60/Luna.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["tLuna", "ONE"],
    decimals: [18, 18],
    pid: "22",
    rewards: "2X",
    i: 20
  },
  eSUSHIWONE: {
    pair: "eSUSHI/ONE",
    pairaddress: "0x41C5d1D13443848f5583dE9adB8C09Ee8BfCd2E6",
    token0address: "0xBEC775Cb42AbFa4288dE81F387a9b1A3c4Bc552A",
    token1address: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
    imgtoken0: "https://openfi.dev/tokens/default/SUSHI.png",
    imgtoken1: "https://openfi.dev/tokens/default/ONE.png",
    name: ["eSUSHI", "ONE"],
    decimals: [18, 18],
    pid: "23",
    rewards: "2X",
    i: 21
  },
  //PID 19 == VALIDATOR TOKEN
  //0x40f582032D5281CAfC0C9D14A2e2C0d56eDcE8c5- bsccake-one
  
  //0xbF6b68d9446E7c392967C94D283210F43DB118Bc- ust-ONE
  //0x1E0e3Ec3Db09bf0f1cEfEdA528cbe315C4e85758- Luna-one
  //0x41C5d1D13443848f5583dE9adB8C09Ee8BfCd2E6- eSUSHI-ONE

};
export const SoloPools = {
  oSWAPWONE: {
    pair: "OPENx",
    pairaddress: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    token1address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    token0address: "0x01A4b054110d57069c1658AFBC46730529A3E326",
    imgtoken0: "https://openfi.dev/tokens/default/oSWAP.png",
    imgtoken1: "https://openfi.dev/tokens/default/oSWAP.png",
    name: ["OpenX"],
    decimals: [18, 18],
    pid: "17",
    rewards: "1X",
    i: 0
  },

};

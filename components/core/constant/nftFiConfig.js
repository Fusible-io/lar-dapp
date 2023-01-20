const mainnetConfig = {
    chainId: 1,
    website: {
        baseURI: 'https://www.nftfi.com',
    },
    api: {
        baseURI: 'https://sdk-api.nftfi.com',
    },
    erc20: {
        weth: {
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            symbol: 'wETH',
            unit: 18
        },
        dai: {
            address: '0x6b175474e89094c44da98b954eedeac495271d0f',
            symbol: 'DAI',
            unit: 18
        },
    },
}

const goerliConfig = {
    chainId: 5,
    website: {
        baseURI: 'https://goerli-integration.nftfi.com',
    },
    api: {
        baseURI: 'https://goerli-integration-sdk-api.nftfi.com',
    },
    erc20: {
        weth: {
            address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
            symbol: 'wETH',
            unit: 18
        },
        dai: {
            address: "0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844",
            symbol: 'DAI',
            unit: 18
        },
        usdc: {
            address: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
            symbol: 'USDC',
            unit: 6
        }
    },
}

export const ERC20_MAP = {
    [goerliConfig.erc20.weth.address]: {
        unit: goerliConfig.erc20.weth.unit,
        symbol: goerliConfig.erc20.weth.symbol,
    },
    [goerliConfig.erc20.dai.address]: {
        unit: goerliConfig.erc20.dai.unit,
        symbol: goerliConfig.erc20.dai.symbol,
    },
    [goerliConfig.erc20.usdc.address]: {
        unit: goerliConfig.erc20.usdc.unit,
        symbol: goerliConfig.erc20.usdc.symbol,
    },
    [mainnetConfig.erc20.weth.address]: {
        unit: mainnetConfig.erc20.weth.unit,
        symbol: mainnetConfig.erc20.weth.symbol,
    },
    [mainnetConfig.erc20.dai.address]: {
        unit: mainnetConfig.erc20.dai.unit,
        symbol: mainnetConfig.erc20.dai.symbol,
    },
}
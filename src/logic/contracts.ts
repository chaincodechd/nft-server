import { ChainId, Contract, Network, NFTCategory } from '@dcl/schemas'
import { ISubgraphComponent } from '@well-known-components/thegraph-component'
import { FragmentItemType, ItemFragment } from '../ports/items/types'

const MAX_RESULTS = 1000

const getCollectionsQuery = (page: number) => `
  query getCollections {
    collections(first: ${MAX_RESULTS}, skip: ${
  page * MAX_RESULTS
}, where: { isApproved: true }) {
      name
      id
      items {
        itemType
      }
    }
  }
`

export async function getCollectionsContracts(
  subgraph: ISubgraphComponent,
  network: Network,
  chainId: ChainId
): Promise<Contract[]> {
  let page = 0
  const contracts: Contract[] = []

  while (true) {
    const { collections } = await subgraph.query<{
      collections: { id: string; name: string; items: ItemFragment[] }[]
    }>(getCollectionsQuery(page++))

    for (const { id: address, name, items } of collections) {
      const hasEmotes = items.some(
        (item: ItemFragment) => item.itemType === FragmentItemType.EMOTE_V1
      )
      const hasWearables = items.some((item: ItemFragment) =>
        [
          FragmentItemType.WEARABLE_V1,
          FragmentItemType.WEARABLE_V2,
          FragmentItemType.SMART_WEARABLE_V1,
        ].includes(item.itemType)
      )

      if (hasWearables) {
        contracts.push({
          name,
          address,
          category: NFTCategory.WEARABLE,
          network,
          chainId,
        })
      }

      if (hasEmotes) {
        contracts.push({
          name,
          address,
          category: NFTCategory.EMOTE,
          network,
          chainId,
        })
      }
    }

    if (collections.length < MAX_RESULTS) {
      break
    }
  }

  return contracts
}

export function getMarketplaceContracts(chainId: ChainId): Contract[] {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET: {
      return [
        {
          name: 'LAND',
          address: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
          category: NFTCategory.PARCEL,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Estates',
          address: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
          category: NFTCategory.ESTATE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Names',
          address: '0x2a187453064356c898cae034eaed119e1663acb8',
          category: NFTCategory.ENS,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Atari Launch',
          address: '0x4c290f486bae507719c562b6b524bdb71a2570c9',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Binance Us',
          address: '0xa8ee490e4c4da48cc1653502c1a77479d4d818de',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'China Flying',
          address: '0x90958d4531258ca11d18396d4174a007edbc2b42',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Community Contest',
          address: '0x32b7495895264ac9d0b12d32afd435453458b1c6',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Cybermike CyberSoldier Set',
          address: '0x24d538a6265b006d4b53c45ba91af5ef60dca6cb',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'CZ Mercenary MTZ',
          address: '0xc3ca6c364b854fd0a653a43f8344f8c22ddfdd26',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Dappcraft Moonminer',
          address: '0x1e1d4e6262787c8a8783a37fee698bd42aa42bec',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DCG',
          address: '0x3163d2cfee3183f9874e2869942cc62649eeb004',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DCL Launch',
          address: '0xd35147be6401dcb20811f2104c33de8e97ed6818',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DC Meta',
          address: '0xe7a64f6a239ed7f5bf18caa1ce2920d0c1278129',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DC Niftyblocksmith',
          address: '0x102daabd1e9d294d4436ec4c521dce7b1f15499e',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DG Fall 2020',
          address: '0x7038e9d2c6f5f84469a84cf9bc5f4909bb6ac5e0',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'DG Summer',
          address: '0xbf53c33235cbfc22cef5a61a83484b86342679c5',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Dgtble Headspace',
          address: '0x574f64ac2e7215cba9752b85fc73030f35166bc0',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Digital Alchemy',
          address: '0x5cf39e64392c615fd8086838883958752a11b486',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Ethermon Wearables',
          address: '0x54266bcf2ffa841af934f003d144957d5934f3ab',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Exclusive Masks',
          address: '0xc04528c14c8ffd84c7c1fb6719b4a89853035cdd',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Dillon Francis Atari',
          address: '0x51e0b1afe5da0c038fc93a3fc8e11cf7a238b40b',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Halloween 2019',
          address: '0xc1f4b0eea2bd6690930e6c66efd3e197d620b9c2',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Halloween 2020',
          address: '0xfeb52cbf71b9adac957c6f948a6cf9980ac8c907',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'MCH',
          address: '0xf64dc33a192e056bb5f0e5049356a0498b502d50',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: "Meme don't buy this",
          address: '0x1a57f6afc902d25792c53b8f19b7e17ef84222d5',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'MF Sammichgamer',
          address: '0x30d3387ff3de2a21bef7032f82d00ff7739e403c',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'ML Liondance',
          address: '0x0b1c6c75d511fae05e7dc696f4cf14129a9c43c9',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'ML Pekingopera',
          address: '0x60d8271c501501c4b8cd9ed5343ac59d1b79d993',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Moonshot',
          address: '0x6a99abebb48819d2abe92c5e4dc4f48dc09a3ee8',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'PM Dreamverse Eminence',
          address: '0x09305998a531fade369ebe30adf868c96a34e813',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'PM Outtathisworld',
          address: '0x75a3752579dc2d63ca229eebbe3537fbabf85a12',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'RAC Basics',
          address: '0x68e139552c4077ce5c9ab929c7e18ca721ffff00',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Release the Kraken',
          address: '0xffc5043d9a00865d089d5eefa5b3d1625aec6763',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'RTFKT X Atari',
          address: '0x6b47e7066c7db71aa04a1d5872496fe05c4c331f',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Stay Safe',
          address: '0x201c3af8c471e5842428b74d1e7c0249adda2a92',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Sugarclub Yumi',
          address: '0xb5d14052d1e2bce2a2d7459d0379256e632b855d',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Tech Tribal Marc0matic',
          address: '0x480a0f4e360e8964e68858dd231c2922f1df45ef',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: '3LAUBasics',
          address: '0xe1ecb4e5130f493551c7d6df96ad19e5b431a0a9',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Winklevoss Capital',
          address: '0xc82a864a94db3550bc71fcb4ce07228bcec21f1a',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Wonderzone Meteorcharser',
          address: '0x34ed0aa248f60f54dd32fbc9883d6137a491f4f3',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Wonderzone Steampunk',
          address: '0xb96697fa4a3361ba35b774a42c58daccaad1b8e1',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'WZ Wonderbot',
          address: '0x5df4602e7f38a91ea7724fc167f0c67f61604b1e',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Xmas2019',
          address: '0xc3af02c0fd486c8e9da5788b915d6fff3f049866',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'Xmas2020',
          address: '0xecf073f91101ce5628669c487aee8f5822a101b1',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
        {
          name: 'XmashUp',
          address: '0xdd9c7bc159dacb19c9f6b9d7e23948c87aa2397f',
          category: NFTCategory.WEARABLE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_MAINNET,
        },
      ]
    }
    case ChainId.ETHEREUM_GOERLI: {
      return [
        {
          name: 'LAND',
          address: '0x25b6B4bac4aDB582a0ABd475439dA6730777Fbf7',
          category: NFTCategory.PARCEL,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_GOERLI,
        },
        {
          name: 'Estates',
          address: '0xC9A46712E6913c24d15b46fF12221a79c4e251DC',
          category: NFTCategory.ESTATE,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_GOERLI,
        },
        {
          name: 'Names',
          address: '0x6b8da2752827cf926215b43bb8E46Fd7b9dDac35',
          category: NFTCategory.ENS,
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_GOERLI,
        },
        {
          name: 'Exclusive Masks',
          address: '0x1f0880E0b4514DC58e68B9BE91693bFA8C067ac1',
          network: Network.ETHEREUM,
          chainId: ChainId.ETHEREUM_GOERLI,
          category: NFTCategory.WEARABLE,
        },
      ]
    }
    default:
      return []
  }
}

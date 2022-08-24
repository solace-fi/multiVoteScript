import Multicall_ABI from './MulticallABI.json';
import Voting_ABI from './VotingABI.json';
import { providers, Contract } from 'ethers';

const RPC_ENDPOINT: { [network: string]: string } = {
  ['goerli']: 'https://rpc.goerli.mudit.blog',
  ['aurora']: 'https://mainnet.aurora.dev',
};

const PROVIDER: { [network: string]: providers.Provider } = {
  ['goerli']: new providers.JsonRpcProvider(RPC_ENDPOINT['goerli']),
  ['aurora']: new providers.JsonRpcProvider(RPC_ENDPOINT['aurora']),
};

const MULTICALL_ADDRESS: { [network: string]: string } = {
  ['goerli']: '0xB2f941B85791e47FAa6391Cdef36A3BBaD19b73E',
  ['aurora']: '0x36C232005D7c237c1268AA8C8B51b7Eb59eB44ae',
};

const VOTING_ADDRESS: { [network: string]: string } = {
  ['goerli']: '0x501ACe67a1cba9ca9793c300B3AEB29394ae8C7b',
  ['aurora']: '0x501ace085C07AfB7EB070ddbC7b4bC3D4379761a',
};

export const MULTICALL_CONTRACT: { [network: string]: Contract } = {
  ['goerli']: new Contract(MULTICALL_ADDRESS['goerli'], Multicall_ABI, PROVIDER['goerli']),
  ['aurora']: new Contract(MULTICALL_ADDRESS['aurora'], Multicall_ABI, PROVIDER['aurora']),
};

export const VOTING_CONTRACT: { [network: string]: Contract } = {
  ['goerli']: new Contract(VOTING_ADDRESS['goerli'], Voting_ABI, PROVIDER['goerli']),
  ['aurora']: new Contract(VOTING_ADDRESS['aurora'], Voting_ABI, PROVIDER['aurora']),
};

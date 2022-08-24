import { MULTICALL_CONTRACT, VOTING_CONTRACT } from '../constants';
import { BigNumberish, PopulatedTransaction, Wallet, providers } from 'ethers';

interface Call {
  target: string;
  callData: string;
}

interface VoteMultipleInput {
  address: string;
  gaugeIDs: BigNumberish[];
  votePowerBPSs_: BigNumberish[];
}

export async function multiVote(network: string, votes: VoteMultipleInput[], signer: Wallet | providers.JsonRpcSigner) {
  if (!Object.keys(MULTICALL_CONTRACT).includes(network)) {
    console.log(`${network} network not supported`);
    return;
  }

  const promises: Promise<PopulatedTransaction>[] = [];

  for (const vote of votes) {
    promises.push(
      VOTING_CONTRACT[network].populateTransaction.voteMultiple(vote.address, vote.gaugeIDs, vote.votePowerBPSs_)
    );
  }

  const txArray: PopulatedTransaction[] = await Promise.all(promises);
  const calls: Call[] = txArray.map((x) => {
    return { target: VOTING_CONTRACT[network].address, callData: x.data || '0x' };
  });
  await MULTICALL_CONTRACT[network].connect(signer).tryAggregate(false, calls);
}

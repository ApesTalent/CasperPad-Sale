import { ethers } from 'ethers';
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from '@usedapp/core';

import { 
  swprTokenAddress, 
  vestingContractAddress, 
  busdTokenAddress, 
  whitelistOfTiers,
  usdtTokenAddress 
} from '../contract_info/vestingDataNew';
const { toChecksumAddress } = require('ethereum-checksum-address');

const vestingContractAbi = require('../contract_info/vesting_contract_new_abi.json');
const swprContractAbi = require('../contract_info/swpr_contract_abi.json');
const busdContractAbi = require('../contract_info/busd_contract_abi.json');
const usdtContractAbi = require('../contract_info/usdt_contract_abi.json');

const vestingContractInterface = new ethers.utils.Interface(vestingContractAbi);
const swprContractInterface = new ethers.utils.Interface(swprContractAbi);
const busdContractInterface = new ethers.utils.Interface(busdContractAbi);
const usdtContractInterface = new ethers.utils.Interface(usdtContractAbi);

const vestingContract = new Contract(vestingContractAddress, vestingContractInterface);
const swprContract = new Contract(swprTokenAddress, swprContractInterface);
const busdContract = new Contract(busdTokenAddress, busdContractInterface);
const usdtContract = new Contract(usdtTokenAddress, usdtContractInterface);

/** functions for the vesting contract */
//get status of contract hook
function toCheckAddress(addr){
  let address = String(addr);
  return address.toLowerCase();
}

export function useLockedAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'locked',
      args: [swprTokenAddress],
    }) ?? [];
    return amount;
}

export function useSoldAmount() {
    const [amount] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'getTotalSoldAmount',
      args: [],
    }) ?? [];
    return amount;
}

export function useTempSoldAmount() {
  const [amount] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getTempSoldAmount',
    args: [],
  }) ?? [];
  return amount;
}

export function useGetTierOfAccount(account) {
    // const [maxAmount] = useContractCall({
    //   abi: vestingContractInterface,
    //   address: vestingContractAddress,
    //   method: 'getTierOfAccount',
    //   args: [account],
    // }) ?? [];
    const maxAmount = whitelistOfTiers[toCheckAddress(account)];
    return maxAmount;
}

export function useGetFcfsLimitAmount() {
  const [fcfsLimitAmount] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getFcfsLimitAmount',
    args: [],
  }) ?? [];
  return fcfsLimitAmount;
}

export function useGetWLEndTime() {
  const [startFcfsTime] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getWLEndTime',
    args: [],
  }) ?? [];
  return startFcfsTime;
}

export function useGetLockedAmount(account) {
  const [fcfsLockedAmount] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'locked',
    args: [account],
  }) ?? [];
  return fcfsLockedAmount;
}

export function useIsSoldWhitelist(account) {
    const [isSoldWhitelist] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'getIsSoldWhitelist',
      args: [account],
    }) ?? [];
    return isSoldWhitelist;
}

export function useIsAdmin(account) {
    const [isAdmin] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'admins',
      args: [account],
    }) ?? [];
    return isAdmin;
}

export function useGetSchedulePlain(index) {
    const [percentage, unlockTime, isSent] = useContractCall({
      abi: vestingContractInterface,
      address: vestingContractAddress,
      method: 'schedulePlain',
      args: [index],
    }) ?? [];
    return [percentage, unlockTime, isSent];
}

export function useGetUserSchedulePlain(account, index) {
  const [amount, claimedAmount, unlockTime, isFixed] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'schedules',
    args: [account, index],
  }) ?? [];
  return [amount, claimedAmount, unlockTime, isFixed];
}

export function useGetParticipants() {
  const [participants] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getParticipants',
    args: [],
  }) ?? [];
  return [participants];
}

export function useGetTreasuryWallet() {
  const [treasuryAddress] = useContractCall({
    abi: vestingContractInterface,
    address: vestingContractAddress,
    method: 'getTreasuryWallet',
    args: [],
  }) ?? [];
  return [treasuryAddress];
}
// send transaction hook
export function useVestingContractMethod(methodName) {
    const { state, send, events } = useContractFunction(vestingContract, methodName, {});
    return { state, send, events };
}

export function useSwprContractMethod(methodName) {
    const { state, send, events } = useContractFunction(swprContract, methodName, {});
    return { state, send, events };
}

export function useUsdtContractMethod(methodName) {
  const { state, send, events } = useContractFunction(usdtContract, methodName, {});
  return { state, send, events };
}

export function useBusdContractMethod(methodName) {
  const { state, send, events } = useContractFunction(busdContract, methodName, {});
  return { state, send, events };
}
/** the end for the vesting */

/** functions for the swpr token contract */
export function useBalanceOfVesting() {
    const [amount] = useContractCall({
      abi: swprContractInterface,
      address: swprTokenAddress,
      method: 'balanceOf',
      args: [vestingContractAddress],
    }) ?? [];
    return amount;
}
/** the end for the swpr */
import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, fromNano, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";
import { SecondAddressToPay, TimerContract } from "@/wrappers/TimerContract";

export function useTimerContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null | {
    timerStartTime: number;
  }>();

  const bettingContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = TimerContract.fromAddress(
      Address.parse("EQBV6CCqY9b9jWvcq3QkRl6dyFV3vz43chYochysLhooJ9at")
    );
    return client.open(contract) as OpenedContract<TimerContract>;
  }, [client]);

  useEffect(() => {
    // async function getValue() {
    //   if (!bettingContract) return;
    //   setContractData(null);
    //   const val = await bettingContract.getBetsCounter();
    //   setContractData({
    //     betsCounter: Number(val),
    //   });
    //   await sleep(5000);
    // //   getValue();
    async function getTime () {
      if (!bettingContract) return;
      setContractData(null);
      const start = await await bettingContract?.getTimerStartTime()
      setContractData({timerStartTime: Number(start)})
      console.log(start)
      await sleep(5000);
      // getTime()
    } 

    getTime()
  }, [bettingContract]);

  

  return {
    // contract_address: bettingContract?.address.toString(),
    ...contractData,
    sendStart: async () => {
      const startResult = await bettingContract?.send(
        sender,
        { value: toNano(0.01) },
        "start"
      );

      return startResult;
    },
    sendStop: async () => {
      return await bettingContract?.send(
          sender,
          { value: toNano(0.01) },
          "stop"
        );
    },
    sendAddress: async () => {
      const message: SecondAddressToPay = {
        secondAddressToPay: Address.parse("0QARwKlPwTlWMh-pBgqe-ChZa2BYG7QeeSJsPSeHvpu-B8ap" as string),
        $$type: "SecondAddressToPay",
      }
      const addressReuslt = await bettingContract?.send(
        sender,
        { value: toNano(0.01) },
        message
      );

      return addressReuslt;
    },
    getSecondAddressToPay: async () => {
      return (await bettingContract?.getSecondAddressToPay()!).toString();
    },
    
    getTimerStartTime: async () => {
      return await bettingContract?.getTimerStartTime();
    },
    getOwner: async () => {
      return (await bettingContract?.getOwner()!).toString();
    },
    getBalance: async () => {
      return fromNano(await bettingContract?.getBalance()!);
    },
  };
}

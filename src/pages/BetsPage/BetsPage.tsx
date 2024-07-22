import { useEffect, useState, type FC } from "react";
import { countdownFromStart } from "@/utils/helpers";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

import { useTonConnect } from "../../hooks/useTonConnect";
import { useTimerContract } from "@/hooks/useTimerContract";

import reloadIcon from "../../../assets/reload.png";

export const BetsPage: FC = () => {
  const { connected } = useTonConnect();
  const {
    sendStart,
    sendStop,
    getBalance,
    getOwner,
    getSecondAddressToPay,
    getTimerStartTime,
    sendAddress,
    timerStartTime,
  } = useTimerContract();

  const [startTime, setStartTime] = useState<number | undefined>(
    undefined
  );
  const [counter, setCounter] = useState<{
    timeLeft: string;
    isExpired: boolean;
  }>();

  console.log(startTime);

  useEffect(() => {
    setStartTime(timerStartTime);
    if (timerStartTime) {
      const interval = setInterval(() => {
        setCounter(countdownFromStart(timerStartTime));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerStartTime]);

  console.log(counter);

  const startResult = async () => {
    const res = await sendStart();
  };

  return (
    <>
      <div className="bg-gray-100 w-full h-screen flex flex-col items-center">
        <div className="flex flex-row m-4 justify-between">
          <TonConnectButton />
        </div>
        <div className="flex flex justify-center h-full w-full items-center">
          {connected && !timerStartTime && (
            <button
              onClick={startResult}
              className="bg-blue-500 rounded-md p-4 text-[18px] h-[50px] font-bold text-white flex items-center gap-2 flex justify-end"
            >
              Start
            </button>
          )}
          {connected &&
            startTime &&
            (counter?.isExpired ? (
              <button
                onClick={async () => console.log(await sendStop())}
                className="text-[25px] text-white font-bold bg-green-500 rounded-md p-4"
              >
                Получить награду 🪙
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-[108px] text-gray-900 font-bold font-unformital border-gray-900 border-4 p-4">
                  {counter?.timeLeft}
                </p>
                <p className="text-[18px] text-gray-900 font-bold mt-4">
                  не забудь позвонить - <a className="text-blue-500" href="https://t.me/drinkwater" target="_blank" rel="noreferrer">@drinkwater</a>
                </p>
              </div>
            ))}
          {!connected && (
            <p className="text-[25px] text-gray-900 font-bold">
              Подключи кошелек 😉
            </p>
          )}
        </div>

        <button onClick={() => window.location.reload()} className=" flex items-center gap-2 w-12 h-12"><img src={reloadIcon} /></button>

        {/* <button onClick={async () => console.log(await getBalance())} className="bg-blue-500 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">Get balance</button>
        <button onClick={async () => console.log(await sendAddress())} className="bg-blue-300 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">sendAdress</button>
        <button onClick={async () => console.log(await getSecondAddressToPay())} className="bg-blue-700 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">Get start address</button>
        <button onClick={async () => console.log(await getOwner())} className="bg-blue-100 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">Get Owner</button>
        <button onClick={async () => console.log(await getTimerStartTime())} className="bg-blue-600 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">Get Timer Start</button>
        <button onClick={async () => console.log(await sendStart())} className="bg-blue-400 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">SendStart</button>
        <button onClick={async () => console.log(await sendStop())} className="bg-gray-400 rounded-md p-4 text-[18px] font-bold text-gray-900 flex items-center gap-2 flex justify-end">SendSTOP</button> */}
      </div>
    </>
  );
};

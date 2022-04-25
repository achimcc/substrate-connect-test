import { useEffect, useState, useRef, MutableRefObject } from "react";
import { ApiPromise } from "@polkadot/api";
import {
  ScProvider,
  WellKnownChain,
} from "@polkadot/rpc-provider/substrate-connect";
import canvasSpec from "./canvas-rococo.json";

export type MountedRef = MutableRefObject<boolean>;
export const useIsMountedRef = (): MountedRef => {
  const isMounted = useRef(false);
  useEffect((): (() => void) => {
    isMounted.current = true;
    return (): void => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useApiCreate = (): ApiPromise => {
  const [api, setApi] = useState<ApiPromise>({} as ApiPromise);
  const mountedRef = useIsMountedRef();

  useEffect((): void => {
    const choseSmoldot = async (): Promise<void> => {
      try {
        const rococoProvider = new ScProvider(WellKnownChain.rococo_v2_1);
        const provider = new ScProvider(
          JSON.stringify(canvasSpec),
          rococoProvider
        );
        await provider.connect();
        console.log('provider',provider)
        const api = await ApiPromise.create({ provider });
        console.log('api', api)
        mountedRef.current && setApi(api);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    void choseSmoldot();
  }, [mountedRef]);

  return api;
};

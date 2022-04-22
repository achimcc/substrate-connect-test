import { useEffect, useState, useRef, MutableRefObject } from "react"
import { ApiPromise } from "@polkadot/api"
import {
  ScProvider,
  WellKnownChain,
} from "@polkadot/rpc-provider/substrate-connect"

export type MountedRef = MutableRefObject<boolean>
export const useIsMountedRef = (): MountedRef => {
  const isMounted = useRef(false)
  useEffect((): (() => void) => {
    isMounted.current = true
    return (): void => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export const useApiCreate = (): ApiPromise => {
  const [api, setApi] = useState<ApiPromise>({} as ApiPromise)
  const mountedRef = useIsMountedRef()

  useEffect((): void => {
    const choseSmoldot = async (): Promise<void> => {
      try {
        const provider = new ScProvider(WellKnownChain.westend2)
        await provider.connect()
        const api = await ApiPromise.create({ provider })
        mountedRef.current && setApi(api)
      } catch (err) {
        console.error("Error:", err)
      }
    }

    void choseSmoldot()
  }, [mountedRef])

  return api
}

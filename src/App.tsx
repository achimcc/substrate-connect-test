import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ApiPromise } from "@polkadot/api";
import { useApiCreate } from "./useApiCreate";

function App() {
  const api: ApiPromise = useApiCreate()
  const [header, setHeader] = useState<any>()

  useEffect(() => {
    const getHeader = async () => {
      const head = await api?.rpc?.chain?.getHeader()
      setHeader(head)
    }
    getHeader()
  }, [api])

  console.log(header?.number.toString())
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>check the console</p>
        <p>current header: {header?.number.toString()}</p>
      </header>
    </div>
  );
}

export default App;

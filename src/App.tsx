import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ScProvider,
  WellKnownChain,
} from "@polkadot/rpc-provider/substrate-connect";
import { ApiPromise } from "@polkadot/api";

const subscribe = async () => {
  // Create the provider for a known chain
  const provider = new ScProvider(WellKnownChain.rococo_v2_1);
  // Stablish the connection (and catch possible errors)
  await provider.connect();
  // Create the PolkadotJS api instance
  const api = await ApiPromise.create({ provider });
  await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    console.log(`head: ${lastHeader.hash}`);
  });
  await api.disconnect();
};

function App() {
  subscribe();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

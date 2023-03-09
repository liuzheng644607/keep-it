import React, { useState } from 'react';
import { render } from 'react-dom';
import StorageHub, { LocalStorageProvider, MemoryStorageProvider } from './src/main';

const storageHub = new StorageHub<StoreKV>(new MemoryStorageProvider);

storageHub.setItem('name', 'd', { expires: 2000 })

console.log(storageHub);

type StoreKV = {
  name: string;
  age: number;
  favorite?: Record<string, any>;
}

const App = () => {
  useState()
  return (
    <div>
      <div>
        <label htmlFor="">
          name
        <input type="text" value={storageHub.getItem('name') || ''} />
        </label>
        <button>write</button>
      </div>
      <div>
        <label htmlFor="">
          age
        <input type="number" value={storageHub.getItem('age') || ''} />
        </label>
        
        <button>write</button>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('app'))
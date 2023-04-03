
import './App.css';
import Weathwr from './Weatherapi/Weathwr';
import Daily from './Weatherapi/Daily';
import { createContext, useState } from 'react';
export const UserContext = createContext()
function App() {
  const [lat, setLat] = useState(22.5726);
  const [long, setLong] = useState(88.3639);
  return (
    <UserContext.Provider value={{lat, setLat,long, setLong}}>
    < div className='main'>
      <Weathwr/>
    <Daily/>
    </div>
    </UserContext.Provider>
  );
}

export default App;

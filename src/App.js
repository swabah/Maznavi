import React from 'react'
import Navbar from './components/navbar/Navbar';
import './App.css'
import {orginals,action} from './urls'
import Banner from './components/banner/Banner';
import RowPost from './components/rowpost/RowPost';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Banner  />
      <RowPost url={orginals} title="Netflix Originals" />
      <RowPost url={action} title="Action movies" isSmall />
    </div>
  );
}

export default App;

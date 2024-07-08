import React from 'react';
import './App.css';
import Header from './components/analysis/header/Header';
import Banner from './components/analysis/Banner/Banner';
import Memberinterestanalysis from './components/interest-analysis/Memberinterestanalysis';
import Testinterestanalysis from './components/interest-analysis/Testinterestanalysis';

function App() {
  return (
    <div className='App' >
     <Header />
     <Banner />
     <Memberinterestanalysis />
     <Testinterestanalysis />
    </div>
  );
}

export default App;

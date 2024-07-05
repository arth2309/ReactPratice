import React from 'react';
import './App.css';
import Header from './components/analysis/header/Header';
import Banner from './components/analysis/Banner/Banner';
import Memberinterestanalysis from './components/interest-analysis/Memberinterestanalysis';

function App() {
  return (
    <div className='App' >
     <Header />
     <Banner />
     <Memberinterestanalysis />
    </div>
  );
}

export default App;

import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Repositeries from './components/Repositeries';
import Profile from './components/Profile';
import ListContributors from './components/ListContributors';

function Pages() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Profile/>}/>
        <Route path="/repos/:params" element={<Repositeries />}/>
        <Route path='/clist' element={<ListContributors/>}/>
    </Routes>
    </>
  )
}

export default Pages;
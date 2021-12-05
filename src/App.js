import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from './pages/Gallery';
import Setting from './pages/Setting';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}
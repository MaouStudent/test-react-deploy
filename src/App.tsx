import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import BookView from "./pages/BookView";
import NotFound from "./pages/NotFound";
import ReadView from "./pages/ReadView";

export default function App(): JSX.Element {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/product" element={<BookView />} />
        <Route path="/read" element={<ReadView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import Home from '../pages/home'
import Categories from '../pages/categoryPage/categories'
export default function BudgetRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
    </Routes>
  )
}



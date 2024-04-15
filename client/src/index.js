import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login/Login';
import ProductView from './pages/ProductView/ProductView';
import ErrorPage from './pages/Errorpage/Errorpage'
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/Home/Home';
import CartPage from './pages/Cart/Cart';
import AdminPage from './pages/AdminPages/AdminPage';
import AdminAdd from './pages/AdminPages/AdminAdd/AdminAdd';
import AdminRemove from './pages/AdminPages/AdminRemove/AdminRemove';
import AdminEdit from './pages/AdminPages/AdminEdit/AdminEdit';
import EditProduct from './pages/AdminPages/AdminEdit/EditProduct';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "product/:productId",
    element: < ProductView />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "Cart",
    element: <CartPage />,
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
  {
    path: "admin/add",
    element: <AdminAdd />,
  },
  {
    path: "admin/remove",
    element: <AdminRemove />,
  },
  {
    path: "admin/edit",
    element: <AdminEdit />,
  },
  {
    path: "admin/edit/:id",
    element: <EditProduct />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

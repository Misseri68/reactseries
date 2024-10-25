import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Router from './Components/Router';
import $ from 'jquery';
import Popper from 'popper.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router></Router>
);


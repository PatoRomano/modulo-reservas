const express = require("express");
const app = express();
const tipoModel = require('../models/tipoModel');

const getTiposDeportes = async (req, res) => {
  const deportes = await tipoModel.getTiposDeportes();
  res.status(200).json(deportes);

};

const getTipos = async (req, res) => {
    const tipos = await tipoModel.getTipos();
    res.status(200).json(tipos);
  
  };
  
module.exports = {
    getTiposDeportes,
    getTipos
}
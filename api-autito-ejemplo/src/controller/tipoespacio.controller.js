const express = require("express");
const app = express();
const tipoModel = require('../models/tipoModel');

const getTiposDeportes = async (req, res) => {
  const deportes = await tipoModel.getTiposDeportes();
  res.status(200).json(deportes);

};

const getTiposDepartamentos = async (req, res) => {
  const departamentos = await tipoModel.getTiposDepartamentos();
  res.status(200).json(departamentos);

};

const getTiposSalones = async (req, res) => {
  const salones = await tipoModel.getTiposSalones();
  res.status(200).json(salones);

};

const getTipos = async (req, res) => {
    const tipos = await tipoModel.getTipos();
    res.status(200).json(tipos);
  
  };

  const setTipo = async (req, res) => {
    const tipos = await tipoModel.setTipo(req, res);
    res.status(200).json(tipos);
  };
  
module.exports = {
    getTiposDeportes,
    getTiposDepartamentos,
    getTiposSalones,
    getTipos,
    setTipo
}
const express = require("express");
const app = express();
const usuarioModel = require('../models/usuarioModel');

const getUsers = async (req, res) => {
  const usuarios = await usuarioModel.getUsers();
  res.status(200).json(usuarios);
};

const setUser = async (req, res) => {
  console.log("hola");
  const user = await usuarioModel.setUser(req, res);
  res.status(200).json(user);
};

const findOne = async (req, res) => {
    const id = req.params.id;
    const usuario = await usuarioModel.findOne(id)
    res.status(200).json(usuario);
}

module.exports = {
    getUsers,
    findOne,
    setUser
}
const { response, request } = require('express');
const Categoria = require('../models/categorias');
const getCategoria = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCategoria = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query),
    ]);

    res.json({
        msg: 'GET API de categoria',

        listaCategoria
    });

}
const postCategoria = async (req = request, res = response) => {

    const { nombre, proveedor, descripcion, seccion } = req.body;
    const categoriaDB = new Categoria({ nombre, proveedor, descripcion, seccion });

    await categoriaDB.save();

    res.json({
        msg: 'POST API de categoria',
        categoriaDB
    });

}

const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, seccion, ...resto } = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto)
    res.json({
        msg: 'PUT API de categoria',
        categoriaEditada
    });

}
const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoriaEliminada = await Categoria.findByIdAndDelete(id)

    res.json({
        msg: 'DELETE API de Categoria',
        categoriaEliminada
    });

}
module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}
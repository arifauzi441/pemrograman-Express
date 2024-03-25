const express = require(`express`);
const model_produk = require("../model/model_produk");
const model_kategori = require("../model/model_kategori");

const router = express.Router();

router.get(`/`, async (req,res,next) => {
    let rows = await model_produk.getAll();
    res.render(`produk/index`,{
        title: `Data produk`,
        data: rows
    });
})

router.get(`/create`, async (req,res,next) => {
    let rows = await model_kategori.getAll();
    res.render(`produk/create`,{
        title: `Create produk`,
        data: rows
    });
})

router.post(`/store`, async (req,res,next) => {
    try{
        let {nama_produk,harga_produk,id_kategori} = req.body;
        let data = {
            nama_produk,
            harga_produk,
            id_kategori
        }
        await model_produk.writeData(data);
        req.flash(`success`,`Berhasil menambahkan data`);
        res.redirect(`/produk`);
    }catch{
        req.flash(`error`,`terjadi kesalahan pada fungsi`);
        res.redirect(`/produk`);
    }
})

router.get(`/edit/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    let rows = await model_produk.editData(id);
    let data = await model_kategori.getAll();
    res.render(`produk/edit`,{
        data,
        id:             rows[0].id_produk,
        nama_produk:    rows[0].nama_produk,
        harga_produk:    rows[0].harga_produk,
    })
})

router.post(`/update/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    try{
        let {nama_produk,harga_produk,id_kategori} = req.body;
        let data = {
            nama_produk,
            harga_produk,
            id_kategori
        }
        await model_produk.updateData(id,data);
        req.flash(`success`,`Berhasil mengupdate data`);
        res.redirect(`/produk`);
    }catch{
        req.flash(`error`,`terjadi kesalahan pada fungsi`);
        res.redirect(`/produk`);
    }
})

router.get(`/delete/(:id)`, async (req,res,next) => {
    id = req.params.id;
    await model_produk.deleteData(id);
    req.flash(`success`,`Berhasil menghapus data`);
    res.redirect( `/produk`)
})
module.exports = router;
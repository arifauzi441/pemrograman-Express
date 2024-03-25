const express = require(`express`);
const router = express.Router();

const connection = require(`../config/database`);

const model_kategori = require(`../model/model_kategori`);

router.get(`/`, async function(req,res,next){
    let rows = await model_kategori.getAll();
    res.render(`kategori/index`,{
        data: rows
    });
});

router.get(`/create`, function(req, res, next){
    res.render(`kategori/create`);
});

router.post(`/store`, async function(req, res, next){
    try{
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        await model_kategori.writeData(data);
        req.flash(`success`,`Berhasil menambahkan data`);
        res.redirect(`/kategori`);
    }catch{
        req.flash(`error`,`terjadi kesalahan pada fungsi`);
        res.redirect(`/kategori`);
    }
})

router.get(`/edit/(:id)`, async function(req, res, next){
    let id = req.params.id;
    let rows = await model_kategori.editData(id);
    res.render(`kategori/edit`, {
        id:             rows[0].id_kategori,
        nama_kategori:  rows[0].nama_kategori
    })
})

router.post(`/update/(:id)`, async function(req, res, next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        await model_kategori.updateData(id,data);
        req.flash(`success`,`Berhasil mengubah data`);
        res.redirect(`/kategori`)
    }catch{
        req.flash(`error`,`Terjadi kesalahan pada fungsi`);
        res.redirect(`/kategori`);
    }
})

router.get(`/delete/(:id)`, async function(req, res, next){
    let id = req.params.id;
    await model_kategori.deleteData(id);
    req.flash(`success`,`Berhasil menghapus data`);
    res.redirect(`/kategori`);
})

module.exports = router;
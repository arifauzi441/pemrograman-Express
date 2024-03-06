const express = require(`express`);
const model_mahasiswa = require("../model/model_mahasiswa");
const router = express.Router();

router.get(`/`, async (req,res,next) => {
    let rows = await model_mahasiswa.getAll();
    res.render(`mahasiswa/index`,{
        data: rows
    });
})

router.get(`/create`, (req,res,next) => {
    res.render(`mahasiswa/create`);
})

router.post(`/store`, async (req,res,next) => {
    try{
        let {nrp,nama_depan,nama_belakang,jenis_kelamin,agama,umur,tinggi_badan,gol_darah,alamat,hobi,email,no_telpon,asal_sekolah,tahun_lulus} = req.body;
        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon,
            asal_sekolah,
            tahun_lulus
        };
        await model_mahasiswa.writeData(data);
        req.flash(`success`,`berhasil menambahkan data`);
        res.redirect(`/mahasiswa`);
    }catch{
        req.flash(`error`,`terjadi kesalahan pada fungsi`);
        res.redirect(`/mahasiswa`);
    }
})

router.get(`/edit/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    let rows = await model_mahasiswa.editData(id);
    res.render(`mahasiswa/edit`, {
        id: rows[0].id_mahasiswa,
        nrp:             rows[0].nrp,
        nama_depan:      rows[0].nama_depan, 
        nama_belakang:   rows[0].nama_belakang,
        jenis_kelamin:   rows[0].jenis_kelamin,
        agama:           rows[0].agama,
        umur:            rows[0].umur,
        tinggi_badan:    rows[0].tinggi_badan,
        gol_darah:       rows[0].gol_darah,
        alamat:          rows[0].alamat,
        hobi:            rows[0].hobi,   
        email:           rows[0].email,
        no_telpon:       rows[0].no_telpon,
        asal_sekolah:    rows[0].asal_sekolah,
        tahun_lulus:     rows[0].tahun_lulus
    });
})

router.post(`/update/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    try{
        let {nrp,nama_depan,nama_belakang,jenis_kelamin,agama,umur,tinggi_badan,gol_darah,alamat,hobi,email,no_telpon,asal_sekolah,tahun_lulus} = req.body;
        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telpon,
            asal_sekolah,
            tahun_lulus
        };
        await model_mahasiswa.updateData(id,data);
        req.flash(`success`,`berhasil mengubah data`);
        res.redirect(`/mahasiswa`);
    }catch{
        req.flash(`error`,`Terjadi kesalahan pada fungsi`);
        res.redirect(`/mahasiswa`);
    }
})

router.get(`/delete/(:id)`, async (req,res,next) => {
    let id = req.params.id;
    await model_mahasiswa.deleteData(id);
    req.flash(`success`,`berhasil menghapus data`);
    res.redirect(`/mahasiswa`);
})

module.exports = router;
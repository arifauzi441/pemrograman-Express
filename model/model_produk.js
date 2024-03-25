const connection = require(`../config/database`);

class model_produk{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query(`select * from produk a join kategori b on a.id_kategori=b.id_kategori order by a.id_produk desc`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                } 
            });    
        })
    };
    static async writeData(data){
        return new Promise((resolve, reject) => {
            connection.query(`insert into produk set ?`, data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    static async editData(id){
        return new Promise((resolve, reject) => {
            connection.query(`select * from produk where id_produk = ${id}`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
    static async updateData(id, data){
        return new Promise((resolve,reject) => {
            connection.query(`update produk set ? where id_produk = ${id}`, data, function(err,rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
    static async deleteData(id){
        return new Promise((resolve,reject) => {        
            connection.query(`delete from produk where id_produk = ${id}`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }
}

module.exports = model_produk;
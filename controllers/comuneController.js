import db from '../config/dataBaseOptions.js'
const createComune = (req, res) =>{
    const {comune, acronimo, cod_provincia, area_territoriale_id, cliente_id } = req.body
    var q = "INSERT INTO `comuni`(`comune`, `acronimo`, `cod_provincia`, `area_territoriale_id`) VALUES (?,?,?,?)"
    db.query(q, [comune, acronimo, cod_provincia, area_territoriale_id, cliente_id] , (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        q = "SELECT * FROM comune_cliente_rel WHERE comune_id = ?"
        db.query(q, [comune_id], (err, data) =>{
            if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
            const clienti_assegnati = data
            q="UPDATE `comune_cliente_rel` SET `active`= 0 WHERE comune_id = "+comune_id + ";"
            cliente_id.forEach(cliente =>{
                var cliente_copia = clienti_assegnati.find(cliente_assegnato => cliente_assegnato.cliente_id === cliente)
                if(cliente_copia) q += "UPDATE `comune_cliente_rel` SET `active`= 1 WHERE id = "+ cliente_copia.id + ";"
                else q += "INSERT INTO `comune_cliente_rel`(`cliente_id`, `comune_id`, `active`) VALUES ("+cliente+","+comune_id+", 1);"
            })
            db.query(q , (err, data)=>{
                if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server 2'})}
                return res.json({'error' : false, 'message' : 'Cliente aggiornato con successo'})
            })

        })
    })
}

const updateComune = (req, res) =>{
    const {comune_id, comune, acronimo, cod_provincia, area_territoriale_id, cliente_id } = req.body
    var q = "UPDATE `comuni` SET `comune`= ?,`acronimo`= ?,`cod_provincia`= ?,`area_territoriale_id`= ? WHERE comune_id = ?"
    db.query(q, [comune, acronimo, cod_provincia, area_territoriale_id, comune_id] , (err, data)=>{
        if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
        q = "SELECT * FROM comune_cliente_rel WHERE comune_id = ?"
        db.query(q, [comune_id], (err, data) =>{
            if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server'})}
            const clienti_assegnati = data
            q="UPDATE `comune_cliente_rel` SET `active`= 0 WHERE comune_id = "+comune_id + ";"
            cliente_id.forEach(cliente =>{
                var cliente_copia = clienti_assegnati.find(cliente_assegnato => cliente_assegnato.cliente_id === cliente)
                if(cliente_copia) q += "UPDATE `comune_cliente_rel` SET `active`= 1 WHERE id = "+ cliente_copia.id + ";"
                else q += "INSERT INTO `comune_cliente_rel`(`cliente_id`, `comune_id`, `active`) VALUES ("+cliente+","+comune_id+", 1);"
            })
            db.query(q , (err, data)=>{
                if(err) {console.log(err); return res.json({'error' : true, 'message' : 'Errore del Server 2'})}
                return res.json({'error' : false, 'message' : 'Cliente aggiornato con successo'})
            })

        })
    })
}
export { createComune, updateComune }
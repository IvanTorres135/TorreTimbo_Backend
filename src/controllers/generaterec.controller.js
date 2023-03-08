import {getConnection} from '../database/database.js';

const addGenerateRec = async (req,res)=>{
    try{
        console.log(req.body);
        const {inicio, fin} = req.body;
        if(inicio === undefined || fin === undefined){
            res.status(400).json({error: 'Missing parameters'});
            return;
        }
        //ENVIAR ERROR SI inicio y fin NO TIENE FORMATO DE FECHA
        const inicio1 = new Date(inicio);
        const fin1 = new Date(fin);
        const fechas = { inicio1, fin1 };
        //const connection = await getConnection();
        //const result = await connection.query('SELECT * FROM adm_consumoagua WHERE ano = ? AND mes = ? ',[ano,mes]);
        //res.json({"fecha_inicio": inicio, "fecha_fin": fin});
        res.json({"respuesta": "REGISTRADO"});
    }catch(e){
        res.status(500);
        res.send({error: e.message});
    }  
};


export const methods = {
    addGenerateRec
};
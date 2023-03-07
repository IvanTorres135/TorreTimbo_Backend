import {getConnection} from '../database/database.js';

const getConsumoAgua = async (req,res)=>{
    try{
        const {ano, mes} = req.params;
        if(ano === undefined || mes === undefined){
            res.status(400).json({error: 'Missing parameters'});
            return;
        }
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM adm_consumoagua WHERE ano = ? AND mes = ? ',[ano,mes]);
        res.json(result);
    }catch(e){
        res.status(500);
        res.send({error: e.message});
    }  
};


export const methods = {
    getConsumoAgua
};
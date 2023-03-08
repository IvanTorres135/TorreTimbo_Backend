import {getConnection} from '../database/database.js';

const getRecibodepa = async (req,res)=>{
    try{
        const {dpto} = req.params;
        if(dpto === undefined){
            res.status(400).json({error: 'Missing parameters'});
            return;
        }
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM adm_deuda WHERE departamento = ? AND estado = ? ',[dpto,"A"]);
        res.json(result);
    }catch(e){
        res.status(500);
        res.send({error: e.message});
    }  
};


export const methods = {
    getRecibodepa
};
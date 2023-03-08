import {getConnection} from '../database/database.js';

const getDatauser = async (req,res)=>{
    try{
        const {dpto} = req.params;
        if(dpto === undefined){
            res.status(400).json({error: 'Missing parameters'});
            return;
        }
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usu_user WHERE departamento = ? AND estado = ? ',[dpto,"A"]);
        res.json(result);
    }catch(e){
        res.status(500);
        res.send({error: e.message});
    }  
};


export const methods = {
    getDatauser
};
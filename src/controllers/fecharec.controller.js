import {getConnection} from '../database/database.js';

const getFechaRec = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM var_globales WHERE name = "recibo_ano" OR name = "recibo_mes" ');
        //modificar el json antes de mostrarlo
        var json = JSON.stringify(result);
        var obj = JSON.parse(json);
        //console.log(obj);
        var ano = obj[0].value;
        var mes = obj[1].value;
        //volver a mes de tipo numero
        mes = parseInt(mes);
        //validacion si el mes es 12, el año debe aumentar en 1
        if(mes == 12){
            ano = ano + 1;
            mes = 1;
        }else{
            mes = mes + 1;
        }
        //completar con ceros a la izquierda
        mes = mes.toString().padStart(2, "0");
        var result1 = {"ano": ano, "mes": mes};
        res.json(result1);
    }catch(e){
        res.status(500);
        res.send({error: e.message});
    }  
};


export const methods = {
    getFechaRec
};
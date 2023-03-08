import {getConnection} from '../database/database.js';

const addGenerateRec = async (req,res)=>{
    try{
        //console.log(req.body);
        const {inicio, fin} = req.body;
        if(inicio === undefined || fin === undefined){
            res.status(400).json({error: 'Missing parameters'});
            return;
        }
        //ENVIAR ERROR SI inicio y fin NO TIENE FORMATO DE FECHA
        const inicio1 = new Date(inicio).toISOString().slice(0, 10);
        const fin1 = new Date(fin).toISOString().slice(0, 10);
        //const fechas = { inicio1, fin1 };
        const connection = await getConnection();
        const result1 = await connection.query('SELECT * FROM var_globales WHERE name = "recibo_ano" OR name = "recibo_mes" ');
        //modificar el json antes de mostrarlo
        var json = JSON.stringify(result1);
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
        const result2 = await connection.query('SELECT * FROM adm_deudatorre WHERE ano = ? AND mes = ? AND enrecibo = ? AND estado = ? AND aplicado = ? ',[ano,mes,'S','A','N']);
        const result3 = await connection.query('SELECT * FROM adm_consumoagua WHERE ano = ? AND mes = ? ORDER BY id ',[obj[0].value,obj[1].value]);
        var json1 = JSON.stringify(result3);
        var obj1 = JSON.parse(json1);
        const result4 = await connection.query('SELECT * FROM adm_consumoagua WHERE ano = ? AND mes = ? ORDER BY id ',[ano,mes]);
        
        var json2 = JSON.stringify(result4);
        var obj2 = JSON.parse(json2);
        const result5 = await connection.query('SELECT * FROM var_globales WHERE name = "costo_m2agua" ');
        //modificar el json antes de mostrarlo
        var json3 = JSON.stringify(result5);
        var obj6 = JSON.parse(json3);
        //console.log(obj);
        var valueagua = obj6[0].value;
        //volver a mes de tipo numero
        valueagua = parseFloat(valueagua);
        //contar obj2
        var count1 = Object.keys(obj2).length;
        if(count1 != 64){
            res.status(400).json({error: 'No se puede generar el recibo, falta informacion de consumo de agua'});
            return;
        }
        //restar los valores de obj2.consumo - obj1.consumo y guardar en obj3.consumo
        var obj3 = [];
        for (var i = 0; i < obj2.length; i++) {
            var obj4 = {};
            obj4.id = i;
            obj4.departamento = obj2[i].departamento;
            obj4.mes = obj2[i].mes;
            obj4.ano = obj2[i].ano;
            obj4.consumo = obj2[i].consumo - obj1[i].consumo;
            obj4.costo = obj4.consumo * valueagua;
            obj3.push(obj4);
        }
        //console.log(obj3);
        const result6 = await connection.query('SELECT * FROM adm_multa WHERE ano = ? AND mes = ? AND aplicado = ? ',[ano,mes,'N']);
        //console.log({"ano": ano, "mes": mes});
        var json10 = JSON.stringify(result2);
        var obj10 = JSON.parse(json10);
        var count2 = Object.keys(obj10).length;
        if(count2 == 0 || count2 == undefined || count2 == null || count2 < 1){
            res.status(400).json({error: 'No se puede generar el recibo, falta informacion de gastos del mes'});
            return;
        }
        //console.log(obj10);
        var obj12 = [];
        for (var i = 0; i < obj10.length; i++) {
            var obj13 = {};
            obj13.id = i;
            obj13.idpropio = obj10[i].id;
            obj13.mes = obj10[i].mes;
            obj13.ano = obj10[i].ano;
            obj13.titulo = obj10[i].titulo;
            obj13.monto = parseFloat(obj10[i].monto);
            obj13.monto = obj13.monto / 64;
            //monto 2 decimales
            obj13.monto = obj13.monto.toFixed(2);
            obj12.push(obj13);
        }
        //console.log(obj12); GASTOS GENERALES
        //console.log(obj3); CONSUMO DE AGUA
        var json11 = JSON.stringify(result6);
        var obj11 = JSON.parse(json11);
        //console.log(obj11); MULTAS
        //array de numeros
        var array1 = ["101","102","103","104","201","202","203","204","301","302","303","304","401","402","403","404","501","502","503","504","601","602","603","604","701","702","703","704","801","802","803","804","901","902","903","904","1001","1002","1003","1004","1101","1102","1103","1104","1201","1202","1203","1204","1301","1302","1303","1304","1401","1402","1403","1404","1501","1502","1503","1504","1601","1602","1603","1604"];
        for(var i = 0; i < array1.length; i++){
            var conteototalvalor = 0.0;
            var obj14 = {};
            obj14.mes = mes;
            obj14.ano = ano;
            obj14.departamento = array1[i];
            obj14.fecha_emision = inicio1;
            obj14.fecha_cierre = fin1;
            obj14.monto = 0.0;
            obj14.deuda = 0.0;
            obj14.estado = 'A';
            obj14.fec_reg = new Date().toISOString().slice(0, 10);
            obj14.user_reg = 'admin';
            await connection.query('INSERT INTO adm_deuda SET ? ',obj14);
            const result7 = await connection.query('SELECT * FROM adm_deuda ORDER BY id DESC LIMIT 1');
            var json14 = JSON.stringify(result7);
            var obj14 = JSON.parse(json14);
            var generalid = obj14[0].id;
            for(var j = 0; j < obj12.length; j++){
                var obj15 = {};
                obj15.rhead = obj12[j].idpropio;
                obj15.titulo = obj12[j].titulo;
                obj15.monto = obj12[j].monto;
                conteototalvalor = conteototalvalor + parseFloat(obj12[j].monto);
                //console.log(conteototalvalor);
                await connection.query('INSERT INTO adm_recbody SET ? ',obj15);
                const result8 = await connection.query('SELECT * FROM adm_recbody ORDER BY id DESC LIMIT 1');
                var json15 = JSON.stringify(result8);
                var obj16 = JSON.parse(json15);
                var obj17 = {};
                obj17.id_deuda = generalid;
                obj17.tipo = "G";
                obj17.id_detail = obj16[0].id;
                await connection.query('INSERT INTO adm_detail(id_deuda, tipo, id_detail) VALUES (?,?,?) ',[obj17.id_deuda,obj17.tipo,obj17.id_detail]);
            }
            for(var j = 0; j < obj3.length; j++){
                if(array1[i] == obj3[j].departamento){
                    var obj18 = {};
                    obj18.mes = mes;
                    obj18.ano = ano;
                    obj18.departamento = array1[i];
                    obj18.consumo_real = obj3[j].consumo;
                    obj18.monto = obj3[j].costo;
                    conteototalvalor = conteototalvalor + parseFloat(obj3[j].costo);
                    //console.log(conteototalvalor);
                    await connection.query('INSERT INTO adm_aguarec SET ? ',obj18);
                    const result9 = await connection.query('SELECT * FROM adm_aguarec ORDER BY id DESC LIMIT 1');
                    var json18 = JSON.stringify(result9);
                    var obj19 = JSON.parse(json18);
                    var obj20 = {};
                    obj20.id_deuda = generalid;
                    obj20.tipo = "A";
                    obj20.id_detail = obj19[0].id;
                    await connection.query('INSERT INTO adm_detail(id_deuda, tipo, id_detail) VALUES (?,?,?) ',[obj20.id_deuda,obj20.tipo,obj20.id_detail]);
                }
            }
            for(var j = 0; j < obj11.length; j++){
                if(array1[i] == obj11[j].departamento){
                    var obj23 = {};
                    obj23.id_deuda = generalid;
                    obj23.tipo = "M";
                    obj23.id_detail = obj11[0].id;
                    conteototalvalor = conteototalvalor + parseFloat(obj11[j].monto);
                    //console.log(conteototalvalor);
                    await connection.query('INSERT INTO adm_detail(id_deuda, tipo, id_detail) VALUES (?,?,?) ',[obj23.id_deuda,obj23.tipo,obj23.id_detail]);
                }
            }
            console.log(array1[i] + " " + conteototalvalor.toFixed(2));
            var obj24 = {};
            obj24.monto = conteototalvalor.toFixed(2);
            obj24.deuda = conteototalvalor.toFixed(2);
            await connection.query('UPDATE adm_deuda SET ? WHERE id = ? limit 1 ',[obj24,generalid]);
            //console.log(obj14);
        }
        
        //resta de resultados result4 - result3

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
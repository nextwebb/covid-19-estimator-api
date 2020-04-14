const Estimator = require('../models/Estimator');
const convert = require('xml-js'); 
const logsCollection = require('../db').db().collection('logs')
const fs = require('fs');


exports.estimate =  function(req, res){
    let format = req.params.dataType;
        format = format.toString().toLowerCase();

    if(format === 'json'){
        let data = req.body;
        let resturnedEstimation = Estimator(data);
        return res.json(resturnedEstimation);

    } else if( format === 'xml') {
        let data = req.body;
        let resturnedEstimation = Estimator(data);
        res.header('Content-Type', 'application/xml');
        res.header('charset', 'UTF-8')
        let options = {compact: true, ignoreComment: true, spaces: 4};
        let result = convert.json2xml(resturnedEstimation, options);
        console.log(result);
        res.send(result)
    } 

}






exports.estimateDefault =  function(req, res){

        let data = req.body;
        let resturnedEstimation = Estimator(data);
        return res.json(resturnedEstimation);

}


exports.getAllLogs = async function(req, res){

                 let allLogs = await logsCollection.find({}).toArray() 
                 
                let array = allLogs.map((element, index, array)=>{
                    return element.message
                })
                res.header('Content-Type', 'text/plain');
                res.header('charset', 'UTF-8');
                console.log(array.toString().split(",").join("\n \n"));
                res.send(array.toString().split(",").join("\n \n"));
                   
}
       
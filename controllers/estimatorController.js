const Estimator = require('../models/Estimator');
const o2x = require('object-to-xml');
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
        let resturnedEstimation = o2x(Estimator(data));
        return res.json(resturnedEstimation);
    } 

}

exports.estimateDefault =  function(req, res){

        let data = req.body;
        let resturnedEstimation = Estimator(data);
        return res.json(resturnedEstimation);

}


exports.getAllLogs = async function(req, res){

                //  let allLogs = await logsCollection.find({}).toArray() 
                 
                // let array = allLogs.map((element, index, array)=>{
                //     return element.message
                // })
                // array.forEach((element, index, array) => {
                //     console.log(element);
                //     res.send(element);
                //     fs.writeFile("data.log", element, function(err) {
                //         if(err) {
                //             return console.log(err);
                //         }
                //         console.log("The file was saved!");
                //     }); 
                // } )

                
                fs.readFile('info.log', function(err, data) {
                   if(!err){
                       res.send(data)
                   }
                  });
             


                   
}
       
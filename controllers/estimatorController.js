const Estimator = require('../models/Estimator');
const o2x = require('object-to-xml');

exports.estimate = async function(req, res){
    let format = req.params.dataType;
        format = format.toString().toLowerCase();

    if(format === 'json'){
        let data = req.body;
        let resturnedEstimation = Estimator(data);
        res.json(resturnedEstimation);

    } else if( format === 'xml') {
        let data = req.body;
        let resturnedEstimation = o2x(Estimator(data));
        res.json(resturnedEstimation);
    }
        else if (format === 'logs'){
            // logs
            res.json({
                "logs" :"More logs"
            })
        }
    else {
     res.json({'wrong':'format!'})   
    }
}
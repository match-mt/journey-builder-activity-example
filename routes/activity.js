'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
var axios = require('axios');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
       // alert("Save");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {


        // Decodando o JWT por aqui -- DEPOIS PASSAR PARA MODULO
         var jwtSimple = require("jsonwebtoken");
         var appSignature = '';
         var body = jwtSimple.decode(req.body, appSignature);

         // Buscando BINDs da plataforma.
         var inArguments = {};
         for(var i in body.inArguments) {
             for(var s in body.inArguments[i]) {
                 inArguments[s] = body.inArguments[i][s]
            }
        }
        // Buscando no objeto as keys
        var message = inArguments.message;
        var phone = inArguments.phone;
        console.log('>>>>> message: ' + message );
        console.log('>>>>> phone: ' + phone );

        // Variavel para API - Necessário passar para json
        let data = ({
            "destinations": [{
                                "correlationId": "MyCorrelationId",
                                "destination": phone
                            }],
            "message": {
                "messageText": message,
            },
        });

        let xdata = ({ 
                       message 
                     });


    //Chamada API
    axios({
      method: 'get',
      url: "https://panel.apiwha.com/send_message.php?apikey=N5WVF2I&number="+phone+"&text= "+message,
      data: data,
      headers: {'UserName': '',
                'AuthenticationToken': '',
                'Content-Type': 'application/json'}
    }).then( (res) => {
        console.log("Success -->" , res);
    } )
    .catch( (error) => {
        console.log("Erro --> ", error);
    } );


};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
   // alert("Publish");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );

    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
   // alert("Validate");
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
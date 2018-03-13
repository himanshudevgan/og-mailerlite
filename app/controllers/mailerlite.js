
const request = require('async-request')
// const mlapikey = process.env.mlapikey;
// const ogapikey= process.env.ogapikey;
const https = require('https');
const Calcgroup = require('./../models/calcgroup')
const Log = require('./../models/log');
const Apikey = require('./../models/apikey');
const apihelper = require('./../helper/api');

const mailer = {

    index: async (req, res, next) => {
        try {
            let apikey = await apihelper.getapi();
            let reqs = await request('https://outgrow-api.herokuapp.com/api/v1/calculator?status=LIVE&type=Both&sort=alpha_asc', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'API-Key': apikey.ogapikey
                }
            });
            let calc = req ? JSON.parse(reqs.body).data : [];
            reqs = await request('https://api.mailerlite.com/api/v2/groups', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'X-MailerLite-ApiKey': apikey.mlapikey
                }
            });
            if(JSON.parse(reqs.body).error) {
                throw JSON.parse(reqs.body).error;
            }
            let linkData = await Calcgroup.find({active: true})
            res.render('pages/index', {groups: reqs ? JSON.parse(reqs.body):  [], calcs: calc,linkdata:linkData? linkData: []});
        } catch (error) {
            res.render('pages/index', {groups: [], calcs: [],linkdata:[]});
        }
    },
    link: async (req, res, next) => {
        try {
            let calcgroup = new Calcgroup(req.body);
            let group = await calcgroup.save();
            res.status(200).json(group);
        } catch (err) {
            console.log(err);
        }
    },
    changekey: async (req, res, next) => {
        try {
            let apikey = await Apikey.findOne({});
            if(apikey) {
                if(req.body.mlapikey && req.body.ogapikey) {
                    apikey.mlapikey = req.body.mlapikey;
                    apikey.ogapikey = req.body.ogapikey;
                } else if(req.body.mlapikey) {
                    apikey.mlapikey = req.body.mlapikey;
                } else if(req.body.ogapikey) {
                    apikey.ogapikey = req.body.ogapikey;
                }
            } else {
                apikey = new Apikey(req.body);
            }
            await apikey.save();
            res.status(200).json(apikey)
        } catch (err) {
            console.log(err);
        }
    },
    addsubscribertogroup: async (req, res, next) => {
        try {
                let apikey = await apihelper.getapi();
                let data = req.body
                let lead = JSON.parse(JSON.stringify(data));
                lead['fields'] = data;
                console.log('********************');
                console.log(lead);
                console.log('********************');
                let calcgroup = await Calcgroup.findOne({parentapp:data.appId},{mlgid:1});
                if(calcgroup) {
                    let reqs = await request('https://api.mailerlite.com/api/v2/groups/'+calcgroup.mlgid+'/subscribers', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-MailerLite-ApiKey': apikey.mlapikey
                        },
                        data: lead
                    });
                    let logdata = {
                        request:JSON.stringify(data),
                            response:reqs.body
                    }
                    let log = new Log(logdata);
                    await log.save();
                    res.status(200).json(reqs.body);
                } else {
                    res.status(200).json({message: "nothing was serve just testing"});
                }
            } catch (error) {
                console.log(error)
            }
        },

        deleteLink: async (req, res, next) => {
            try {
                console.log('req.params.id', req.params.id);
                let remove = await Calcgroup.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {active: false}
                });
                res.status(200).json(remove);
             } catch (error) {
                console.log('errrrr', error)
            }
        },
};

module.exports = mailer; 
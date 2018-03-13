
const request = require('async-request')
// const mlapikey = process.env.mlapikey;
// const ogapikey= process.env.ogapikey;
const https = require('https');
const Calcgroup = require('./../models/calcgroup');
const Apikey = require('./../models/apikey');
const apihelper = require('./../helper/api');

const mailer = {

    index: async (req, res, next) => {
        try {
            let apikey = await apihelper.getapi();
            console.log("---------------------",apikey)
            let reqs = await request('https://outgrow-api.herokuapp.com/api/v1/calculator?status=LIVE&type=Both&sort=alpha_asc', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'API-Key': apikey.ogapikey
                }
            });
            let calc = JSON.parse(reqs.body).data;
            console.log(JSON.parse(reqs.body).data)
            reqs = await request('https://api.mailerlite.com/api/v2/groups', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'X-MailerLite-ApiKey': apikey.mlapikey
                }
            });
            let linkData = await Calcgroup.find({active: true})
            res.render('pages/index', {groups: JSON.parse(reqs.body), calcs: calc,linkdata:linkData});
        } catch (error) {
            console.log(error)
        }
    },
    link: async (req, res, next) => {
        try {
            let calcgroup = new Calcgroup(req.body);
            await calcgroup.save();
            let groups = await Calcgroup.find({active: true});
            res.status(200).json(groups)
        } catch (err) {
            console.log(err);
        }
    },
    changekey: async (req, res, next) => {
        try {
            let apikey = await Apikey.findOne({});
            if(apikey) {
                apikey.mlapikey = req.body.mlapikey;
                apikey.ogapikey = req.body.ogapikey;
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
                let calcgroup = await Calcgroup.findOne({calcPid:data.calcPid},{mlgid:1})
                console.log(calcgroup)
                let reqs = await request('https://api.mailerlite.com/api/v2/groups/'+calcgroup.mlgid+'/subscribers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'X-MailerLite-ApiKey': apikey.mlapikey
                    },
                    data: data.lead
                });
                res.status(200).json(reqs.body);
            } catch (error) {
                console.log(error)
            }
        }
};

module.exports = mailer; 
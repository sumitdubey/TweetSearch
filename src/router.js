var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 5555;
var router = express.Router();
var Twitter = require('node-twitter');
 
router.use(bodyParser.urlencoded({extended: true }));
router.use(bodyParser.json());
 
/*var twitterRestClient = new Twitter.RestClient(
    'CONSUMER_KEY',
    'CONSUMER_SECRET',
    'TOKEN',
    'TOKEN_SECRET'
);*/
var twitterSearchClient  = new Twitter.SearchClient(
    '0ETaFEnqWNxWii4C6Q55yBNBz',
    'lLSON5I0DhSHKtC1hlTszwXp0h2Uo4uWSALFaJ7ZrPfvMpV5bx',
    '3145308502-JV6LqIiRKQzwrdXFP8fChdIN0RlTbRirm9K5SMV',
    'duoQnfFipg1w0ErzVJwGoI7kCTUXNm8Cx82Bp3dId9TnN'
);

router.get('/:keyword',function(req, res){
twitterSearchClient.search({'q': req.params.keyword, since:req.query.since, count:100,}, function(error, result) {
    if (error)
    {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }
 
    if (result)
    {
		//res.json({message:'Welcome to our APP...'});
		res.json(result);
        console.log(result);
    }
});

});

module.exports = router; 
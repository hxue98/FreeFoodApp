const AWS = require(`aws-sdk`);
const Hashes = require('jshashes');
const JWT = require('jsonwebtoken');
const FS = require('fs');

const privateKey = FS.readFileSync(__dirname + '\/private.key');
const expiresIn = '7d';

AWS.config.update({region: `us-east-1`});
const db = new AWS.DynamoDB.DocumentClient();

const ACCOUNT_TABLE_NAME = 'Account';
const COMMENT_TABLE_NAME = "Comment";

exports.handler = async function(event, context) {
    //for debug use
    console.log('debug start');

    const data = JSON.parse(event.body);
    console.log('data: ', data);

    switch(data.operation) {

        case 'REGISTER': {
            console.log("register-event");
            let Item = {
                userId: data.params.userId,
                password: data.params.password
            };
            Item.password = applySalt(Item.password, Item.userId);

            //check if user exists
            let user = await getUser(Item.userId);
            if (user !== undefined) {
                console.log('user exists');
                return sendResponse(null, false);
            }

            //put into db
            db.put({TableName: ACCOUNT_TABLE_NAME, Item}, function (err, data) {
                if (err) {
                    console.log(`error`, err);
                    return sendResponse(null, false);
                } else {
                    return sendResponse(null, true);
                }
            });
            console.log('user added to db: ', Item);
            return sendResponse(null, true);
        }

        case 'LOGIN': {
            console.log("login-event");
            let Item = {
                userId: data.params.userId,
                password: data.params.password
            };
            Item.password = applySalt(Item.password, Item.userId);

            //check if user not exists
            let user = await getUser(Item.userId);

            if (user === undefined) {
                console.log('user does not exist');
                return sendResponse(null, false);
            }

            if (user.password === Item.password) {
                const token = JWT.sign({userId: user.userId}, privateKey, {expiresIn: expiresIn});
                return sendResponse({token: token}, true);
            }
            return sendResponse(null, false);
        }

        case 'CHECKTOKEN': {
            console.log("check-token");
            const decoded = JWT.verify(data.params.token, privateKey);
            if (decoded) {
                return sendResponse({userId: decoded.userId}, true);
            }
            return sendResponse(null, false);
        }

        case 'GETCOMMENTS': {
            console.log("get-comments-event");
            let comments = await getComments(data.params.eventId);
            return sendResponse({comments: comments}, true);
        }

        default: {
            console.log("missing operation");
            return sendResponse(null, false);
        }
    }
};



//------------------------------------helper functions------------------------------//

function applySalt(passwordHash, userId) {
    //append hashed username to password hash
    passwordHash += new Hashes.SHA1().b64(userId);
    //rehash
    return new Hashes.SHA1().b64(passwordHash);
}

async function getUser(userId) {
    const query = {
        Key: {
           userId: userId
        },
        TableName: ACCOUNT_TABLE_NAME
    };
    var user;
    await db.get(query, function(err, data) {
        if (err) {
            console.log(`error`, err);
        }
        user = data.Item;
    }).promise();
    return user;
}

async function getComments(eventId) {
    const query = {
        TableName: COMMENT_TABLE_NAME
    };
    var comments;
    await db.scan(query, function(err, data) {
        if (err) {
            console.log(`error`, err);
        }
        comments = data.Items;
    }).promise();
    return comments.filter(comment => comment.eventId === eventId);
}

function sendResponse(body, success) {
    var response = {
        headers: {'Content-Type': 'application/json'},
        statusCode: 200,
        body: body ? body : {}
    };
    response.body.success = success;
    response.body = JSON.stringify(response.body);
    console.log('debug end');
    return response;
}
/**
 * Created by juwoong on 15. 11. 1..
 */
var mongoose = require('mongoose');
var request = require('co-request');

function* facebookAuth(doc) {
    while(true) {
        var uri_token = "https://graph.facebook.com/debug_token?input_token=" + doc.userAccessToken +
            "&client_id=" + authInfo.facebook.FACEBOOK_APP_ID +
            "&access_token=" + authInfo.facebook.FACEBOOK_APP_TOKEN +
            "&redirect_uri=http://thedeblur.com:4445";

        //Access token을 이용하여 Facebook user id를 받아온다.
        try {
            var token_result = yield request(uri_token);
            token_result = JSON.parse(token_result.body);
        } catch (e) {
            log.error('/user/auth : ' + e);
            log.error(e.stack);
            continue;
        }
        break;
    }

    //Facebook Debug Token 문제. 옳지 않은 토큰입니다.

    if (token_result.data === undefined) {
        log.error("/user/auth : 옳지 않은 토큰입니다. " + token_result.error);
        return 400;
    }

    //옳은 토큰이나, 유저와 일치하는 토큰이 아님.
    if(token_result.data.user_id != doc.userId) {
        log.error("/user/auth) : 받은 토큰이 유저와 일치하지 않습니다.");
        return 400;
    }

    var uri_info = "https://graph.facebook.com/" + doc.userId +
        "?access_token=" + doc.userAccessToken;
    //User 정보 가져오기
    var user_info = yield request(uri_info);
    user_info = JSON.parse(user_info.body);
    //유저 이름을 가져올 수 없음.
    if(user_info.name===undefined) {
        log.error("/user/auth : 유저 정보를 받아올 수 없습니다.");
        return 500;
    }

    user_info.profileImage = 'https://graph.facebook.com/'+doc.userId+'/picture?type=large';

    return user_info;
}


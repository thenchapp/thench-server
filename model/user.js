var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    name    : String,           //사용자의 이름
    email   : String,           //사용자의 이메일
    pwd     : String,           //사용자의 비밀번호 (MD5!)
    social  : {                 //소셜 정보 TODO: 향후 사용시 Refreshtoken이 필요한지 알아보고 정한다.
        id  : String,           //페이스북 사용자 아이디
    },
    profileImage : String,       //페이스북 등록시 (다른 사용자들에게) 보여질 이미지. >> 향후 확장가능성을 위해서.
    diaries : [embedDiary],
});

module.exports = mongoose.model('user', user);
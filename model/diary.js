/**
 * Created by juwoong on 15. 10. 25..
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var embedDiary = new Schema({
    diaryId : {type : Schema.ObjectId, ref : 'diary'},
    image : String,
    title : String,
    subtitle : String
});

//TODO: 그룹 / 공유하는 친구들 회의해서 추가하기
var Diary = new Schema({
    title : String,          //다이어리 제목
    createAt : Date,         //다이어리 생성 시간
    createBy : {type : Schema.ObjectId, ref : 'user'},
    image : String,          //이미지 주소
    body : [{
        order : Number,      //문단 번호
        main : String,       //중심 문단
        sub : [String]       //세부 문단
    }]
});

module.exports.diary = mongoose.model('diary', Diary);
module.exports.emb_diary = mongoose.model('embedDiary', embedDiary);
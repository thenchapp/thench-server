/**
 * Created by juwoong on 15. 10. 25..
 */
var mongoose = require('mongoose');
var model = require('./model');
var Logger = require('./lib/logger');

global.log = new Logger('thench');
global.setting = require('./setting');

mongoose.connect(setting.mongo.url);

require('./app');

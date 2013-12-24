var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
        name: String,
        password: String,
        photo: String,
        _followPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        _followSchools: [{ type: Schema.Types.ObjectId, ref: 'School' }]
});

var User = mongoose.model('User', userSchema);
exports.User = User;

var schoolSchema = new Schema({
        _buildings: [{ type: Schema.Types.ObjectId, ref: 'Building' }],
        picture: String,
        est: Number,
        students: Number,
        ratio: String,
        name: String
});

var School = mongoose.model('School', schoolSchema);
exports.School = School;

var buildingSchema = new Schema({
        name: String,
        location: String,
        picture: String,
        comments: [{ type: Schema.Types.ObjectId, ref: 'user', comment: String }]
});

var Building =mongoose.model('Building', buildingSchema);
exports.Building = Building;


var photoSchema = new Schema({
        url: String,
        location: { type: Schema.Types.ObjectId, ref: 'School' },
        Building: { type: Schema.Types.ObjectId, ref: 'Building' },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Photo =mongoose.model('Photo', buildingSchema);
exports.Building = Building;
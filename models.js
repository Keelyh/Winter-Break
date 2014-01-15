var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
        name: String,
        password: String,
        picture: String,
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
        // school: { type: Schema.Types.ObjectId, ref: 'School' },
        _photos: [{ type: Schema.Types.ObjectId, ref: 'Photo'}],//, comment: String }],
        picture: String,
        type: String,
        _comments: [{
                comment: String,
                user: {type: Schema.Types.ObjectId, ref: 'User'},
                posted:  {type: Date, default: Date.now},
                }]
});

var Building =mongoose.model('Building', buildingSchema);
exports.Building = Building;


var photoSchema = new Schema({
        picture: String,
        caption: String,
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        location: { type: Schema.Types.ObjectId, ref: 'School' },
        building: { type: Schema.Types.ObjectId, ref: 'Building' },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var Photo =mongoose.model('Photo', photoSchema);
exports.Photo = Photo;
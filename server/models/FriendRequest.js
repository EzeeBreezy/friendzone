const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
   accepted: { type: Boolean, default: false },
   from: [{ type: Types.ObjectId, ref: 'User' }],
   to: [{ type: Types.ObjectId, ref: 'User' }],
})

module.exports = model('FriendRequest', schema)

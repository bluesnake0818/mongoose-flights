import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

// const schemaOptions = {
//   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
// };

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: () => new Date(+new Date() + 365*24*60*60*1000)
  }
}, {
    timestamps: true  
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttendeeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent' },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

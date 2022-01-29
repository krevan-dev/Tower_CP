import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttendeeSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
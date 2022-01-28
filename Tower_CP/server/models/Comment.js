import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    body: { type: String, required: true }
  }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

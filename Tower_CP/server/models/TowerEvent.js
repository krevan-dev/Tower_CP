import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerEventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCancelled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['Concert', 'Convention', 'Sport', 'Digital'], required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

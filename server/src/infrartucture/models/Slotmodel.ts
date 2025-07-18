import { Schema, model } from "mongoose";
import { ISlot } from "../../domain/entities/Slot";

const SlotSchema = new Schema<ISlot>({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  day: { type: String, required: true },
  slots: [
    {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  ],
});

export const SlotModel = model<ISlot>("Slot", SlotSchema);

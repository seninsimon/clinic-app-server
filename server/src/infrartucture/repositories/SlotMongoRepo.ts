// src/infrastructure/database/repositories/SlotRepoImpl.ts

import { SlotRepository } from "../../domain/repositories/SlotRepository";
import { ISlot } from "../../domain/entities/Slot";
import { SlotModel } from "../models/Slotmodel";

export class SlotRepoImpl implements SlotRepository {
  async addSlot(slot: ISlot): Promise<ISlot> {
    return await SlotModel.create(slot);
  }

  async updateSlot(day: string, doctorId: string, slots: ISlot["slots"]): Promise<ISlot> {
    const updated = await SlotModel.findOneAndUpdate(
      { doctor: doctorId, day },
      { slots },
      { new: true, upsert: true }
    );
    return updated!;
  }

  async getSlotByDay(doctorId: string, day: string): Promise<ISlot | null> {
    return await SlotModel.findOne({ doctor: doctorId, day });
  }

  async deleteSlotByDay(doctorId: string, day: string): Promise<boolean> {
    const result = await SlotModel.deleteOne({ doctor: doctorId, day });
    return result.deletedCount === 1;
  }


}

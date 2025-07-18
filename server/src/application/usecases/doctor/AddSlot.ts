// src/application/usecases/doctor/SetSlot.ts

import { SlotRepository } from "../../../domain/repositories/SlotRepository";
import { ISlot } from "../../../domain/entities/Slot";

export class SetSlot {
  constructor(private slotRepo: SlotRepository) {}

  async execute(doctorId: string, day: string, slots: ISlot["slots"]): Promise<ISlot> {
    return await this.slotRepo.updateSlot(day, doctorId, slots);
  }
}

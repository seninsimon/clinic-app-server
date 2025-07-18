// src/application/usecases/slot/DeleteSlot.ts

import { SlotRepository } from "../../../domain/repositories/SlotRepository";

export class DeleteSlot {
  constructor(private slotRepo: SlotRepository) {}

  async execute(day: string, doctorId: string): Promise<boolean> {
    if (!day || !doctorId) {
      throw new Error("Day and doctor ID must be provided");
    }

    const result = await this.slotRepo.deleteSlotByDay(doctorId, day);
    return result; // true if deleted, false if nothing found
  }
}

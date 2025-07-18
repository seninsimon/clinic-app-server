// src/application/usecases/slot/GetSlotByDay.ts
import { SlotRepository } from "../../../domain/repositories/SlotRepository";
import { ISlot } from "../../../domain/entities/Slot";

export class GetSlotByDay {
  constructor(private slotRepo: SlotRepository) {}

  async execute(doctorId: string, day: string): Promise<ISlot | null> {
    return await this.slotRepo.getSlotByDay(doctorId, day);
  }
}

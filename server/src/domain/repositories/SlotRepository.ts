// src/domain/repositories/SlotRepository.ts

import { ISlot } from "../entities/Slot";

export interface SlotRepository {
  addSlot(slot: ISlot): Promise<ISlot>;
  updateSlot(day: string, doctorId: string, slots: ISlot["slots"]): Promise<ISlot>;
  getSlotByDay(doctorId: string, day: string): Promise<ISlot | null>;
  deleteSlotByDay(doctorId: string, day: string): Promise<boolean>;
}

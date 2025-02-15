import { Booking } from "../../entities/booking";

export interface ICancellationStrategy {
  canApply(diffDays: number): boolean;
  execute(booking: Booking): void;
}

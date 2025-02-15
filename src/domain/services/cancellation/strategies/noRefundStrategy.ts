import { Booking } from "../../../entities/booking";
import { BookingStatus } from "../../../entities/booking";
import { ICancellationStrategy } from "../ICancellationStrategy";

export class NoRefundStrategy implements ICancellationStrategy {
  canApply(daysBeforeCheckIn: number): boolean {
    return daysBeforeCheckIn <= 1; // 1 dia (24 horas) ou menos
  }

  execute(booking: Booking): void {
    booking.updateStatus(BookingStatus.CANCELLED);
  }
}

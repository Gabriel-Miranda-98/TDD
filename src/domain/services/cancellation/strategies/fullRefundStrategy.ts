import { Booking } from "../../../entities/booking";
import { BookingStatus } from "../../../entities/booking";
import { ICancellationStrategy } from "../ICancellationStrategy";

export class FullRefundStrategy implements ICancellationStrategy {
  canApply(diffDays: number): boolean {
    return diffDays > 6;
  }

  execute(booking: Booking): void {
    booking.updateStatus(BookingStatus.CANCELLED);
    booking.updateTotalPrice(0);
  }
}

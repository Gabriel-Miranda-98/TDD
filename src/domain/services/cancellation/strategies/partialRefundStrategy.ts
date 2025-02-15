import { Booking } from "../../../entities/booking";
import { BookingStatus } from "../../../entities/booking";
import { ICancellationStrategy } from "../ICancellationStrategy";

export class PartialRefundStrategy implements ICancellationStrategy {
  private readonly REFUND_PERCENTAGE = 0.5;

  canApply(diffDays: number): boolean {
    return diffDays >= 2 && diffDays <= 6;
  }

  execute(booking: Booking): void {
    booking.updateStatus(BookingStatus.CANCELLED);
    const refundAmount = booking.totalPrice * this.REFUND_PERCENTAGE;
    booking.updateTotalPrice(refundAmount);
  }
}

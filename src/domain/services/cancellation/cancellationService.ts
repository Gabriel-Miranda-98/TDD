import { Booking, BookingStatus } from "../../entities/booking";
import { CancellationStrategyFactory } from "./cancellationStrategyFactory";

export class CancellationService {
  cancel(booking: Booking, currentDate: Date): void {
    this.validateCancellation(booking, currentDate);

    const diffDays = this.calculateDiffDays(booking.dateRange.startDate, currentDate);
    const strategy = CancellationStrategyFactory.getStrategy(diffDays);

    strategy.execute(booking);
  }

  private validateCancellation(booking: Booking, currentDate: Date): void {
    if (booking.status === BookingStatus.CANCELLED) {
      throw new Error('A Reserva já está cancelada');
    }

    if (currentDate >= booking.dateRange.startDate) {
      throw new Error('Não é possível cancelar a reserva, o check-in já foi realizado');
    }
  }

  private calculateDiffDays(startDate: Date, currentDate: Date): number {
    return Math.ceil(
      Math.abs(startDate.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }
}

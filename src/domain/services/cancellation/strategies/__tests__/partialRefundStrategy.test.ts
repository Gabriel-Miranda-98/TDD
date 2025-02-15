import { Booking, BookingStatus } from "../../../../entities/booking";
import { Property } from "../../../../entities/property";
import { User } from "../../../../entities/user";
import { DateRange } from "../../../../value_objects/dateRange";
import { PartialRefundStrategy } from "../partialRefundStrategy";

describe('PartialRefundStrategy', () => {
  const strategy = new PartialRefundStrategy();

  it('should apply for cancellations between 2 and 6 days before', () => {
    expect(strategy.canApply(2)).toBeTruthy();
    expect(strategy.canApply(6)).toBeTruthy();
    expect(strategy.canApply(4)).toBeTruthy();
  });

  it('should not apply for cancellations less than 2 or more than 6 days before', () => {
    expect(strategy.canApply(1)).toBeFalsy();
    expect(strategy.canApply(7)).toBeFalsy();
  });

  it('should update booking status to cancelled and apply 50% refund', () => {
     const property=  new Property({
              id: '1',
              title: 'Casa de Praia',
              description: 'Casa de praia com 4 quartos',
              basePricePerNight: 100,
              maxGuests: 8
            })
            const user = new User({
              id: '1',
              name: 'John Doe'
            })
            const booking = new Booking(
              {
                id: '1',
               property:property,
               user:user,
                dateRange: new DateRange(new Date('2024-02-01'), new Date('2024-02-06')),
                guestsCount: 1,
              }

            );

    strategy.execute(booking);

    expect(booking.status).toBe(BookingStatus.CANCELLED);
    expect(booking.totalPrice).toBe(250);
  });
});

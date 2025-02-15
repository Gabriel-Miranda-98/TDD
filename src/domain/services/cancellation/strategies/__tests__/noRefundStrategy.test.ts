import { Booking, BookingStatus } from "../../../../entities/booking";
import { Property } from "../../../../entities/property";
import { User } from "../../../../entities/user";
import { DateRange } from "../../../../value_objects/dateRange";
import { NoRefundStrategy } from "../noRefundStrategy";

describe('NoRefundStrategy', () => {
  let strategy: NoRefundStrategy;
  let property: Property;
  let user: User;
  let booking: Booking;

  beforeEach(() => {
    strategy = new NoRefundStrategy();
    property = new Property({
      id: '1',
      title: 'Casa de Praia',
      description: 'Casa de praia com 4 quartos',
      basePricePerNight: 100,
      maxGuests: 8
    });
    user = new User({
      id: '1',
      name: 'John Doe'
    });
    booking = new Booking({
      id: '1',
      property: property,
      user: user,
      dateRange: new DateRange(new Date('2024-02-01'), new Date('2024-02-05')),
      guestsCount: 1,
    });
  });

  it('deve ser aplicável apenas quando o cancelamento é feito com 24 horas ou menos do início da reserva', () => {
    expect(strategy.canApply(0)).toBeTruthy(); // mesmo dia
    expect(strategy.canApply(1)).toBeTruthy(); // 24 horas
    expect(strategy.canApply(2)).toBeFalsy(); // mais de 24 horas
    expect(strategy.canApply(10)).toBeFalsy(); // muito antes
  });

  it('deve atualizar o status da reserva para cancelado sem alterar o preço total', () => {
    strategy.execute(booking);

    expect(booking.status).toBe(BookingStatus.CANCELLED);
    expect(booking.totalPrice).toBe(400);
  });
});

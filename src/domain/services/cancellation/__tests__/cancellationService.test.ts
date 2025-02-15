import { Booking, BookingStatus } from "../../../entities/booking";
import { Property } from "../../../entities/property";
import { User } from "../../../entities/user";
import { DateRange } from "../../../value_objects/dateRange";
import { CancellationService } from "../cancellationService";

describe('Serviço de Cancelamento', () => {
  let servicoCancelamento: CancellationService;
  let reserva: Booking;
  let propriedade: Property;
  let usuario: User;
  let dataInicio: Date;
  let dataFim: Date;
  let intervaloData: DateRange;

  beforeEach(() => {
    servicoCancelamento = new CancellationService();
    dataInicio = new Date('2024-02-01');
    dataFim = new Date('2024-02-05');
    intervaloData = new DateRange(dataInicio, dataFim);

    propriedade = new Property({
      id: '1',
      title: 'Casa de Praia',
      description: 'Casa de praia com 4 quartos',
      basePricePerNight: 100,
      maxGuests: 8
    });

    usuario = new User({
      id: '1',
      name: 'João Silva'
    });

    reserva = new Booking({
      id: '1',
      property: propriedade,
      user: usuario,
      dateRange: intervaloData,
      guestsCount: 1
    });
  });

  it('deve lançar erro quando a reserva já estiver cancelada', () => {
    reserva.updateStatus(BookingStatus.CANCELLED);

    expect(() => {
      servicoCancelamento.cancel(reserva, new Date('2024-01-20'));
    }).toThrow('A Reserva já está cancelada');
  });

  it('deve lançar erro ao tentar cancelar após a data de check-in', () => {
    expect(() => {
      servicoCancelamento.cancel(reserva, new Date('2024-02-02'));
    }).toThrow('Não é possível cancelar a reserva, o check-in já foi realizado');
  });

  it('deve aplicar reembolso total ao cancelar com mais de 7 dias de antecedência', () => {
    servicoCancelamento.cancel(reserva, new Date('2024-01-20'));

    expect(reserva.status).toBe(BookingStatus.CANCELLED);
    expect(reserva.totalPrice).toBe(0);
  });

  it('deve aplicar reembolso parcial ao cancelar entre 2 e 6 dias antes', () => {
    servicoCancelamento.cancel(reserva, new Date('2024-01-28'));

    expect(reserva.status).toBe(BookingStatus.CANCELLED);
    expect(reserva.totalPrice).toBe(200);
  });

  it('não deve aplicar reembolso ao cancelar com menos de 1 dias de antecedência', () => {
    servicoCancelamento.cancel(reserva, new Date('2024-01-31'));

    expect(reserva.status).toBe(BookingStatus.CANCELLED);
    expect(reserva.totalPrice).toBe(400);
  });
});

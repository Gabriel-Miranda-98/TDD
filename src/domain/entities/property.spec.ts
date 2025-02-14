import { DateRange } from "../value_objects/dateRange";
import { Booking } from "./booking";
import { Property } from "./property";
import { User } from "./user";

describe("Property Entity", () => {

  it("Deve ser possível criar uma propriedade com todos os atributos", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    expect(property.id).toBe('1');
    expect(property.title).toBe('Casa de Praia');
    expect(property.description).toBe('Casa muito bonita');
    expect(property.maxGuests).toBe(4);
    expect(property.basePricePerNight).toBe(200);

  })

  it("Deve lançar um erro se o title for vazio", () => {

    expect(() => {
      new Property({
        id:'1',
        title: '',
        description: 'Casa muito bonita',
        maxGuests: 4,
        basePricePerNight: 200,
      })
    }).toThrow(new Error('O campo title é obrigatório'));

  })

  it("Deve lançar um erro se o maxGuests for menor que 1", () => {

    expect(() => {
      new Property({
        id:'1',
        title: 'Casa de Praia',
        description: 'Casa muito bonita',
        maxGuests: 0,
        basePricePerNight: 200,
      })
    }).toThrow(new Error('O campo maxGuests deve ser maior que 0'));

  })

  it("Deve lançar um erro se o basePricePerNight for menor ou igual 0", () => {

    expect(() => {
      new Property({
        id:'1',
        title: 'Casa de Praia',
        description: 'Casa muito bonita',
        maxGuests: 4,
        basePricePerNight: 0,
      })
    }).toThrow(new Error('O campo basePricePerNight deve ser maior que 0'));
  })

  it("Deve validar o número máximo de hóspedes", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    expect(property.maxGuests).toBe(4);
    expect(() => {
      property.validateMaxGuests(5);
    }).toThrow(new Error(`Número máximo de hóspedes excedido, o número máximo de hóspedes é ${property.maxGuests}`));
  })

  it("Não deve aplicar nenhum desconto se a quantidade de diárias for menor que 7", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    const dateRange = new DateRange(new Date('2021-10-10'), new Date('2021-10-15'));



    expect(property.calculateTotalPrice(dateRange)).toBe(1000);
  })


  it.each
  ([{
    dateRange: new DateRange(new Date('2021-10-10'), new Date('2021-10-17')),
    expectedTotalPrice: 1260
  }, {
    dateRange: new DateRange(new Date('2021-10-10'), new Date('2021-10-24')),
    expectedTotalPrice: 2520

  },
  {
    dateRange: new DateRange(new Date('2021-10-10'), new Date('2021-10-31')),
    expectedTotalPrice: 3780
  }
])("Deve aplicar um desconto de 10% se a quantidade de diárias for maior ou igual a 7", ({dateRange,expectedTotalPrice}:{
  dateRange: DateRange;
  expectedTotalPrice: number;
}) => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })



    expect(property.calculateTotalPrice(dateRange)).toBe(expectedTotalPrice);
  })

  it("Deve ser possível adicionar uma reserva a propriedade", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    const user = new User({
      id:'1',
      name: 'John Doe'
    })

    const dateRange = new DateRange(new Date('2021-10-10'), new Date('2021-10-15'));
    const booking = new Booking({
      id:'1',
      property,
      user,
      dateRange,
      guestsCount: 4,
    })
    property.addBooking(booking)

    expect(property.bookings.length).toBe(1);
  }
)

  it("Deve retornar um array vazio se não houver reservas", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    expect(property.bookings).toEqual([]);
  })

  it("Deve retornar todas as reservas da propriedade", () => {

    const property = new Property({
      id:'1',
      title: 'Casa de Praia',
      description: 'Casa muito bonita',
      maxGuests: 4,
      basePricePerNight: 200,
    })

    const user = new User({
      id:'1',
      name: 'John Doe'
    })

    const dateRange = new DateRange(new Date('2021-10-10'), new Date('2021-10-15'));
    const booking = new Booking({
      id:'1',
      property,
      user,
      dateRange,
      guestsCount: 4,
    })
    property.addBooking(booking)

    expect(property.bookings).toEqual([booking]);
  })






});

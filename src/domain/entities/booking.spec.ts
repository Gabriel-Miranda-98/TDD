import { DateRange } from "../value_objects/dateRange"
import { Booking } from "./booking"
import { Property } from "./property"
import { User } from "./user"

describe("Booking Entity", () => {
  it("Deve criar uma instância de Booking com todos os atributos", () => {
    const property = new Property({
      id: "1",
      title: "Casa de praia",
      description: "Casa de praia em Fortaleza",
      basePricePerNight: 100,
      maxGuests: 1,
    })

    const user = new User({
      id: "1",
      name: "John Doe",
    })

    const dateRange = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))
    const booking = new Booking({
      id:'1',
      property,
      user,
      dateRange,
      guestsCount: 1,
    })

    expect(booking.id).toBe("1")
    expect(booking.property).toBe(property)
    expect(booking.user).toBe(user)
    expect(booking.dateRange).toBe(dateRange)
    expect(booking.guestsCount).toBe(1)
  })

  it("Deve lançar um erro se o numero de hospedes for menor que 1", () => {
    const property = new Property({
      id: "1",
      title: "Casa de praia",
      description: "Casa de praia em Fortaleza",
      basePricePerNight: 100,
      maxGuests: 1,
    })

    const user = new User({
      id: "1",
      name: "John Doe",
    })

    const dateRange = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))

    expect(() => {
      new Booking({
        id:'1',
        property,
        user,
        dateRange,
        guestsCount: 0,
      })
    }).toThrow(new Error("O número de hóspedes deve ser maior que 0"))
  })

  it("Deve lançar um erro se o numero de hospedes for maior que o máximo de hospedes da propriedade", () => {
    const property = new Property({
      id: "1",
      title: "Casa de praia",
      description: "Casa de praia em Fortaleza",
      basePricePerNight: 100,
      maxGuests: 1,
    })

    const user = new User({
      id: "1",
      name: "John Doe",
    })

    const dateRange = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))

    expect(() => {
      new Booking({
        id:'1',
        property,
        user,
        dateRange,
        guestsCount: 2,
      })
    }).toThrow(new Error(`Número máximo de hóspedes excedido, o número máximo de hóspedes é ${property.maxGuests}`))
  })

  it("Deve calcular o valor total da reserva", () => {
    const property = new Property({
      id: "1",
      title: "Casa de praia",
      description: "Casa de praia em Fortaleza",
      basePricePerNight: 100,
      maxGuests: 1,
    })

    const user = new User({
      id: "1",
      name: "John Doe",
    })

    const dateRange = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))
    const booking = new Booking({
      id:'1',
      property,
      user,
      dateRange,
      guestsCount: 1,

    })

    expect(booking.totalPrice).toBe(810)

  })

  it("Não deve realizar o agendamento quando a propriedade não tiver disponibilidade", () => {
    const property = new Property({
      id: "1",
      title: "Casa de praia",
      description: "Casa de praia em Fortaleza",
      basePricePerNight: 100,
      maxGuests: 1,
    })

    const user = new User({
      id: "1",
      name: "John Doe",
    })

    const dateRange = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))
    const booking =new Booking({
      id:'1',
      property,
      user,
      dateRange,
      guestsCount: 1,
    })

    property.addBooking(booking)

    const dateRange2 = new DateRange(new Date("2021-01-01"), new Date("2021-01-10"))
    expect(() => {
      new Booking({
        id:'1',
        property,
        user,
        dateRange: dateRange2,
        guestsCount: 1,
      })
    }).toThrow(new Error("Propriedade indisponível para as datas selecionadas"))
  })




})

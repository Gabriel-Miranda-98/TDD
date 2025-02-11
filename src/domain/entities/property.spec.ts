import { Property } from "./property";

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

});

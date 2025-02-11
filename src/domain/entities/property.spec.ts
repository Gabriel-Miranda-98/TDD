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

});

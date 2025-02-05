import { DateRange } from "./dateRange";

describe('Date Range Value Object', () => {

  it("Deve ser possível criar um DateRange", () => {
    const start = new Date('2021-01-01');
    const end =new Date('2021-01-03');
    const dateRange = new DateRange(start, end);
    expect(dateRange.startDate).toBe(start);
    expect(dateRange.endDate).toBe(end);
  });

  it('Não deve ser possível criar um DateRange com a data de início maior que a data de fim', () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() - 1);
    expect(() => new DateRange(start, end)).toThrow('A data de início deve ser menor que a data de fim');
  })
  it('Não deve ser possível criar um DateRange com a data de início igual a data de fim', () => {
    const date = new Date('2021-01-01');

    expect(() => new DateRange(date, date)).toThrow('A data de início deve ser menor que a data de fim');
  })

  it.each([
    [new Date('2021-01-01'), new Date('2021-01-03'), 2],
    [new Date('2021-01-01'), new Date('2021-01-02'), 1],
    [new Date('2021-01-01'), new Date('2021-01-04'), 3],
  ])('Deve ser possível calcular o total de noites corretamente', (start: Date, end: Date, expected: number) => {
    const dateRange = new DateRange(start, end);
    expect(dateRange.totalNights).toBe(expected);
  })

  it.each([
    { start1: new Date('2021-01-01'), end1: new Date('2021-01-03'), start2: new Date('2021-01-04'), end2: new Date('2021-01-06'), expected: false },
    { start1: new Date('2021-01-01'), end1: new Date('2021-01-03'), start2: new Date('2021-01-02'), end2: new Date('2021-01-06'), expected: true },
    { start1: new Date('2021-01-01'), end1: new Date('2021-01-03'), start2: new Date('2021-01-03'), end2: new Date('2021-01-06'), expected: false },
    { start1: new Date('2021-01-01'), end1: new Date('2021-01-03'), start2: new Date('2021-01-02'), end2: new Date('2021-01-03'), expected: true },


  ])("Deve ser possível verificar se dois intervalos de datas se sobrepõem", (
    { start1, end1, start2, end2, expected }: { start1: Date, end1: Date, start2: Date, end2: Date, expected: boolean }

  ) => {
    const dateRange1 = new DateRange(start1, end1);
    const dateRange2 = new DateRange(start2, end2);
    expect(dateRange1.overlaps(dateRange2)).toBe(expected);
  });

});

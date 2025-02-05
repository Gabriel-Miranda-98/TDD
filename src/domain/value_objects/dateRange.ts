export class DateRange {
  private readonly _start: Date;
  private readonly _end: Date;

  constructor(start: Date, end: Date) {
    if (start > end) {
      throw new Error('A data de início deve ser menor que a data de fim');
    }

    if(start === end) {
      throw new Error('A data de início deve ser menor que a data de fim');
    }

    this._start = start;
    this._end = end;
  }


  get startDate(): Date {
    return this._start;
  }

  get endDate(): Date {
    return this._end;
  }

  get totalNights(): number {
    const diffTime = Math.abs(this._end.getTime() - this._start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  overlaps(dateRange: DateRange): boolean {
    return this._start < dateRange.endDate && this._end > dateRange.startDate;
  }




}

import { DateRange } from "../value_objects/dateRange";

interface PropertyProps {
  id: string;
  title: string;
  description: string;
  maxGuests: number;
  basePricePerNight: number;
}

export class Property {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _maxGuests: number;
  private readonly _basePricePerNight: number;

  constructor({ id, title, description, maxGuests, basePricePerNight }: PropertyProps) {
    if (!title) {
      throw new Error('O campo title é obrigatório');
    }

    if (maxGuests < 1) {
      throw new Error('O campo maxGuests deve ser maior que 0');
    }
    if (basePricePerNight <= 0) {
      throw new Error('O campo basePricePerNight deve ser maior que 0');
    }
    this._id = id;
    this._title = title;
    this._description = description;
    this._maxGuests = maxGuests;
    this._basePricePerNight = basePricePerNight;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get maxGuests(): number {
    return this._maxGuests;
  }

  get basePricePerNight(): number {
    return this._basePricePerNight;
  }

  validateMaxGuests(maxGuests: number):void  {
    if(maxGuests > this.maxGuests) throw new Error(`Número máximo de hóspedes excedido, o número máximo de hóspedes é ${this.maxGuests}`);
  }

  calculateTotalPrice(dateRange:DateRange): number {
    const PERCENT_DISCOUNT = 0.9;
    const numberOfNights = dateRange.totalNights
    let totalPricePerNight = this.basePricePerNight * numberOfNights;
    if (numberOfNights >= 7) {
      totalPricePerNight *= PERCENT_DISCOUNT;
    }
    return totalPricePerNight;
  }
}

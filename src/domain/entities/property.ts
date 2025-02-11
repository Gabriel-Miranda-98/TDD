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
}

import { DateRange } from "../value_objects/dateRange"
import { Property } from "./property"
import { User } from "./user"

enum BookingStatus{
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

interface IBooking{
  id: string
  property: Property
  user:User
  dateRange: DateRange
  guestsCount: number

}

export class Booking{
  private readonly _id: string
  private readonly _property: Property
  private readonly _user: User
  private readonly _dateRange: DateRange
  private readonly _guestsCount: number
  private  _totalPrice: number
  private _status: BookingStatus = BookingStatus.PENDING
  constructor({
    id,
    property,
    user,
    dateRange,
    guestsCount,
  }: IBooking){
    if(guestsCount < 1){
      throw new Error('O número de hóspedes deve ser maior que 0')
    }

    property.validateMaxGuests(guestsCount)

    if(property.isAvailable(dateRange)){
      throw new Error('Propriedade indisponível para as datas selecionadas')
    }
    this._id = id
    this._property = property
    this._user = user
    this._dateRange = dateRange
    this._guestsCount = guestsCount
    this._totalPrice = this._property.calculateTotalPrice(this._dateRange)
    this._status = BookingStatus.CONFIRMED

  }

  get id(){
    return this._id
  }

  get property(){
    return this._property
  }

  get user(){
    return this._user
  }

  get dateRange(){
    return this._dateRange
  }

  get guestsCount(){
    return this._guestsCount
  }

  get totalPrice(){
    return this._totalPrice
  }

  get status(){
    return this._status
  }

  cancel(currentDate: Date){
     const PERCENT_REFUND = 0.5
      const diffDays = Math.ceil(Math.abs(this._dateRange.startDate.getTime() - currentDate.getTime())/ (1000 * 60 * 60 * 24));

    if(diffDays >0 && diffDays <=6){
      this._status = BookingStatus.CANCELLED
      this._totalPrice *= PERCENT_REFUND

      return

    } else if(diffDays >6){
      this._status = BookingStatus.CANCELLED
      this._totalPrice = 0
      return
    }
    this._status = BookingStatus.CANCELLED
  }


}

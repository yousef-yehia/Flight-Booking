/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from '../models/time-place-rm';
export interface BookingRm {
  airline?: null | string;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flightId?: string;
  numberOfBookedSeats?: number;
  passengerEmail?: null | string;
  passengerId?: string;
  price?: null | string;
}

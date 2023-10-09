/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { checkPassengerPassenger } from '../fn/passenger/check-passenger-passenger';
import { CheckPassengerPassenger$Params } from '../fn/passenger/check-passenger-passenger';
import { checkPassengerPassenger$Plain } from '../fn/passenger/check-passenger-passenger-plain';
import { CheckPassengerPassenger$Plain$Params } from '../fn/passenger/check-passenger-passenger-plain';
import { findPassenger } from '../fn/passenger/find-passenger';
import { FindPassenger$Params } from '../fn/passenger/find-passenger';
import { findPassenger$Plain } from '../fn/passenger/find-passenger-plain';
import { FindPassenger$Plain$Params } from '../fn/passenger/find-passenger-plain';
import { getPassengerIdByEmailPassenger } from '../fn/passenger/get-passenger-id-by-email-passenger';
import { GetPassengerIdByEmailPassenger$Params } from '../fn/passenger/get-passenger-id-by-email-passenger';
import { getPassengerIdByEmailPassenger$Plain } from '../fn/passenger/get-passenger-id-by-email-passenger-plain';
import { GetPassengerIdByEmailPassenger$Plain$Params } from '../fn/passenger/get-passenger-id-by-email-passenger-plain';
import { Passenger } from '../models/passenger';
import { registerPassenger } from '../fn/passenger/register-passenger';
import { RegisterPassenger$Params } from '../fn/passenger/register-passenger';

@Injectable({ providedIn: 'root' })
export class PassengerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerPassenger()` */
  static readonly RegisterPassengerPath = '/Passenger';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPassenger()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger$Response(params?: RegisterPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerPassenger$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassenger(params?: RegisterPassenger$Params, context?: HttpContext): Observable<void> {
    return this.registerPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findPassenger()` */
  static readonly FindPassengerPath = '/Passenger/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPassenger$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger$Plain$Response(params: FindPassenger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
    return findPassenger$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPassenger$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger$Plain(params: FindPassenger$Plain$Params, context?: HttpContext): Observable<Passenger> {
    return this.findPassenger$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Passenger>): Passenger => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPassenger()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger$Response(params: FindPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
    return findPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPassenger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassenger(params: FindPassenger$Params, context?: HttpContext): Observable<Passenger> {
    return this.findPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<Passenger>): Passenger => r.body)
    );
  }

  /** Path part for operation `getPassengerIdByEmailPassenger()` */
  static readonly GetPassengerIdByEmailPassengerPath = '/Passenger/getPassengerId/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPassengerIdByEmailPassenger$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassengerIdByEmailPassenger$Plain$Response(params: GetPassengerIdByEmailPassenger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPassengerIdByEmailPassenger$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPassengerIdByEmailPassenger$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassengerIdByEmailPassenger$Plain(params: GetPassengerIdByEmailPassenger$Plain$Params, context?: HttpContext): Observable<string> {
    return this.getPassengerIdByEmailPassenger$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPassengerIdByEmailPassenger()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassengerIdByEmailPassenger$Response(params: GetPassengerIdByEmailPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPassengerIdByEmailPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPassengerIdByEmailPassenger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassengerIdByEmailPassenger(params: GetPassengerIdByEmailPassenger$Params, context?: HttpContext): Observable<string> {
    return this.getPassengerIdByEmailPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `checkPassengerPassenger()` */
  static readonly CheckPassengerPassengerPath = '/Passenger/{email}/{password}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkPassengerPassenger$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkPassengerPassenger$Plain$Response(params: CheckPassengerPassenger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
    return checkPassengerPassenger$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkPassengerPassenger$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkPassengerPassenger$Plain(params: CheckPassengerPassenger$Plain$Params, context?: HttpContext): Observable<Passenger> {
    return this.checkPassengerPassenger$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Passenger>): Passenger => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkPassengerPassenger()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkPassengerPassenger$Response(params: CheckPassengerPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
    return checkPassengerPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkPassengerPassenger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkPassengerPassenger(params: CheckPassengerPassenger$Params, context?: HttpContext): Observable<Passenger> {
    return this.checkPassengerPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<Passenger>): Passenger => r.body)
    );
  }

}

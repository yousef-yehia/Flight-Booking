/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Passenger } from '../../models/passenger';

export interface CheckPassengerPassenger$Params {
  email: string ;
  password: string;
}

export function checkPassengerPassenger(http: HttpClient, rootUrl: string, params: CheckPassengerPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
  const rb = new RequestBuilder(rootUrl, checkPassengerPassenger.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
    rb.path('password', params.password, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Passenger>;
    })
  );
}

checkPassengerPassenger.PATH = '/Passenger/{email}/{password}';

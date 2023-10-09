/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Passenger } from '../../models/passenger';

export interface FindPassenger$Params {
  email: string;
}

export function findPassenger(http: HttpClient, rootUrl: string, params: FindPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<Passenger>> {
  const rb = new RequestBuilder(rootUrl, findPassenger.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
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

findPassenger.PATH = '/Passenger/{email}';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * This class provides the Qlik service with methods to read names and add names.
 */
@Injectable()
export class QlikService {

  private engine$: any;
  private app$: any;

  /**
   * Creates a new QlikService, do any setup here
   * @constructor
   */
  constructor() {

    // connect to engine
    this.engine$ = RxQ.connectEngine({
      host: "playground.qlik.com",
      prefix: "/playground/",
      port: "443",
      isSecure: true,
      rejectUnauthorized: false,
      apiKey: "<Your apiKey here...>"
    }, 'warm');

    // open application - AirBnB QVF
    this.app$ = this.engine$.qOpenDoc('2b10add1-472f-4192-aac9-44a99125825c');
  }

  getApp() {
    return this.app$;
  }
}
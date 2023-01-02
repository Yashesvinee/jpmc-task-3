import { ServerRespond } from './DataStreamer';

export interface Row {
      price_abc:number,
      price_def:number,
      ratio:number,
      upper_bound:number,
      lower_bound:number,
      trigger_alert:number|undefined,
      timestamp:Date
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
  const priceabc=(serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
  const pricedef=(serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
  const ratio=priceabc/pricedef;
  const upperb=1+.10;
  const lowerb=1-.10;

      return {
      price_abc:priceabc,
      price_def:pricedef,
      ratio,
      timestamp:serverResponds[0].timestamp>serverResponds[1].timestamp?serverResponds[0].timestamp:serverResponds[1].timestamp,
      upper_bound:upperb,
      lower_bound:lowerb,
      trigger_alert:(ratio>upperb || ratio<lowerb)? ratio:undefined,
      };

  }
}

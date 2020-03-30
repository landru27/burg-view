import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const STATS_URL = 'ws://127.0.0.1:8080/';

export interface StockpileStats {
  wheat: number;
  flour: number;
  bread: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public messages: Subject<StockpileStats>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<StockpileStats>>wsService.connect(STATS_URL).map(
      (response: MessageEvent): StockpileStats => {
        let data = JSON.parse(response.data);
        return {
          wheat: data.wheat,
          flour: data.flour,
          bread: data.bread
        };
      }
    );
  }
}

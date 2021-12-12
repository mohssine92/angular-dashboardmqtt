import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MqttService    {

  constructor(
    public wsService: WebsocketService
  ) 
  { }
  
 
  
  getAgentMessage () {
    return this.wsService.listen('agent/message');
  }
  
  getAgentConnected () : Observable<any> {
    return this.wsService.listen('agent/connected');
  }

  getAgentDisconnected () {
    return this.wsService.listen('agent/disconnected');
  }




}

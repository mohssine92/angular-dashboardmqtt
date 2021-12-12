import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { MqttService } from './mqtt.service';
import { Agent } from '../classes/Agent';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  url = environment.wsUrl
 
  public AgentConnected!: Subscription;
  public AgentDisconnected!: Subscription;
  public MetricsType : any[] = []; 

  public agentesConnectados : any [] = [];
  public NewAgentConnected!: Agent ; 

  constructor( private http: HttpClient,
               private mqttService: MqttService
    
    ) { 
    // alto nivel ijectado , eventos desconnected and connected 
    //this.escucharsockets();
    this.AgentsConnected();

  }

  // escucharsockets() {
  //    // este servicion AgentService esta injectado en componenet de alto nivel por motivo de que cuando algun Agente se coonecta o desconecta y algun componenet pendiente 
  //    // de esta informacion y estaba destruido no va dar cuenta por eso este servicio siempre dara cuenta y actualiza los storage donde tendran als respuestas los compoenetes
  //    // al montarse es todo 
  //   this.AgentConnected = this.mqttService.getAgentConnected()
  //       .subscribe( (data: any ) => {

  //         // TODO: trasladar 
    
  //       //  // add to list agente connected 
  //       //  this.NewAgentConnected = data.agent;
  //       //  this.agentesConnectados.push(this.NewAgentConnected)
  //       //  console.log(this.agentesConnectados);

  //        const uuid = data.agent.uuid
  //        const connected = true;     
  //        localStorage.setItem( 'connected', JSON.stringify( connected ) );
  //        localStorage.setItem( 'AgentUuid', JSON.stringify( uuid ) );
        
  //       });


  //   this.AgentDisconnected = this.mqttService.getAgentDisconnected()
  //         .subscribe( (data: any ) =>  {
  //                const uuidDisconnected = data.agent.uuid;
          
  //                let AgentUuid:any;

  //                if ( localStorage.getItem('AgentUuid') ) {

  //                   AgentUuid = JSON.parse( localStorage.getItem('AgentUuid')! );
                   
  //                }
          
  //                if(uuidDisconnected === AgentUuid){

  //                  const connected = false;
  //                  localStorage.setItem( 'connected', JSON.stringify( connected ) );
  //                  const AgentUuid = '';
  //                  localStorage.setItem( 'AgentUuid', JSON.stringify( AgentUuid ) );
  //                  this.MetricsType = [];
                   
  //                } 
             

  //                // TODO:trasaladar 
  //               //  // delete to list desconnecte whwn any agente disconected 
  //               //   this.agentesConnectados = this.agentesConnectados.filter( agente => agente.uuid !==  uuidDisconnected);  // == false expulsado de la lista 
  //               //   console.log(this.agentesConnectados);
  //         }); 


  // }

  
  // peticiones http
  typeUuidMetrics (uuid: string , type: string): Observable<any>{

    return this.http.get(this.url+'/v1/metrics/'+uuid+'/'+type)
  
  }

  AgentUuid (uuid: string ): Observable<any>{

    return this.http.get(this.url+'/v1/agent/'+uuid)
  
  }

  MetricsUuid (uuid?: string ): Observable<any>{

    return this.http.get(this.url+'/v1/metrics/'+uuid)
  
  }


  AgentsConnected (){

    return this.http.get(this.url+'/v1/agents')
 
  }


}

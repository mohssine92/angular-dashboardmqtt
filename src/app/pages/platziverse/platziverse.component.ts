import { Component,  OnDestroy,  OnInit  } from '@angular/core';

import {  Subscription } from 'rxjs';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../classes/Agent';

import { environment } from '../../../environments/environment.prod';
import { MqttService } from '../../services/mqtt.service';




@Component({
  selector: 'app-platziverse',
  templateUrl: './platziverse.component.html',
  styleUrls: ['./platziverse.component.css']
})
export class PlatziverseComponent implements OnInit,  OnDestroy  {

  url = environment.wsUrl
  
  AgentConnected!: Subscription;
  AgentDisconnected!: Subscription;

  condicion: Boolean = false;
  condiciondos: number = 12;

  public agentesConnectados : Agent [] = [];
  public NewAgentConnected!: Agent ;
  public colors : any [] = [
    [
      { // red
        backgroundColor: 'rgba(255, 136, 0, 0.3)',
        borderColor: 'red', // red
        pointBackgroundColor: 'red',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'red'
      }
    ],
    [
   
      { // red
        backgroundColor: '#99E985',
        borderColor: 'red', // red
        pointBackgroundColor: 'red',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'red'
      }
    ],
    [
   
      { // red
        backgroundColor: '#10DAEE',
        borderColor: 'red', // red
        pointBackgroundColor: 'red',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'red'
      }
    ]
  
  ] //[ 'a','b','c'] 

  public Metrics : any [] = [ ]

  constructor( public agentService: AgentService,
              private mqttService: MqttService
            
             
  ) { 
   
  }


  ngOnInit(): void { 
  
     this.GetAgentHttp()
     this.escucharsockets()


    

    
  }

  ngOnDestroy(): void {
     
     
  }

  GetAgentHttp() {

    this.agentService.AgentsConnected()
        .subscribe(data => {
          this.agentesConnectados = Object.values(data)[0]
          this.getMetrics()

        })

  }

 
   escucharsockets() {

    this.AgentConnected = this.mqttService.getAgentConnected()
          .subscribe( (data: any ) => {
              // add to list agente connected 
              this.NewAgentConnected = data.agent;
              this.agentesConnectados.push(this.NewAgentConnected) 
         });


     this.AgentDisconnected = this.mqttService.getAgentDisconnected()
          .subscribe( (data: any ) =>  {
               const uuidDisconnected = data.agent.uuid;
               // delete to list desconnecte whwn any agente disconected 
                this.agentesConnectados = this.agentesConnectados.filter( agente => agente.uuid !==  uuidDisconnected);  // == false expulsado de la lista 
                
          }); 


   }

   getMetrics(){
       this.agentesConnectados.forEach(  ({ uuid } ) => {
          console.log(uuid);
          this.agentService.MetricsUuid(uuid)
                          .subscribe( data => {
                              this.Metrics.push(Object.values(data)[0]) 
                              console.log(this.Metrics);                              
                          })
     
       });


   }

  
   actionn(i:any){
    this.condiciondos = i 
     console.log(i);
   }



  action() {
    if(this.condicion == false){
      this.condicion = true 
    }else{
      this.condicion = false
    }

  }
 
  


}


// componente metrics ,
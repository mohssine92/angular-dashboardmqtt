import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentService } from '../../../services/agent.service';
import { Agent } from '../../../classes/Agent';

@Component({
  selector: 'app-metric-historial',
  templateUrl: './metric-historial.component.html',
  styleUrls: ['./metric-historial.component.css']
})
export class MetricHistorialComponent implements OnInit {


  @Input() Uuid!: any;
  metricsType: string[] = []
  agent!: Agent;

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


  constructor( public agentService:AgentService) { }

  ngOnInit(): void {

    this.traerhistorial();

  
  }

  traerhistorial(){

     // informacion del agente 
     this.agentService.AgentUuid(this.Uuid)
         .subscribe( data => { 
       
           this.agent = data.agent
           console.log(this.agent);


         // obtener cual es metricas que tiene Agente 
         this.MetricsOfAgent(this.Uuid)
             .subscribe(data => {
        
               const metrics = data.metrics

               if(Array.isArray(metrics)){
            
                 metrics.forEach( ({ type }) => { // {id}
                
                 this.metricsType.push(type)
                }) // recordar foreach es bloqueante
             
             }                 
           
       
         }) 
    
    } )



  }
  
  MetricsOfAgent(Uuid: string):Observable<any> {
    return this.agentService.MetricsUuid(Uuid)
  }





}

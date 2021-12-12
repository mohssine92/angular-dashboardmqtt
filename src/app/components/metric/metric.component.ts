import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';

import { ChartDataSets , ChartType } from 'chart.js';
import {   Label } from 'ng2-charts';

import * as moment from 'moment';
import { MqttService } from '../../services/mqtt.service';
import { Subscription } from 'rxjs';
import { Agentmetric  } from '../../classes/Agentmetric';

// dashboard de de internet de las cosas 

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnInit,  OnDestroy  {

  // para evitar fuga de memoria refresh etc....
  AgentConnected!: Subscription;
  AgentMessage!: Subscription;
  AgentDisconnected!: Subscription;

  labels: string[] = [];
  data : any[] = [];
  @Input() type: string = 'promiseMetric';
  @Input() Uuid: any = '6c4c5717-8e17-468a-9fab-837a36c53782'
  metrics: [] = [];



  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0 ], label: 'Metric' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
   // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = [];

  @Input() personajes: any = [];

  @Input() public lineChartColors: any[] = [
   
    { // red
      backgroundColor: 'rgba(255, 136, 0, 0.3)',
      borderColor: 'red', // red
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'red'
    }
  ];



  constructor( public agentService: AgentService,
               public mqttService : MqttService,
    
  ) { }

  ngOnInit(): void {
     this.getMetricsUuidType() // inegracion API con metric componnete
     this.escucharSocket()  // Integracion de Realtime socket con componenet metric 
  } 


  ngOnDestroy(): void {
    this.AgentConnected.unsubscribe();
    this.AgentMessage.unsubscribe();
    this.AgentDisconnected.unsubscribe();
  }

  escucharSocket() {

    this.AgentConnected = this.mqttService.getAgentConnected()
        .subscribe( (data: any ) => {
          console.log()  
        });      

    this.AgentMessage = this.mqttService.getAgentMessage()
        .subscribe( (data: any ) => {
          this.agentMessage(data)
        } );   //    console.log(data)

    this.AgentDisconnected = this.mqttService.getAgentDisconnected()
        .subscribe( (data: any ) => console.log());   

  } 

  getMetricsUuidType() { // se dispra por input debe recibir args  - ahora pasamos manualmenet 

    this.agentService.typeUuidMetrics( this.Uuid , this.type )
             .subscribe( data  => {
                this.metrics = data.metrics
              
                if(Array.isArray(this.metrics)){
                    this.metrics.forEach( ({id , createdAt , value , type }) => { // {id}
                    
                      //this.labels.push(moment(createdAt).format('HH:mm:ss'));
                      this.lineChartLabels.push(moment(createdAt).format('HH:mm:ss'));
                      this.data.push(value);
                      this.type = type

                      
                    }) // recordar foreach es bloqueante

                    this.lineChartData = [
                      { data: this.data, label: this.type},
                    ]

                }


             })
       
  }

  agentMessage(payload:Agentmetric){ 

  
    // objetivo obtener typo metrica de un otro agente en especifico ,   
    if(payload.agent?.uuid === this.Uuid ){
                
      // captar typo especifico de metrica en cada evento recibido - no olvidar cada evento recibido trae diferentes types de metrica - capto lo que me interesa 
      const metric = payload.metrics?.find( m => m.type === this.type );

      const lenght = this.lineChartLabels.length || this.data.length

      if(lenght >= 20) {
        // shift elemina primer element del arreglo 
       
        this.lineChartLabels.shift();
        this.data.shift()

      }

      // add new element
      this.lineChartLabels.push(moment(metric?.timestamp).format('HH:mm:ss'))
      this.data.push(metric?.value)


    }
    
  }

}
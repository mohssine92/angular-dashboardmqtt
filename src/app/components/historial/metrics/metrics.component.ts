import { Component, Input, OnInit } from '@angular/core';


import { ChartDataSets , ChartType } from 'chart.js';
import {  Color, Label } from 'ng2-charts';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AgentService } from '../../../services/agent.service';


@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

   // para evitar fuga de memoria refresh etc....
   AgentConnected!: Subscription;
   AgentMessage!: Subscription;
   AgentDisconnected!: Subscription;
 
   labels: string[] = [];
   data : any[] = [];
   @Input() type: string = 'promiseMetric';
   @Input() Uuid: string = '6c4c5717-8e17-468a-9fab-837a36c53782'
   metrics: [] = [];
 
 
 
   public lineChartLegend = true;
   public lineChartType: ChartType = 'line';
   public lineChartData: ChartDataSets[] = [
     { data: [0, 0, 0, 0 ], label: 'Metric' },
     //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
   ];
   public lineChartLabels: Label[] = [];
 
   
 
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
                
     
   ) { }
 
   ngOnInit(): void {
      this.getMetricsUuidType() // inegracion API con metric componnete
    
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
 
  
}

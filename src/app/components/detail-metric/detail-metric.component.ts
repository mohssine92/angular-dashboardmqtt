import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators' 
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-detail-metric',
  templateUrl: './detail-metric.component.html',
  styleUrls: ['./detail-metric.component.css']
})
export class DetailMetricComponent implements OnInit {

  Uuid: string = '';
  pid: string = '';
  Metrics: any[] = [];
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

  constructor( private activateRoute : ActivatedRoute,
               public agentService: AgentService,
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
        .subscribe( data => { 
          this.Uuid = data.id 
          console.log('-_>', this.Uuid);
          this.GetAgentObject(this.Uuid);
          this.GetMetrics(this.Uuid);
        
        })

  }

  GetMetrics(Uuid:string) {
    this.agentService.MetricsUuid(Uuid)
        .subscribe( data => {
          
           this.Metrics = data.metrics
          
           console.log(this.Metrics);
        })

  }

  GetAgentObject (Uuid:string) {
     this.agentService.AgentUuid(Uuid)
           .subscribe(data => {
            //console.log(data.agent)
            this.pid = data.agent.pid;

           })

  }

}

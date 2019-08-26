import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private result = ''
  private resultarr
  constructor(private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.result = params['result']
    })
    this.resultarr = this.result.split('-')
  }

}

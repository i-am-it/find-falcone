import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core'; 


@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  private speed
  constructor() { }
  @Input('planet') planet
  @Input('vehicles') vehicles
  @Output() onselected = new EventEmitter<string>()
  @Output() selectedPlanet = new EventEmitter<string>()
  @Output() unselectedPlanet = new EventEmitter<string>()
  ngOnInit() {
  }

  onSelect(vehiclename:string){
    console.log(vehiclename)
    this.onselected.emit(vehiclename)
    
  }

  selectPlanet(planetname:string){
    console.log("selectplanet")
    if(document.getElementById(planetname).className==="collapse show")
    {
      this.unselectedPlanet.emit(planetname)
    }
    else if(document.getElementById(planetname).className==="collapse"){
      this.selectedPlanet.emit(planetname)
    }
  }
}

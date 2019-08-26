import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor() { }
  
  @Input('vehicles') vehicles
  @Input('planet') planet
  @Output() selected = new EventEmitter<string>()
  ngOnInit() {
    console.log(this.vehicles)
    console.log('veh')
  }

  onVehicleSelection(name){
    console.log(name)
    this.selected.emit(name)
  }

  vehicleValid(planet,vehicle){
    if(vehicle.total_no===0||planet.distance>vehicle.max_distance){
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name} disabled`)
      return ''
    }
    else{
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name}`)
      return null
    }
  }

}

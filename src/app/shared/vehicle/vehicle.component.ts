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

  onVehicleSelection(vehicle, planet){
    console.log(name)
    this.selected.emit(vehicle.name)
    document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name} selected`)
    this.vehicles.forEach(element => {
      if(element.name !== vehicle.name){
        this.vehicleValid(planet,element)
      }
    });
  }

  vehicleValid(planet,vehicle){
    if(planet.distance>vehicle.max_distance || (vehicle.total_no===0 && planet.selectedvehicle!==vehicle.name)){
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name} disabled`)
      return ''
    }
    else if(vehicle.total_no===0 && planet.selectedvehicle === vehicle.name){
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name} selected`)
      return ''
    }
    else if(vehicle.total_no!==0 && planet.selectedvehicle === vehicle.name){
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name} selected`)
      return null
    }
    else{
      document.getElementsByClassName(planet.name+"-"+vehicle.name)[0].setAttribute('class',`${planet.name}-${vehicle.name}`)
      return null
    }
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetComponent } from './planet/planet.component';
import { VehicleComponent } from './vehicle/vehicle.component';



@NgModule({
  declarations: [PlanetComponent, VehicleComponent],
  imports: [
    CommonModule
  ],
  exports:[PlanetComponent, VehicleComponent]
})
export class SharedModule { }

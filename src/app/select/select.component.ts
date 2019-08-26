import { Component, OnInit } from '@angular/core';


import { AppServiceService } from '../app-service.service'

import {  Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

   planets
   vehicles
  private err
   timetaken = 0
  private selectedPlanets=[]
  private token
  constructor(private serv: AppServiceService, private router:Router) {
   }

  ngOnInit() {
    this.getPlanets()
    this.getVehicles()
    console.log(this.vehicles)
  }

  getPlanets(){
    console.log("sele")
    this.serv.getPlanets().subscribe(
      data => {
        this.planets = data
        this.planets.forEach(element => {
          element["selectedvehicle"] = ""
        });
      },
      error => this.err = error
    )
  }

  getVehicles(){
    console.log("sele")
    this.serv.getVehicles().subscribe(
      data => {
        this.vehicles = data
        console.log(this.vehicles)
      },
      error => this.err = error
    )
  }

  calculateTime(vehiclename:string, planet){
    console.log(vehiclename)
    if(planet.selectedvehicle === "" || planet.selectedvehicle!== vehiclename)
    {
      for (let vehicle of this.vehicles){
        if(vehicle.name === planet.selectedvehicle){
          vehicle.total_no = vehicle.total_no + 1
          this.timetaken = this.timetaken - (planet.distance/vehicle.speed)
        }
      }
      for (let vehicle of this.vehicles){
        if(vehicle.name === vehiclename)
        {
          console.log(planet.distance)
          this.timetaken = this.timetaken + (planet.distance/vehicle.speed)
          vehicle.total_no = vehicle.total_no - 1
          planet.selectedvehicle = vehiclename
          console.log(this.timetaken)
        }
      }
    }
    
  }

  onPlanetSelection(planetname:string){
    console.log(this.selectedPlanets)
    // let planetnamearr = []
    // this.planets.array.forEach(element => {
    //   planetnamearr.push(element.name)
    // });
    if(this.selectedPlanets.length<4){
      document.getElementById(planetname+"1").setAttribute('class','btn btn-success')
      this.selectedPlanets.push(planetname)
      for(let planet of this.planets){
        if(planet.name=== planetname && planet.selectedvehicle !== "")
        {
          for (let vehicle of this.vehicles){
            if(vehicle.name === planet.selectedvehicle){
              vehicle.total_no = vehicle.total_no - 1
              this.timetaken = this.timetaken + (planet.distance/vehicle.speed)
            }
          }
        }
      }
    }
    if(this.selectedPlanets.length ===4){
      document.getElementById(planetname+"1").setAttribute('class','btn btn-success')
      for(let planet of this.planets){
        if(!this.selectedPlanets.includes(planet.name)){
          document.getElementById(planet.name+"1").setAttribute('class','btn btn-secondary')
          document.getElementById(planet.name+"1").setAttribute('href','')
        }
      }
    }
    // if(this.selectedPlanets.length===4){
    //   for(let planet in this.selectedPlanets)
    //   {
    //       if(planet === planetname){
    //         document.getElementById(planetname+"1").setAttribute('href','')
    //         console.log(document.getElementById(planetname+"1"))
    //       }

    //   }
    // }
    // else{
    //   this.selectedPlanets.push(planetname)
    // }
  }

  offPlanetSelection(planetname:string,planet){
    let spliceIdx = this.selectedPlanets.indexOf(planetname)
    
    document.getElementById(planetname+"1").setAttribute('class','btn btn-primary')
    if(this.selectedPlanets.length ===4)
    {
      for(let planet of this.planets){
        if(!this.selectedPlanets.includes(planet.name)){
          console.log('offpla')
          document.getElementById(planet.name+"1").setAttribute('class','btn btn-primary')
          document.getElementById(planet.name+"1").setAttribute('href',`#${planet.name}`)
        }
      }
    }
    this.selectedPlanets.splice(spliceIdx,1)
    if(planet.selectedvehicle !== "")
    {
      for (let vehicle of this.vehicles){
        if(vehicle.name === planet.selectedvehicle){
          vehicle.total_no = vehicle.total_no + 1
          this.timetaken = this.timetaken - (planet.distance/vehicle.speed)
        }
      }
    }
  }

  findButton(){
    // (selectedPlanets.length===4)?null:''
    if(this.selectedPlanets.length === 4){
      for(let planet of this.planets){
        if(this.selectedPlanets[3] === planet.name && planet.selectedvehicle){
          
          return null
        }
      }
    }
    return ''
  }

  // getToken(){
  //   this.token = this.serv.getToken().subscribe(
  //     data=>this.token = data,
  //     error=>this.err = error
  //     )
  // }

  findFalcone(){
    let selectedVehicles =[]
    let response
    let result
    
    for(let planet of this.planets){
      if(planet.selectedvehicle!==''){
        selectedVehicles.push(planet.selectedvehicle)
      }
    }
    this.token = this.serv.getToken().subscribe(
          data=>this.token = data,
          error=>this.err = error,
          ()=>{
            response=this.serv.findFalcone(this.selectedPlanets,selectedVehicles,this.token.token).subscribe(
              data=>{
                response = data
                console.log(response)
                
              },
              error=>this.err = error,
              ()=>{
                if(response.status === "success"){
                  result = `${response.planet_name}-1-${this.timetaken}`
                }
                else if(response.status === "false"){
                  result = `0-${this.timetaken}`
                }
                else if(response.status == undefined){
                  result = `${response.error}-${this.timetaken}`
                }
                console.log(result)
                this.router.navigate(['/result',result])
              }
            )
          }
          )
    
    
  }

}

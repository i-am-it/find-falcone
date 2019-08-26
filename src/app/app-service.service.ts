import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private url = 'https://findfalcone.herokuapp.com/'
  private err
  constructor(private http: HttpClient) { }
  
  getPlanets(){
    console.log("ser")
    return this.http.get(`${this.url}planets`)
    
  }

  getVehicles(){
    console.log("ser")
    return this.http.get(`${this.url}vehicles`)
    
  }

  getToken(){
    let headers = new HttpHeaders({
      'Accept': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.http.post(`${this.url}token`,null,options)
  }

  findFalcone(selectedPlanets,selectedVehicles,token){
    let reqBody
    reqBody = {
      'token': token,
      'planet_names':selectedPlanets,
      'vehicle_names':selectedVehicles
    }
    console.log(reqBody)
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
    return this.http.post(`${this.url}find`,reqBody,options)
  }
}

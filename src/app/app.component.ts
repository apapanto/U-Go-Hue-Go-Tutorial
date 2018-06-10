import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private username: string = "<username here>";
  // ex: 2DNWwpZpUyMZ3zzaGM53HWA70kwxCu-YFTzBojG2
  private hueApiUrl: string = `http://<Bridge IP here>/api/${this.username}/lights`;
  // ex: 192.168.0.110
  private lights;
  private lightChangeValues = {};

  constructor(private http: HttpClient) {}

  lightChange(lightNumber, property, propertyValue){
    this.lightChangeValues[property] =  propertyValue;
    this.http.put(
      `${this.hueApiUrl}/${lightNumber}/state`, this.lightChangeValues
    )
    .subscribe(
      data => { console.log(data); },
      err => { console.log('Something went wrong!'); }
    );
  }

  ngOnInit(): void {
    this.http.get(this.hueApiUrl)
    .subscribe(
      data => { 
        this.lights = [];
        for (let i in data) {
           data[i].lightId = i;
           this.lights.push(data[i]);
        }
        console.log(this.lights);
      },
      err => { console.log('Something went wrong!'); }
    )
  }
}

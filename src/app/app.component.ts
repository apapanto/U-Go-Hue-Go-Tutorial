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
  private lights: string[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.hueApiUrl)
    .subscribe(
      data => { this.lights = Object.keys(data).map(key => data[key]); },
      err => { console.log('Something went wrong!'); }
    )
  }
}

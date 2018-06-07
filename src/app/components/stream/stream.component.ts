import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { inspect } from 'util';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient ) { }

  @ViewChild('hardwareVideo') hardwareVideo: any;

  _navigator = <any>navigator;
  localStream;
  video;

  ngOnInit() {

  }

  stopStream() {
    if (this.localStream) {
      const tracks = this.localStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    this.localStream = null;
    }
  }

  startStrean() {
    if(!this.localStream){
      this.video = this.hardwareVideo.nativeElement;
      this._navigator = <any>navigator;

      this._navigator.getUserMedia = (this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
        || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia);
      this._navigator.mediaDevices.getUserMedia({ video: true, sound: true })
        .then((stream) => {
          this.localStream = stream;

          console.log(stream);
          

          this.video.srcObject = stream;
          this.video.play();
      

          const headers = new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json');

              const s = {...stream};
          this.http.post('http://127.0.0.1:3000/stream/streamRequest', {s:JSON.stringify(s)}, {headers: headers})
          .subscribe(data => {
            console.log("received from server:", data);
        
          }); 
        
        });

   

      }
  }

}

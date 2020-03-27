import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'front';

  constructor(
    private functions: AngularFireFunctions,
    private auth: AngularFireAuth
  ) {
  }

  ngAfterViewInit() {
    this.registrarUsuario("andres@eversoft.mx", "12345678");

    /* 
    FUNCION BASICA
    let callable = this.functions.httpsCallable("hello");

    callable("Daniel").toPromise().then(response => {
      console.log("Respuesta", response);
    }); */
  }

  registrarUsuario(email: string, password: string) {
    this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

}
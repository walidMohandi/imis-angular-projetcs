import { Component, OnInit } from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit {

  isAuth = false;

  lastUpdate = new Promise(
    (
      (resolve, reject) => {
        const date = new Date();
        setTimeout(
          () => {
            resolve(date);
          }, 2000

        );
      })
  )


  appareils: any[];
  appareilsSubscription: Subscription;


  constructor( private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(): void {
    this.appareilsSubscription = this.appareilService.appareilsSubject.subscribe(
      (app: any[]) => {
        this.appareils = app;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.onSwitchOn();
  }

  onEteindre() {
    this.appareilService.onSwitchOff();
  }

  onEnregistrer() {
    this.appareilService.saveAppareilsToServer();
  }

  onGetAppareils() {
    this.appareilService.getAppareilsFromServer();
  }
}

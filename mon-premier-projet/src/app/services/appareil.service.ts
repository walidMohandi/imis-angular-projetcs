import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Télévision',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }


  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  findAppareilById( id: number ) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  onSwitchOn() {
    for(let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  onSwitchOff() {
    for(let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  onSwitchOneON( index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  onSwitchOneOff( index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil( name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils.length + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpClient.put('https://http-client-demo-6bd39.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement réussi');
        },
        (error: string) => {
          console.log('Erreur d\'enregistrement de données' + error);
        }
        );
  }

  getAppareilsFromServer() {
    this.httpClient.get<any[]>( 'https://http-client-demo-6bd39.firebaseio.com/appareils.json')
      .subscribe(
        (response: any[]) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error: string ) => {
          console.log('Erreur de chargement');
        }
      );

  }



}

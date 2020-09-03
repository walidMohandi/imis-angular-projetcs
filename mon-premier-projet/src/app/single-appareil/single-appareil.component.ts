import { Component, OnInit } from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.css']
})
export class SingleAppareilComponent implements OnInit {

  name: string = 'none';
  status: string = 'none';

  constructor( private appareilService: AppareilService,
               private activeRoute: ActivatedRoute) { }

  ngOnInit(){
    const id = this.activeRoute.snapshot.params.id;
    this.name = this.appareilService.findAppareilById(+id).name;
    this.status = this.appareilService.findAppareilById(+id).status;
  }

}

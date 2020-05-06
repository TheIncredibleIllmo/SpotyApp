import { Component, OnInit, Input } from '@angular/core';
import { log } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() items: any[];
  constructor(private router: Router) {

  }
  ngOnInit() {
  }

  public navigateToArtist(item) {

    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate([`/artist/${artistId}`]);
    console.log(artistId);
  }

}

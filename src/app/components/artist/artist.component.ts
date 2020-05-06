import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  loading: boolean;
  artist: any = {};

  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    this.router.params.subscribe((p) => {
      this.getArtist(p['id']);
    });
  }

  ngOnInit() {
  }

  getArtist(id: string) {
    this.loading = true;
    try {
      this.spotifyService.getArtist(id)
        .subscribe(a => {
          this.artist = a;
          this.loading = false;
        });

    } catch (error) {
      this.loading = false;
    }
  }

}

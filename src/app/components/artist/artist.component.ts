import { log } from 'util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { AppSettings } from '../../helpers/appSettings';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  loading: boolean;
  artist: any = {};
  artistTopTracks: any[] = [];


  constructor(private router: ActivatedRoute, private spotifyService: SpotifyService) {
    try {
      this.router.params.subscribe((p) => {
        const authorId = p['id'];

        this.getArtist(authorId);
        this.getArtistTopTracks(authorId);


      });
    } catch (error) {
    }
  }

  ngOnInit() {
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotifyService.getArtist(id)
      .subscribe(a => {
        this.artist = a;
        this.loading = false;
      });
  }

  getArtistTopTracks(authorId: string) {
    this.spotifyService.getArtistTopTracks(authorId, AppSettings.MX_COUNTRY)
      .subscribe(t => {
        this.artistTopTracks = t;

      })
  }

}

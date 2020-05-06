import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedArtists: any[] = [];

  loading: boolean;

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
  }

  public searchArtist(text: string) {
    if (!text) return;
    this.loading = true;
    try {
      this.spotifyService.searchArtists(text).subscribe((data: any) => {
        this.searchedArtists = data;
        this.loading = false;

      });
    } catch (error) {
      this.loading = false;
    }

  }
}

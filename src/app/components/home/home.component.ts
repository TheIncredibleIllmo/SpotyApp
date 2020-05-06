import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyService) {

    this.loading = true;

    try {
      this.spotifyService.getNewReleases().subscribe((data: any) => {
        this.newReleases = data;
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
    }
  }

  ngOnInit() {
  }
}

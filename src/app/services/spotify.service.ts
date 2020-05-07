import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Filters specific data you want to get
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyToken: string = "BQB04NxNFTMOVZrRSecs64Vap1LwWyO1LWnqgmRnR_Kg58-pT3Uz3uiaRborm4sTedeZb6UYwOx1ihgwL2c";

  constructor(private httpClient: HttpClient) {
    console.log('Spotify service ready...');
  }

  get(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.spotifyToken}`
    });

    return this.httpClient.get(url, { headers });
  }

  getNewReleases() {
    return this.get('browse/new-releases')
      .pipe(map(data => data['albums'].items));
  }

  searchArtists(text: string) {
    try {
      return this.get(`search?q=${text}&type=artist&market=US&offset=0&limit=20`)
        .pipe(map(data => data['artists'].items));
    }
    catch {
      return null;
    }
  }

  getArtist(id: string) {
    try {
      return this.get(`artists/${id}`);
    }
    catch {
      return null;
    }
  }

  getArtistTopTracks(authorId: string, country: string) {
    try {
      return this.get(`artists/${authorId}/top-tracks?country=${country}`).
        pipe(map(data => data['tracks']));

    } catch (error) {
      return null;
    }
  }

}

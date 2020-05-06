import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Filters specific data you want to get
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyToken: string = "BQCDvCDPk5aU8rdzPMt4Xup9mjjvtQzZ04ng53tw04WcVmuPTe2umol7JsijqORV4Fs_fEjU0f2-Uk_pWM4";

  constructor(private httpClient: HttpClient) {
    console.log('Spotify service ready...');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.spotifyToken}`
    });

    return this.httpClient.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(map(data => data['albums'].items));
  }

  searchArtists(text: string) {
    try {
      return this.getQuery(`search?q=${text}&type=artist&market=US&offset=0&limit=20`)
        .pipe(map(data => data['artists'].items));
    }
    catch {
      return null;
    }
  }

  getArtist(id: string) {
    try {
      return this.getQuery(`artists/${id}`);
    }
    catch {
      return null;
    }
  }


}

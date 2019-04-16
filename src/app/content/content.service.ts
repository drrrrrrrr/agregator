import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {from, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  api_key = 'bad579f597bd4ffda1d6e9cc4d2286af';
  line = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=bad579f597bd4ffda1d6e9cc4d2286af`;
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(this.line).pipe(map(x => {
      return x['articles'];
    }));
  }
  // getCategory(category) {
  //   return this.http.get(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=${this.api_key}` + '&category=' + category)
  //     .pipe(map(x => {
  //     return x['articles'];
  //   }));
  // }

  getCategory(category, sources) {
    if (sources) {
      return this.http.get(`http://localhost:9966/api/v1/news/get/${category}/${sources.join(',')}`)
        .pipe(map(x => {
          console.log(x)
          return x;
        }));
    }
    return this.http.get(`http://localhost:9966/api/v1/news/${category}`)
      .pipe(map(x => {
        console.log(x)
        return x;
      }));
  }
  getSubtitleInfo(subtitle) {
    return this.http.get(`http://localhost:9966/api/v1/news/getcategory/${subtitle}`)
      .pipe(map(x => {
        console.log(x)
        return x;
      }));
  }
  getArticleFromId(id) {
    return this.http.get(`http://localhost:9966/api/v1/news/getarticle/${id}`)
      .pipe(map(x => {
        return x;
      }));
  }
}

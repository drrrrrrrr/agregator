import { Component, OnInit } from '@angular/core';
import {UserArticleService} from '../user-article.service';
import {IArticle} from '../../model/article';

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit {

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#000000', '#A00000', '#4ABC01', '#9ABC01', '#3ABDE0', '#ABFA11']
  };
  articles: IArticle[];
  countSaveArticle: boolean | number  = false;
  // @ts-ignore
  single;
  single1: Idata[] = [
    {
      name : 'boks',
      value : 0
    },
    {
      name : 'football',
      value : 0
    },
    {
      name : 'basketball',
      value : 0
    },
    {
      name : 'volleyball',
      value : 0
    },
    {
      name : 'hockey',
      value : 0
    },
    {
      name : 'tennis',
      value : 0
    },
    {
      name : 'mma',
      value : 0
    },
    {
      name : 'biatlon',
      value : 0
    }, {
      name : 'common',
      value : 0
    }];

  constructor(private userArticle: UserArticleService) {}
  ngOnInit() {
    this.userArticle.getSaveArticles().subscribe(data => {
      this.articles = data['articles'];
      this.articles.forEach(x => {
        if (this.single1.find(name => x['source']['id'] === name.name)) {
          this.single1.find(name => x['source']['id'] === name.name).value++;
          if (!this.countSaveArticle) {
            this.countSaveArticle = 0;
          }
          // @ts-ignore
          this.countSaveArticle++;
        } else {
          this.single1.find(name => name.name === 'common').value++;
          if (!this.countSaveArticle) {
            this.countSaveArticle = 0;
          }
          // @ts-ignore
          this.countSaveArticle++;
        }
      });
      this.single = this.single1;
      if (!this.countSaveArticle) {
        this.countSaveArticle = 0;
      }
    });

  }

  onSelect(event) {
    // console.log(event);
  }

}
interface Idata {
  name: string;
  value: number;
}



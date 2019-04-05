import { Component, OnInit } from '@angular/core';
import {ContentService} from './content.service';
import {IArticle} from '../model/article';
import {UserCategoryService} from '../user/user-category.service';
import {AuthService} from '../auth/auth.service';
import {UserArticleService} from '../user/user-article.service';
import {UserArticle} from '../model/userArticle';
import {zip} from 'rxjs';
import {categoriesMap} from '../model/categoriesMap';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  articles: IArticle[];
  categories: string[];
  sources: string[];
  userEmail: string | boolean;
  saveArticles: IArticle[] | boolean = [];
  activeCategory: string;
  constructor(private contentService: ContentService,
              private userCategories: UserCategoryService,
              private userArticleService: UserArticleService,
              private auth: AuthService) { }

  ngOnInit() {

    this.auth.checkAuth().subscribe(user => {
      if (user) {
        this.userEmail = user['email'];
        this.userCategories.getCategories().subscribe(data => {
          this.categories = data['categories'] || [];
          this.sources = data['sources'];
          if (this.categories.length > 0) {
            const nameCategory = this.categories[0];
            this.activeCategory = nameCategory;
            zip(this.contentService.getCategory(nameCategory), this.userArticleService.getSaveArticles()).subscribe(dataC => {
              // @ts-ignore
              const first: IArticle[] = dataC[0];
              this.saveArticles = dataC[1]['articles'] || [];
              // @ts-ignore
              this.saveArticles.forEach(saveAr => {
                const item = first.find(article => article.title === saveAr.title);
                if (item) {
                  item.author = 'yes';
                }
              });
              this.articles = first;
            });
          }});
      } else {
        this.activeCategory = 'football';
        this.userEmail = false;
        this.saveArticles = false;
        this.contentService.getCategory(this.activeCategory).subscribe(data => {
          // @ts-ignore
          this.articles = data;
        });

        this.userCategories.getSources().subscribe(data => {
          this.sources = data;
        });
        this.userCategories.getCategories().subscribe(data => {
          this.categories = data;
        });
        this.auth.checkAuth().subscribe(data => {
          if (data) {
            this.userEmail = data['email'];
          }});
      }
    });
  }

  uploadActiveCategory(category, sources) {
    this.auth.checkAuth().subscribe(user => {
      if (user) {
        zip(this.contentService.getCategory(category, sources), this.userArticleService.getSaveArticles()).subscribe(data => {
          // @ts-ignore
          const first: IArticle[] = data[0];
          this.saveArticles = data[1]['articles'] || [];
          // @ts-ignore
          this.saveArticles.forEach(saveAr => {
            const item = first.find(article => article.title === saveAr.title);
            if (item) {
              item.author = 'yes';
            }
          });
          this.articles = first;
        });
      } else {
        this.contentService.getCategory(category).subscribe(data => {
          // @ts-ignore
          this.articles = data;
        });
      }
    });
  }
  onSaveArticle(article) {
    if (this.saveArticles  &&  !this.checkOnSave(article)) {
      return;
    }
    article['source'].id = this.activeCategory;
    // @ts-ignore
    this.userArticleService.saveArticle(this.userEmail, article, this.saveArticles).subscribe(data => {
    });
  }
  onDeleteArticle(article) {
    // @ts-ignore
    this.saveArticles = this.saveArticles.filter(x => x.title === article.title);
    // @ts-ignore
    this.userArticleService.deleteArticle(this.userEmail, this.saveArticles).subscribe(data => {});
  }
  checkOnSave(article): boolean {
    // @ts-ignore
    for (const x of this.saveArticles) {
      if (x.title === article.title) {
        return false;
      }
    }
    return true;
  }
  setActiveCategories(category) {
    this.activeCategory = category;
  }

  changeNameCategories(name) {
    // @ts-ignore
    const cat = new Map(categoriesMap);
    return cat.get(name);
  }





}

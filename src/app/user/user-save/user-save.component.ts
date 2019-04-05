import { Component, OnInit } from '@angular/core';
import {UserArticleService} from '../user-article.service';
import {IArticle} from '../../model/article';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.css']
})
export class UserSaveComponent implements OnInit {

  constructor(private userCategories: UserArticleService,
              private auth: AuthService) { }
  saveArticles: IArticle[];
  ngOnInit() {
    this.userCategories.getSaveArticles().subscribe(data => {
      this.saveArticles = data['articles'] || [];
    });
  }
  onDelete(event) {
    this.saveArticles = this.saveArticles.filter(data => data.title !== event.title);
    this.auth.checkAuth().subscribe(data => {
      this.userCategories.deleteArticle(data['email'], this.saveArticles);
    });

  }


}

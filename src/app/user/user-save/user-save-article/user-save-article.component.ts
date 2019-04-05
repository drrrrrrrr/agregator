import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IArticle} from '../../../model/article';

@Component({
  selector: 'app-user-save-article',
  templateUrl: './user-save-article.component.html',
  styleUrls: ['./user-save-article.component.css']
})
export class UserSaveArticleComponent implements OnInit {

  @Input() article;
  @Output() deleteEmitter  = new EventEmitter<IArticle>();
  constructor() { }

  ngOnInit() {
  }
  delete() {
    this.deleteEmitter.emit(this.article);
  }

}

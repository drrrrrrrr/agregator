import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IArticle} from '../../model/article';
import {UserArticleService} from '../../user/user-article.service';

@Component({
  selector: 'app-footer-content',
  templateUrl: './footer-content.component.html',
  styleUrls: ['./footer-content.component.css']
})
export class FooterContentComponent implements OnInit {

  @Input() article: IArticle;
  @Input() canSave: boolean;
  @Output() saveArticle = new EventEmitter<IArticle>();
  @Output() deleteArticle = new EventEmitter<IArticle>();
  saving: boolean;
  constructor() { }

  ngOnInit() {
    this.saving = this.article.author === 'yes';
    if (this.article.description.length > 800)
     this.article.description =   this.article.description.substring(0, 800) + "...";
  }
  save() {
    this.saving = true;
    this.saveArticle.emit(this.article);
  }
  delete() {
    this.saving = false;
    this.deleteArticle.emit(this.article);
  }

}

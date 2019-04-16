import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IArticle} from '../../model/article';
import {ContentService} from '../content.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-next-content',
  templateUrl: './next-content.component.html',
  styleUrls: ['./next-content.component.css']
})
export class NextContentComponent implements OnInit {

  constructor(  private route: ActivatedRoute, private contentService: ContentService, private auth: AuthService , private router: Router) { }
  article: IArticle;
  isActive = true;
  commentTrue = false;
  isAuthorize = false;
  userEmail: string;
  commentArray = [];
  @ViewChild('comment') comment: ElementRef;
  ngOnInit( ) {
    this.getArticle();
    this.auth.checkAuth().subscribe(user => {
      if (user) {
        this.isAuthorize = true;
        this.userEmail = user['email'];
      }
    });
  }
  getArticle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contentService.getArticleFromId(id).subscribe(data => {
      // @ts-ignore
      this.article = data;
    });
    if (this.article) {
      this.isActive = true;
    }
  }

  showComment() {
    this.commentTrue = !this.commentTrue;
  }
  addComment(text) {
    const object = { date: new Date().toTimeString(), description : text, email: this.userEmail };
    this.comment.nativeElement.value = '';
    this.commentArray.push(object);
  }
  deleteComment(text) {
    this.commentArray.splice(this.commentArray.indexOf(x => x.description === text), 1);
  }
  returnToMain(){
    this.router.navigate(['/']);
  }

}

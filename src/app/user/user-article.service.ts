import {Injectable} from '@angular/core';
import {UserCategory} from '../model/category';
import {flatMap, map, switchMap, take} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {UserArticle} from '../model/userArticle';
import {IArticle} from '../model/article';

@Injectable()

export  class UserArticleService {
  items: Observable<UserCategory[]>;
  constructor(private afs: AngularFirestore, private auth: AuthService) {}
  getSaveArticles() {
    // @ts-ignore
    this.items = this.afs.collection<UserArticle[]>('articles').snapshotChanges();
    return this.auth.checkAuth().pipe(switchMap((data) => {
      if (data) {
        const email = data['email'];
        return this.getArticlesByEmail(email);
    }}));
  }
  getArticlesByEmail(email: string): Observable<string[]> {
    // @ts-ignore
    return this.items.pipe(map((data) => {
      return data.find(x => x['payload'].doc.data().email === email);
    }), map(x => {
      if (x) {
      const articles: IArticle[] = x['payload'].doc.data().articles;
      const id = x['payload'].doc.id;
      return { id, articles };
      }
      return '';
    }));
  }
  saveArticle(id, article: IArticle, articles: IArticle[]) {
    const se =  articles ||  [];
    se.push(article);
    return from(this.afs.collection<UserArticle[]>('articles').doc(id).set({
      email : id,
      articles: se
    }));
    }
    deleteArticle(id, articles: IArticle[]) {
      const se =  articles ||  [];
      return from(this.afs.collection<UserArticle[]>('articles').doc(id).set({
        email : id,
        articles: se
      }));
    }
    getIdFromEmail(email) {
    return this.items.pipe(map((data) => {
      return data.find(x => x['payload'].doc.data().email === email);
    }), map(x => {
        return x['payload'].doc.id;
    }));
  }
  addSaveArticle() {
  }
}

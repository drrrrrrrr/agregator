import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {UserCategory} from '../model/category';
import {AuthService} from '../auth/auth.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class UserCategoryService {

  moc_ru_categories = [ 'business', 'entertainment', 'health', 'science' , 'sports', 'technology'];
  moc_ru_categories2 = [ 'football', 'basketball', 'volleyball', 'hockey' , 'tennis', 'mma', 'biatlon', 'boks'];
  moc_ru_sources = ['fnk', 'sportbox', 'sports.ru', 'bloodandsweat', 'championat', 'vsenabox'];
  items: Observable<UserCategory[]>;
  constructor(private afs: AngularFirestore, private auth: AuthService) {}
  getCategories(): Observable<string[]> {
    // @ts-ignore
    this.items = this.afs.collection<UserCategory>('categories').snapshotChanges();
    return this.auth.checkAuth().pipe(switchMap((data) => {
      if (data) {
        const email = data['email'];
        return this.getCategoriesByEmail(email);
      } else {
        return of(this.moc_ru_categories2);
      }
    }));
  }

  getSources(): Observable<string[]> {
    return of(this.moc_ru_sources);
  }

  getCategoriesByEmail(email: string): Observable<string[]> {
    // @ts-ignore
    return this.items.pipe(map((data) => {
      return data.find(x => x['payload'].doc.data().email === email);
    }), map(x => {
        if (x) {
          const cat: Object = x['payload'].doc.data().categories;
          const source: Object = x['payload'].doc.data().sources;
          const id = x['payload'].doc.id;
          return {id, categories: cat, sources : source};
        }
        return x;
    }));
  }

  categoriesInit(email) {
    return from(this.afs.collection<UserCategory>('categories').add({ email, categories:  this.moc_ru_categories2, sources: this.moc_ru_sources}));
  }
  updateCategories(id, category: string[], source: string[]) {
    if (source) {
      return from(this.afs.collection<UserCategory>('categories').doc(id).update({
        categories: category,
        sources: source
      }));
    }
    return from(this.afs.collection<UserCategory>('categories').doc(id).update({
      categories: category
    }));
  }
}

import { Component, OnInit } from '@angular/core';
import {UserCategoryService} from '../user-category.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ComponentCanDeactivate} from '../exitPanel.guard';
import {categoriesMap} from '../../model/categoriesMap';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, ComponentCanDeactivate {
  categories = new Map([
     ['football' , false],
     ['basketball', false],
     ['volleyball', false],
     ['hockey', false],
     ['tennis', false],
     ['mma', false],
     ['biatlon', false]
  ]);
  sources = new Map([
    ['fnk' , false],
    ['sportbox', false],
    ['sports.ru', false],
    ['bloodandsweat', false],
    ['championat', false],
    ['vsenabox',false]
  ]);
  changeCategories: string[] = [];
  changeSources: string[] = [];
  userId: string;
  bindKeys;
  bindKeysSource;
  constructor(private userCategories: UserCategoryService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.userCategories.getCategories().subscribe(data => {
      console.log(data);
      this.userId = data['id'];
      const cat = data['categories'];
      const source = data['sources'];
      cat.forEach(x => {
        this.categories.set(x, true);
      });
      source.forEach(x => {
        this.sources.set(x, true);
      });
      this.bindKeys = Array.from(this.categories.keys());
      this.bindKeysSource = Array.from(this.sources.keys());
    });
  }
  changeCheckBox(value) {
    this.checkOnChanges(value);
    this.categories.set(value, !this.categories.get(value));
  }

  changeCheckBoxSource(value) {
    this.checkOnChangesSource(value);
    this.sources.set(value, !this.sources.get(value));
  }
  checkOnChangesSource(value){
    const changes = this.changeSources.indexOf(value);
    if (changes >= 0) {
      this.changeSources.splice(changes, 1);
    } else  {
      this.changeSources.push(value);
    }
  }
  checkOnChanges(value) {
    const changes = this.changeCategories.indexOf(value);
    if (changes >= 0) {
      this.changeCategories.splice(changes, 1);
    } else  {
      this.changeCategories.push(value);
    }

  }
  saveChanges(e) {
    e.preventDefault();
    const listCategory = [];
    const listSource = [];
    for (const item of Array.from(this.categories.keys())) {
      if (this.categories.get(item)) {
        listCategory.push(item);
      }
    }
    for (const item of Array.from(this.sources.keys())) {
      if (this.sources.get(item)) {
        listSource.push(item);
      }
    }
    if (listCategory.length === 0) {
      this.flashMessage.show('Хотя бы одна категория должна быть выбрана!', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }
    if (listSource.length === 0) {
      this.flashMessage.show('Хотя бы один источник должен быть выбран!', { cssClass: 'alert-danger', timeout: 2000 });
      return;
    }
    this.userCategories.updateCategories(this.userId, listCategory, listSource).subscribe(() => {
      this.flashMessage.show('Изменения сохранены', { cssClass: 'alert-success', timeout: 2000 });
      this.changeCategories = [];
    }, () => {
      this.flashMessage.show('Изменения не сохранены', { cssClass: 'alert-danger', timeout: 2000 });
    });
  }

  canDeactivate() {
    if (this.changeCategories.length === 0) {
      return true;
    }
    return confirm('Вы хотите покинуть страницу не сохранив?');
  }
  changeNameCategories(name) {
    // @ts-ignore
    const cat = new Map(categoriesMap);
    return cat.get(name);
  }
}

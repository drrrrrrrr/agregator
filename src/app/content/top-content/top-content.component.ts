import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {categoriesMap} from '../../model/categoriesMap';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent implements OnInit {

  @Input() categories: string[];
  @Input() sources: string[];
  currentActiveCategory: string;
  @Output() activeCategory = new EventEmitter<string>();
  @Output() activeCategory2 = new EventEmitter<string>();
  @Output() activeSources = new EventEmitter<string[]>();
  currentActiveSources: string[] = [];


  constructor() { }

  ngOnInit() {
    this.currentActiveSources = this.sources || [];
  }
  changeActiveCategory(category) {
    if (this.currentActiveCategory === category) {
      return;
    }
    this.currentActiveCategory = category;
    this.activeCategory.emit(category);
    this.activeCategory2.emit(category);
  }
  changeNameCategories(name) {
    // @ts-ignore
    const cat = new Map(categoriesMap);
    return cat.get(name);
  }
  checkColor(x) {
    return x === this.currentActiveCategory;
  }
  changeActiveSource(name) {
    const indexElement = this.currentActiveSources.indexOf(name);
    if (indexElement >= 0) {
      this.currentActiveSources.splice(indexElement, 1);
    }else
      this.currentActiveSources.push(name);
    this.activeSources.emit(this.currentActiveSources);
  }
  checkColorSource(name) {
    console.log(this.sources);
    const indexElement = this.currentActiveSources.indexOf(name);
    return indexElement >= 0;
  }


}

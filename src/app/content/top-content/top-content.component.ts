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
  @Output() activeSubTitle = new EventEmitter<string[]>();
  currentActiveSources: string[] = [];
  currentActiveSubTitle: number = -1;

  // @ts-ignore
  subCategoriesMap = new Map ([["футбол",["france","holland","spain","germany","england","league","uefa_cup"]],
    ["баскетбол", ["nba","vtb"]],
    ["хоккей", ["khl","nhl"]],
    ["волейбол", ["russian","eurocups"]],
    ["MMA", ["bellator","UFC"]]


  ]);
  // @ts-ignore
  cat = new Map(categoriesMap);
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
    // const cat = new Map(categoriesMap);
    return this.cat.get(name);
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
  getSubCategories(name) {
    return this.subCategoriesMap.get(this.cat.get(name));
  }

  changeActiveSubTitle(name) {
    this.currentActiveSubTitle = this.subCategoriesMap.get(this.cat.get(this.currentActiveCategory)).indexOf(name);
    // this.currentActiveSubTitle = this.cat.get(name);
    // if (indexElement >= 0) {
    //   this.currentActiveSources.splice(indexElement, 1);
    // }else
    //   this.currentActiveSources.push(name);
    // this.activeSources.emit(this.currentActiveSources);
    this.activeSubTitle.emit(name);
  }
  checkColorSubTitle(name) {
    return this.currentActiveSubTitle === this.subCategoriesMap.get(this.cat.get(this.currentActiveCategory)).indexOf(name);
  }
  convert(x) {
    let  map = new Map([["france","Франция"],
      ['spain', 'Испания'],
      ['germany', 'Германия'],
      ['england', 'Англия'],
      ['league', 'Лига Чемпионов'],
      ['uefa_cup', 'Лига Европы'],
      ['holland', 'Голандия'],
      ['nba', 'NBA'],
      ['vtb', 'VTB'],
      ['russian', 'Россия'],
      ['eurocups', 'Еврокубки'],
      ['bellator', 'Bellator']]);
    if( map.has(x)) {
      return map.get(x);
    } return x;
  }

}

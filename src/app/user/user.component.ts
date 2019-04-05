import { Component, OnInit } from '@angular/core';
import {UserCategoryService} from './user-category.service';
import {UserCategory} from '../model/category';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  data: UserCategory[];
  constructor(private categories: UserCategoryService) { }

  ngOnInit() {
    // this.categories.getCategories().subscribe((data: string[]) => {
    //   console.log(data);
    // });

  }
  findUserCategories() {

  }

}

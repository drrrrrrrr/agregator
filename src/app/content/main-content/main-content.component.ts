import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {tick} from '@angular/core/testing';
import {BehaviorSubject, interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit , OnDestroy{

  @Input() saveArticles;
  private destroy = new Subject();
  currentArticle;

  constructor() { }

  ngOnInit() {
    interval(5000).pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.currentArticle = this.saveArticles[data % this.saveArticles.length];
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }


}

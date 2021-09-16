import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'cp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalSize: number;
  @Input() pageSize: number;
  @Input() currentPage: number;
  @Input() stateUpdate: Subject<any>;
  noOfPages: number;
  pagesArr = [];
  showAll = true;
  prevPage: number;
  nextPage: number = 1;
  showRightEllipsis = true;
  showLeftEllipsis = true;
  showFirstBtn = true;
  showLastBtn = true;
  showPrevBtn = true;
  showNextBtn = true;
  startingPoint: number;
  endingPoint: number;
  lastPage: number;
  subscriber: Subscription;
  @Output() pageChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initPagination();
    if (this.stateUpdate !== undefined && this.stateUpdate !== null) {
      this.subscriber = this.stateUpdate.subscribe((res: any) => {
        this.totalSize = res.size;
        this.currentPage = res.currentPage;
        this.pageSize = res.pageSize;
        this.pagesArr = [];
        this.showAll = true;

        this.nextPage = 1;
        this.showRightEllipsis = true;
        this.showLeftEllipsis = true;
        this.showFirstBtn = true;
        this.showLastBtn = true;
        this.showPrevBtn = true;
        this.showNextBtn = true;
        this.initPagination();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  initPagination() {
    this.startingPoint = 1;
    this.endingPoint = this.pageSize;
    if (this.totalSize < this.endingPoint) {
      this.endingPoint = this.totalSize;
    }
    this.noOfPages = Math.ceil(this.totalSize / this.pageSize);
    for (let i = 0; i < this.noOfPages; i++) {
      this.pagesArr.push(i + 1);
    }

    this.showAll = this.pagesArr.length <= 7;
    this.lastPage = this.pagesArr[this.pagesArr.length - 1];
    if (!this.showAll) {
      this.handleUIChanges();
    }
  }

  handleUIChanges() {
    this.prevPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
    this.startingPoint = (this.currentPage - 1) * this.pageSize + 1;
    this.endingPoint = (this.currentPage - 1) * this.pageSize + this.pageSize;
    if (this.totalSize < this.endingPoint) {
      this.endingPoint = this.totalSize;
    }
    if (this.prevPage < this.pagesArr[0]) {
      this.showPrevBtn = false;
    } else {
      this.showPrevBtn = true;
    }
    if (this.currentPage >= this.pagesArr[this.pagesArr.length - 1]) {
      this.showNextBtn = false;
    } else {
      this.showNextBtn = true;
    }

    if (this.prevPage - 1 < 2) {
      this.showLeftEllipsis = false;
      this.showFirstBtn = false;
    } else {
      this.showLeftEllipsis = true;
      this.showFirstBtn = true;
    }
    if (this.pagesArr[this.pagesArr.length - 1] - this.nextPage < 2) {
      this.showRightEllipsis = false;
      this.showLastBtn = false;
    } else {
      this.showRightEllipsis = true;
      this.showLastBtn = true;
    }
  }

  goBack() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.handleUIChanges();
      this.valueChanged();
    }
  }

  goNext() {
    if (this.currentPage < this.pagesArr[this.pagesArr.length - 1]) {
      this.currentPage += 1;
      this.handleUIChanges();
      this.valueChanged();
    }
  }

  goToPage(pageNo: number) {
    this.currentPage = pageNo;
    if (!this.showAll) {
      this.handleUIChanges();
    } else {
      this.startingPoint = (this.currentPage - 1) * this.pageSize + 1;
      this.endingPoint = (this.currentPage - 1) * this.pageSize + this.pageSize;
    }
    this.valueChanged();
  }

  getCurrentPageStyle(pageNo: number) {
    if (this.currentPage === pageNo) {
      return {
        width: '30px',
        height: '31px',
        background: '#1A73E8',
        'border-radius': '6px',
        'text-align': 'center',
      };
    } else {
      return {
        width: '30px',
        height: '31px',
        background: '#E8F1FD',
        'border-radius': '6px',
        'text-align': 'center',
      };
    }
  }

  valueChanged() {
    // You can give any function name
    this.pageChange.emit(this.currentPage);
  }

  compareEndPoint(endingPoint, totalSize): boolean {
    return endingPoint > totalSize && this.currentPage === this.lastPage;
  }
}

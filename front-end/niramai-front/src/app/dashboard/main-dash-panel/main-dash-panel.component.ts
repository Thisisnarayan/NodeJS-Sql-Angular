import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-main-dash-panel',
  templateUrl: './main-dash-panel.component.html',
  styleUrls: ['./main-dash-panel.component.scss']
})
export class MainDashPanelComponent implements OnInit {
  dataSource : any =[];
  sortedData : any = [];
  displayedColumns: string[] = ['case_id', 'tumor_site', 'BMI','tumor_size_in_cm', 'age', 'height_in_cm', 'weight_in_kg'];
  loading = true;
  currentPage = 1;
  totalSize: number;
  pageSize = 10;
  searchedQuery : string = null;
  searchTerm$ = new Subject<any>();
  paginationStateUpdate: Subject<any> = new Subject();
  constructor(private api : ApiService) { 
    
    this.searchTerm$.subscribe((e: Event) => {
      this.dataSource = this.searchEntries(
        (e.target as HTMLInputElement).value
      );
       // when data size is updated pagination should also update
       this.currentPage = 1;
       this.totalSize =  this.dataSource.length;
       this.sortedData = this.dataSource.slice();
       this.pageSize = 10;
       this.paginationStateUpdate.next({size : this.dataSource.length , pageSize : 10 , currentPage : 1 })
    });
  }

  ngOnInit(): void {
    this.api.getAllTumor().subscribe((res : any) => {
      this.loading = false;
      if(res.hasOwnProperty('success')) {
        this.dataSource = res.success.data;
        this.api.tumorData.set(res.success.data);
        this.totalSize =  this.dataSource.length;
      }
    },(error : any) => {

    });
  }

  pageChangeCounter(event) {
    this.currentPage = event;
  }

  searchEntries(term) {
    if (term !== null && term !== undefined) {
      if (term.length <= 0) {
        return this.api.tumorData.get();
      }
      console.log(term.toLowerCase());
      console.log(this.api.tumorData.get());
      console.log(
        this.api.tumorData.get()
        .filter((o) => o.case_id.toLowerCase().includes(term.toLowerCase()))
      );
      return this.api.tumorData.get()
        .filter((o) => o.case_id.toLowerCase().includes(term.toLowerCase()));
    } else {
      return this.api.tumorData.get();
    }
  }

  returnCaseUrl(id) {
    return   `/api/${id}`;
  }
  sortData(sort : any) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'case_id': return compare(a.case_id, b.case_id, isAsc);
        case 'BMI': return compare(a.BMI, b.BMI, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'weight_in_kg': return compare(a.weight_in_kg, b.weight_in_kg, isAsc);
        case 'height_in_cm': return compare(a.height_in_cm, b.height_in_cm, isAsc);
        case 'tumor_size_in_cm': return compare(a.tumor_size_in_cm, b.tumor_size_in_cm, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
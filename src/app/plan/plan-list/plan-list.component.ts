import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../../data-filter.pipe';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  constructor(private http: Http) { }

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  ngOnInit(): void {
      this.http.get(params.url + 'api/plan')
          .subscribe((data)=> {
              setTimeout(()=> {
                  this.data = data.json();
              }, 1000);
          });
  }

  public toInt(num: string) {
      return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }
}

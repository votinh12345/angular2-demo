import { Component, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../../data-filter.pipe';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

import { PlanMst } from '../../common/models/plan-mst';
import { PlanClass } from '../../common/const/plan_class';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }

  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "opt_packcode";
  public sortOrder = "asc";

  ngOnInit(): void {
      this.http.get(params.url + 'api/option')
          .subscribe((data)=> {
              setTimeout(()=> {
                  this.data = data.json().data;
              }, 1000);
          });
  }

}

import { Component, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../../data-filter.pipe';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

import { PlanMst } from '../../common/models/plan-mst';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanListComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  
  selected: string;
  output: string;

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;

  planDetail : Array<PlanMst>;
  titleDetail : string;

  @ViewChild('modalSave')
  modal1: ModalComponent;

  constructor(private http: Http, private router: Router) {
    this.planDetail = [];
  }

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

  public closed() {
      this.output = '(closed) ' + this.selected;
  }

  public  dismissed() {
      this.output = '(dismissed)';
  }

  public opened() {
      this.output = '(opened)';
  }

  public  navigate() {
      this.router.navigateByUrl('/hello');
  }

  public openDetail(event, plan_code) {
    event.preventDefault();
    this.http.get(params.url + 'api/plan/detail/' + plan_code)
          .subscribe(
            response => {
                  //khoi tao data
                    let dataResponse = response.json().data;
                    if (response.json().result === 1) {
                      let plan = new PlanMst(dataResponse.plan_code, dataResponse.plan_name, dataResponse.plan_desc,
                       dataResponse.plan_class, dataResponse.plan_initial_dis, dataResponse.plan_start_date, dataResponse.plan_end_date,
                       dataResponse.plan_type, dataResponse.plan_last_upd_user, dataResponse.plan_last_upd_date);

                      this.planDetail.push(plan);
                      this.titleDetail = 'プラン詳細';
                      this.modal.open();  
                    } else {
                      alert(response.json().message);  
                    }
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
          );
  }

}

import { Component, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../../data-filter.pipe';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

import { PlanMst } from '../../common/models/plan-mst';
import { PlanClass } from '../../common/const/plan_class';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanListComponent implements OnInit {

  public planForm : FormGroup;

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

  @ViewChild('parentModal')
  modal1: ModalComponent;

  @ViewChild('modelDelete')
  modal2: ModalComponent;

  modelPlan = new PlanMst();
  private planCode : string;

  planClass = [
     new PlanClass(0, '新規' ),
     new PlanClass(1, 'MNP' ),
     new PlanClass(2, '共用' )
  ];

  constructor(private http: Http, private router: Router, private fb:FormBuilder) {
    this.planDetail = [];

    this.planForm = this.fb.group({
      'plan_code' : [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('[0-9 ]*')])],
      'plan_name': [null,  Validators.compose([Validators.required, Validators.maxLength(80)])],
      'plan_desc' : [null, Validators.required],
      'plan_class' : [false],
      'plan_initial_dis' : [false],
      'plan_start_date' : [false],
      'plan_end_date' : [false]
    })
    
  }

  number(control:FormControl) {
      return parseInt(control.value) % 10 == 0 ? null : {
        divisibleByTen: true
      }
  }
  
  submitForm(value: any){
    console.log(value);
    return false;
  }

  private data;
  private filterQuery = "";
  private rowsOnPage = 10;
  private sortBy = "plan_code";
  private sortOrder = "asc";

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
                      if (this.planDetail.length > 0){
                        this.planDetail.splice(0, 1);
                      }
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

  public edit(event, plan_code){
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
                      this.modelPlan = plan;
                      this.titleDetail = 'プラン詳細';
                      this.modal1.open(); 
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

  public add(event){
    event.preventDefault();
    this.modelPlan = new PlanMst();
    this.titleDetail = '新規プラン追加';
    this.modal1.open();
  }

  public delete(event, plan_code){
    event.preventDefault();
    this.titleDetail = '削除確認';
    this.planCode = plan_code;
    this.modal2.open(); 
  }

  public submit(event){
    event.preventDefault();
    var body = 'dataPost=' + this.planCode;
    var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(params.url + 'api/plan/delete', body, {headers : headers})
            .subscribe(
                response => {
                    this.http.get(params.url + 'api/plan')
                      .subscribe((data)=> {
                          setTimeout(()=> {
                              this.data = data.json();
                          }, 1000);
                      });
                    this.modal2.close();
                },
                error => {
                    alert(error.text());
                    console.log(error.text());
                }
            );
  }

}

import { Component, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

import { OptionMst } from '../../common/models/opt-mst';
import { PlanClass } from '../../common/const/plan_class';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OptionListComponent implements OnInit {

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

  optionDetail : Array<OptionMst>;
  titleDetail : string;

  @ViewChild('parentModal')
  modal1: ModalComponent;

  @ViewChild('modelDelete')
  modal2: ModalComponent;

  modelOption = new OptionMst();
  private optPackcode : string;
  private optCode : string;

  constructor(private http: Http, private router: Router) {
      this.optionDetail = [];
   }  

  private data;
  private filterQuery = "";
  private rowsOnPage = 10;
  private sortBy = "opt_packcode";
  private sortOrder = "asc";

  ngOnInit(): void {
      this.http.get(params.url + 'api/option')
          .subscribe((data)=> {
              setTimeout(()=> {
                  this.data = data.json().data;
              }, 1000);
          });
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

  public openDetail(event, opt_packcode, opt_code) {
    event.preventDefault();
    this.http.get(params.url + 'api/option/detail/' + opt_packcode + '/' + opt_code)
          .subscribe(
            response => {
                  //khoi tao data
                    let dataResponse = response.json().data;
                    if (response.json().result === 1) {
                      let plan = new OptionMst(dataResponse.opt_packcode, dataResponse.opt_packname, dataResponse.opt_packdesc,
                       dataResponse.opt_code, dataResponse.opt_name, dataResponse.opt_desc, dataResponse.opt_flag,
                       dataResponse.opt_class, dataResponse.opt_start_date, dataResponse.opt_end_date, dataResponse.last_upd_user, dataResponse.last_upd_date);
                      if (this.optionDetail.length > 0){
                        this.optionDetail.splice(0, 1);
                      }
                      this.optionDetail.push(plan);
                      this.titleDetail = 'オプション詳細';
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

  public edit(event, opt_packcode, opt_code){
    event.preventDefault();
   this.http.get(params.url + 'api/option/detail/' + opt_packcode + '/' + opt_code)
          .subscribe(
            response => {
                  //khoi tao data
                    let dataResponse = response.json().data;
                    if (response.json().result === 1) {
                      let option = new OptionMst(dataResponse.opt_packcode, dataResponse.opt_packname, dataResponse.opt_packdesc,
                       dataResponse.opt_code, dataResponse.opt_name, dataResponse.opt_desc, dataResponse.opt_flag,
                       dataResponse.opt_class, dataResponse.opt_start_date, dataResponse.opt_end_date, dataResponse.last_upd_user, dataResponse.last_upd_date);
                      this.modelOption = option;
                      this.titleDetail = '新規オプション追加';
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
    this.modelOption = new OptionMst();
    this.modal1.open();
  }

  public delete(event, opt_packcode, opt_code){
    event.preventDefault();
    this.titleDetail = '削除確認';
    this.optPackcode = opt_packcode;
    this.optCode = opt_code;
    this.modal2.open(); 
  }

  public submit(event){
    event.preventDefault();
    let optPackcodePost = this.optPackcode;
    let optCodePost = this.optCode;
    let dataPost = JSON.stringify({optPackcodePost, optCodePost});

    var body = 'dataPost=' + dataPost;
    var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(params.url + 'api/option/delete', body, {headers : headers})
            .subscribe(
                response => {
                    this.http.get(params.url + 'api/option')
                      .subscribe((data)=> {
                          setTimeout(()=> {
                              this.data = data.json().data;
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

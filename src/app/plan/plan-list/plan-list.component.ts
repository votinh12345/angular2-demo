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

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanListComponent implements OnInit {

  @ViewChild('modal')
  modal: ModalComponent;
  items: string[] = ['item1', 'item2', 'item3'];
  selected: string;
  output: string;

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;

  constructor(private http: Http, private router: Router) {}

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

  public open(event, plan_code) {
    event.preventDefault();
    this.http.get(params.url + 'api/plan/show')
          .subscribe((data)=> {
              console.log('212121');
          });
    this.modal.open();
  }

}

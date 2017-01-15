import { Component, OnInit , ViewChild, ViewEncapsulation} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PagerService } from '../../_services/index';
import { params } from '../../config/params';
import { DataTableModule } from "angular2-datatable";


import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';

import { Product } from '../../common/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  constructor(private http: Http, private router: Router) {
    this.productDetail = [];
 }

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

  productDetail : Array<Product>;
  titleDetail : string;

  private data;
  private filterQuery = "";
  private rowsOnPage = 10;
  private sortBy = "goods_jan";
  private sortOrder = "asc";

  ngOnInit(): void {
      this.http.get(params.url + 'api/product')
          .subscribe((data)=> {
              setTimeout(()=> {
                  this.data = data.json().data;
              }, 1000);
          });
  }


  public openDetail(event, goods_jan) {
    event.preventDefault();
    this.http.get(params.url + 'api/product/detail/' + goods_jan)
          .subscribe(
            response => {
                  //khoi tao data
                    let dataResponse = response.json().data;
                    if (response.json().result === 1) {
                      let plan = new OptionMst(dataResponse.opt_packcode, dataResponse.opt_packname, dataResponse.opt_packdesc,
                       dataResponse.opt_code, dataResponse.opt_name, dataResponse.opt_desc, dataResponse.opt_flag,
                       dataResponse.opt_class, dataResponse.opt_start_date, dataResponse.opt_end_date, dataResponse.last_upd_user, dataResponse.last_upd_date);
                      if (this.productDetail.length > 0){
                        this.productDetail.splice(0, 1);
                      }
                      this.productDetail.push(plan);
                      this.titleDetail = '商品情報詳細';
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

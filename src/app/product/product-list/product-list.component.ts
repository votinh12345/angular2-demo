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

  public closed() {
      this.output = '(closed) ' + this.selected;
  }

  public  dismissed() {
      this.output = '(dismissed)';
  }

  public opened() {
      this.output = '(opened)';
  }

  public openDetail(event, goods_jan) {
    event.preventDefault();
    this.http.get(params.url + 'api/product/detail/' + goods_jan)
          .subscribe(
            response => {
                  //khoi tao data
                    let dataResponse = response.json().data;
                    if (response.json().result === 1) {
                      let product = new Product(dataResponse.goods_jan, dataResponse.goods_name, dataResponse.goods_name2,
                       dataResponse.goods_model_id, dataResponse.goods_sim_type, dataResponse.goods_sim_class, dataResponse.goods_color,
                       dataResponse.goods_size, dataResponse.goods_maker, dataResponse.goods_decr, dataResponse.last_upd_date, dataResponse.plan_name, dataResponse.option_name);
                      if (this.productDetail.length > 0){
                        this.productDetail.splice(0, 1);
                      }
                      this.productDetail.push(product);
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

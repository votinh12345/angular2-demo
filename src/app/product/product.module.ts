import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product.routing';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from './data-filter-product.pipe';


import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule(
	{
		imports : [BrowserModule, FormsModule, CommonModule, ProductRoutingModule, DataTableModule, Ng2Bs3ModalModule],
		declarations : [ProductListComponent, DataFilterPipe]
	}
)

export class ProductModule{}
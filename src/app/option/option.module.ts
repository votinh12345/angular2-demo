import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { OptionListComponent } from './option-list/option-list.component';
import { OptionsRoutingModule } from './option.routing';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from './data-filter-option.pipe';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule(
	{
		imports : [BrowserModule, FormsModule, CommonModule, OptionsRoutingModule, DataTableModule, Ng2Bs3ModalModule],
		declarations: [OptionListComponent, DataFilterPipe]
	}
)

export class OptionModule{}
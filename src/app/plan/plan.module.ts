import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { PlanListComponent } from './plan-list/plan-list.component';
import { PlansRoutingModule } from './plan.routing';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../data-filter.pipe';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule(
	{
		imports : [BrowserModule, FormsModule, CommonModule, PlansRoutingModule, DataTableModule, Ng2Bs3ModalModule, ReactiveFormsModule],
		declarations : [PlanListComponent, DataFilterPipe]
	}
)

export class PlanModule{}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule }      from '@angular/common';

import { PlanListComponent } from './plan-list/plan-list.component';
import { PlansRoutingModule } from './plan.routing';

import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe }   from '../data-filter.pipe';


@NgModule(
	{
		imports : [BrowserModule, FormsModule, CommonModule, PlansRoutingModule, DataTableModule],
		declarations : [PlanListComponent, DataFilterPipe]
	}
)

export class PlanModule{}
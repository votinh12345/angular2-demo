import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PlanListComponent } from './plan-list/plan-list.component';
import { PlansRoutingModule } from './plan.routing';

@NgModule(
	{
		imports : [BrowserModule, FormsModule, PlansRoutingModule],
		declarations : [PlanListComponent]
	}
)

export class PlanModule{}
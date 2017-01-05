import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { OptionListComponent } from './option-list/option-list.component';
import { OptionsRoutingModule } from './option.routing';

@NgModule(
	{
		imports : [BrowserModule, FormsModule, OptionsRoutingModule],
		declarations: [OptionListComponent]
	}
)

export class OptionModule{}
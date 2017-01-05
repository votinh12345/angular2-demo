import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { OptionListComponent } from './option-list/option-list.component';

const routers: Routes = [
		{
            path : 'option',
            component : OptionListComponent
        }

	];
@NgModule({
	imports : [RouterModule.forChild(routers)],
	exports : [RouterModule]
})

export class OptionsRoutingModule {}


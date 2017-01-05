import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { PlanListComponent } from './plan-list/plan-list.component';

const routers: Routes = [
		{
            path : 'plan',
            component : PlanListComponent
        }

	];
@NgModule({
	imports : [RouterModule.forChild(routers)],
	exports : [RouterModule]
})

export class PlansRoutingModule {}


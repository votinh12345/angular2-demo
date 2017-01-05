import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { PlanListComponent } from './plan/plan-list/plan-list.component';

const routers: Routes = [
		{
            path : '',
            component : PlanListComponent
        }

	];
@NgModule({
	imports : [RouterModule.forRoot(routers)],
	exports : [RouterModule]
})

export class AppRoutingModule {}
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list/product-list.component';

const routers: Routes = [
		{
            path : 'product',
            component : ProductListComponent
        }

	];
@NgModule({
	imports : [RouterModule.forChild(routers)],
	exports : [RouterModule]
})

export class ProductRoutingModule {}


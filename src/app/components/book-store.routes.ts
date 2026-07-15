import { Routes } from '@angular/router';
import { PageComponent } from './page-component/page-component';
import { OrdersFormComponent } from './orders-form-component/orders-form-component';
import { BookListComponent } from './book-list-component/book-list-component';

export const bookStoreRoutes: Routes = [

    {
        path: '',
        component: PageComponent,
        children: [

            {
                path: '',
                component: BookListComponent
            },
            {
                path: 'orders',
                component: OrdersFormComponent
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export default bookStoreRoutes;
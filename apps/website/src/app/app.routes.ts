import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '', loadChildren: () => import('@vef/website-ui').then(m=>m.WebsiteUiModule)
    }
];

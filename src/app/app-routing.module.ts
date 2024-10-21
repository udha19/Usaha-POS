import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guardsGuard } from './guards.guard';
const data = localStorage.getItem('user_id')
const routes: Routes = [
  {
    path: '',
    redirectTo: data ? 'dashboard' : 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'kasir',
    loadChildren: () => import('./kasir/kasir.module').then( m => m.KasirPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'space',
    loadChildren: () => import('./space/space.module').then( m => m.SpacePageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'page',
    loadChildren: () => import('./busines/busines.module').then( m => m.BusinesPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'kategori',
    loadChildren: () => import('./kategori/kategori.module').then( m => m.KategoriPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'crew',
    loadChildren: () => import('./crew/crew.module').then( m => m.CrewPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'belanja',
    loadChildren: () => import('./belanja/belanja.module').then( m => m.BelanjaPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'transaksi',
    loadChildren: () => import('./transaksi/transaksi.module').then( m => m.TransaksiPageModule),
    canActivate: [guardsGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then( m => m.BranchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnChanges, OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public pages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'grid'},
    { title: 'Kasir', url: '/kasir', icon: 'calculator'},
    { title: 'transaksi', url: '/transaksi', icon: 'cash'},
    { title: 'Item', url: '/item', icon: 'pricetags'},
    { title: 'Order', url: '/order', icon: 'clipboard'},
    { title: 'Kategori', url: '/kategori', icon: 'copy'},
    { title: 'Stock', url: '/belanja', icon: 'bag'},
    { title: 'Laman Usaha', url: '/page', icon: 'storefront'},
    { title: 'Space', url: '/space', icon: 'cube'},
    { title: 'Kru', url: '/crew', icon: 'people-circle'},
    { title: 'Cabang', url: '/branch', icon: 'snow'},

  ]
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  busines_name: string = localStorage.getItem('busines_name') || ''
  busines_email: string = localStorage.getItem('busines_email') || ''

  route = ''
  constructor(
    private router: Router,
    private location: Location
  ) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      this.route = this.location.path()
      this.busines_email = localStorage.getItem('busines_email') || ''
      this.busines_name = localStorage.getItem('busines_name') || ''
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }


  signOut(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}

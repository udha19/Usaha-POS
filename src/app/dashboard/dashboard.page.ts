import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  busines_data: any;
  user_id: string = '';
  total_trx = 0;
  time = new Date();
  date = {
    day: this.time.getDate(),
    month: this.time.getMonth() + 1,
    year: this.time.getFullYear(),
  };
  clock = {
    hour: this.time.getHours(),
    minute: this.time.getMinutes(),
  };
  trx = 0;
  omset = 0;
  public menus = [
    { title: 'Kasir', url: '/kasir', icon: 'calculator' },
    { title: 'transaksi', url: '/transaksi', icon: 'cash' },
    { title: 'Item', url: '/item', icon: 'pricetags' },
    { title: 'Order', url: '/order', icon: 'clipboard' },
    { title: 'Kategori', url: '/kategori', icon: 'copy' },
    { title: 'Stock', url: '/belanja', icon: 'bag' },
    { title: 'Laman Usaha', url: '/page', icon: 'storefront' },
    { title: 'Space', url: '/space', icon: 'cube' },
    { title: 'Kru', url: '/crew', icon: 'people-circle' },
    { title: 'Cabang', url: '/branch', icon: 'snow' },
  ];

  color = [
    'mx-auto icon text-[#d08770]',
    'mx-auto icon text-[#a3be8c]',
    'mx-auto icon text-[#b48ead]',
    'mx-auto icon text-[#8fbcbb]',
    'mx-auto icon text-[#88c0d0]',
    'mx-auto icon text-[#81a1c1]',
    'mx-auto icon text-[#a3be8c]',
    'mx-auto icon text-[#81a1c1]',
    'mx-auto icon text-[#5e81ac]',
    'mx-auto icon text-[#b48ead]',
  ];

  constructor(private data: SupabaseService) {}

  ngOnInit() {
    this.getSelfData();
    this.getCountData();
  }

  async getSelfData() {
    this.user_id = localStorage.getItem('user_id') || '';
    try {
      const user = await this.data.getSelf(this.user_id);
      this.busines_data = user.data;
      const b_name = this.busines_data[0].busines_name;
      const b_email = this.busines_data[0].busines_email;

      localStorage.setItem('busines_name', b_name);
      localStorage.setItem('busines_email', b_email);
    } catch (err) {
    } finally {
    }
  }

  async getCountData() {
    const time = this.date.year + '-' + this.date.month + '-' + this.date.day;
    const trx = await this.data.getDailytrx(this.user_id, time.toString());
    if (trx != null) {
      this.trx = trx.length < 0 ? 0 : trx.length;
      trx.map((t) => {
        this.omset += parseInt(t.total_price);
      });
    }
  }
}

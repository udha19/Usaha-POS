import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { TransaksiService } from './_services/transaksi.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
})
export class TransaksiPage implements OnInit {
  id = localStorage.getItem('user_id') || '';

  transaksi: any
  detail_trx: any

  isDetailOpen = false
  constructor(
    private trx: TransaksiService,
    private services: SupabaseService
  ) { }

  ngOnInit() {
    this.getTransaksi()
  }

  async getTransaksi() {
    const trx = await this.trx.getTransaksi(this.id)
    this.transaksi = trx
  }

  showDetailTrx(trx: any){
    this.detail_trx = trx
    this.isDetailOpen = true
  }

}

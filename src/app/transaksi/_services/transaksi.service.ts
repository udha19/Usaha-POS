import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {
  base: string = environment.SUPABASE_URL
  key: string = environment.SUPABASE_KEY
  private supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(this.base, this.key)
  }

  async getTransaksi(id: string) {
    const { data: trx, error } = await this.supabase.from('transaction').select('*').eq('busines_id', id)
    if (error) {
      console.log(error)
    }
    return trx
  }
  async updateTransaksi(id: string, data: any) {
    const { data: trx, error } = await this.supabase.from('transaction').update(data).eq('id', id)
    if (error) {
      console.log(error)
    }
    return trx
  }
  async getTransaksiDetail(id: string) {
    const { data: trx, error } = await this.supabase.from('transaction_detail').select('*').eq('trx_id', id)
    if (error) {
      console.log(error)
    }
    return trx
  }

}

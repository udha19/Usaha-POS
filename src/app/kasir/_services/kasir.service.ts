import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KasirService {
  base: string = environment.SUPABASE_URL
  key: string = environment.SUPABASE_KEY
  private supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(this.base, this.key)
  }

  async postTrx(data: any) {
    const { data: trx, error } = await this.supabase.from('transaction').insert(data)
    if (error) {
      console.log(error)
    }
    return trx
  }
  async UpdateItemOrder(data: any) {
    const { data: trx, error } = await this.supabase.from('item').update(data).eq('item_id', data.item_id)
    if (error) {
      console.log(error)
    }
    return trx
  }
}

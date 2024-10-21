import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  base: string = environment.SUPABASE_URL;
  key: string = environment.SUPABASE_KEY;
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(this.base, this.key);
  }

  async getStock(id: string) {
    return this.supabase.from('stock').select().eq('busines_id', id)
  }
  async updateStock(data: any) {

  }

  async addStock(data: any) {
    return this.supabase.from('stock').insert(data)

  }

  async deleteItem(id: string) {

  }


}

import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  base: string = environment.SUPABASE_URL
  key: string = environment.SUPABASE_KEY
  private supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(this.base, this.key)
  }

  async getOrders(id: string){
    const {data, error} = await this.supabase.from('order').select().eq('busines_id', id)
    if(error){
      throw error
    }
    return data
  }

  async addOrder(data: any){
    const {data: order, error} = await this.supabase.from('order').insert(data)
    if(error){
      throw error
    }
    return order
  }
  async cleanOrder(data: any){
    const {data: order, error} = await this.supabase.from('order').delete().eq('id', data.id)
    if(error){
      throw error
    }
    return order
  }

}

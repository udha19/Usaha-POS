import { inject, Injectable, ɵɵinject } from '@angular/core';
import {
  createClient,
  PostgrestSingleResponse,
  SupabaseClient,
} from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { decode } from 'base64-arraybuffer'


@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  // supa = ɵɵinject(createClient)
  base: string = environment.SUPABASE_URL;
  key: string = environment.SUPABASE_KEY;
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(this.base, this.key);
  }

  async getSelf(id: string) {
    return this.supabase.from('partner').select().eq('busines_id', id);
  }

  async getCategory(id: string) {
    return this.supabase.from('category').select().eq('busines_id', id);
  }

  async addCategory(data: any) {
    return this.supabase.from('category').insert(data);
  }

  async updateCategory(data: any) {
    return this.supabase
      .from('category')
      .update(data)
      .eq('category_id', data.category_id);
  }
  async deleteCategory(id: string) {
    return this.supabase.from('category').delete().eq('category_id', id);
  }
  // ITEMS
  async addItem(data: any) {
    return this.supabase.from('item').insert(data);
  }

  async updateItem(data: any){
    return this.supabase.from('item').update(data).eq('item_id', data.item_id);
  }

  async fetchItem(id: string) {
    return this.supabase.from('item').select().eq('busines_id', id);
  }

  async removeItem(id: string){
    return this.supabase.from('item').delete().eq('item_id', id);
  }
  // INIT DATA
  async addInitCat(id: string) {
    const data = [
      {
        busines_id: id,
        category_name: 'Produk',
      },
      {
        busines_id: id,
        category_name: 'Jasa',
      },
    ];
    return this.supabase.from('category').insert(data);
  }

  async addInitPage(data: any) {
    const theme = {
      name: 'light',
    };
    const info = {
      show_info: 'false',
      open_hour: '09:00',
      close_hour: '17:00',
      note: '',
      is_open: 'true',
    };
    const init_data = {
      busines_id: data.busines_id,
      name: data.busines_name,
      slug: data.slug,
      tagline: '',
      theme: theme,
      info: info,
    };
    return this.supabase.from('partner_page').insert(init_data);
  }


  async uploadImage(data: any, name: string) {
    return await this.supabase
    .storage
    .from('item2')
    .upload('public/'+name+'.png', decode(data), {
      contentType: 'image/png'
    })
  }

  async getImgUrl(path: string) {
    return await this.supabase
    .storage
    .from('item2')
    .getPublicUrl(path)
  }

  async getStocklinkedItems(id: string) {
    return await this.supabase
    .from('stock')
    .select('*')
    .eq('busines_id', id)
    .eq('is_product', true)
  }
}

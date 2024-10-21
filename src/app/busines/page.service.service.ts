import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {
  base: string = environment.SUPABASE_URL;
  key: string = environment.SUPABASE_KEY;
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(this.base, this.key);
  }

  async getPage(id: string) {
    return this.supabase.from('partner_page').select().eq('busines_id', id).single();
  }

  async checkSlug(slug: string) {
    return this.supabase.from('partner_page').select().eq('slug', slug);
  }

  async changeTheme(data: any) {
    return this.supabase.from('partner_page').update(data).eq('busines_id', data.busines_id);
  }

}

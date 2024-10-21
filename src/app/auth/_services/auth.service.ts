import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base: string = environment.SUPABASE_URL
  key: string = environment.SUPABASE_KEY
  private supabase: SupabaseClient
  constructor() {
    this.supabase = createClient(this.base, this.key)
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      console.log(error.message)
      throw error
    }
    return data
  }
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.log(error)
      throw error
    }
    return data
  }
  async addPartner(data: any) {
    const { data: trx, error } = await this.supabase.from('partner').insert(data)
    if (error) {
      console.log(error)
    }
    return trx
  }
  async addUser(data: any) {
    const { data: trx, error } = await this.supabase.from('user').insert(data)
    if (error) {
      console.log(error)
    }
    return trx
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = ''
  password: string = ''
  name: string = ''
  busines_name: string = ''
  toast = {
    isOpen: false,
    message: 'Akun Berhasil Dibuat',
  };
  isOpen = false

  constructor(
    private authService: AuthService,
    private sbService: SupabaseService
  ) { }

  ngOnInit() {
  }
  async onRegisterUser() {
    let data: any
    try {
      const user = await this.authService.signUp(this.email, this.password)
      .catch(e => {
        this.toast.message = e.message
        this.toast.isOpen = true
      })
      data = user
    } catch (e){
    } finally {
      if(data?.user != null)this.registerPartner(data)
      this.isOpen = false

    }

  }

  async registerPartner(data: any) {
    const data_post = {
      busines_id: data.user.id,
      owner_name: this.name,
      busines_name: this.busines_name,
      busines_email: this.email,
      slug: this.busines_name.replace(/\s+/g, '-').toLowerCase()+'-'+this.generateUnique(4)
    }
    const partner = await this.authService.addPartner(data_post).then(data => {
      console.log(data)
      const user_data = {
        role: 'owner',
        busines_id: data_post.busines_id,
        email: this.email,
      }
      this.authService.addUser(user_data).then(res => {
        console.log(res)
        this.toast.isOpen = true
        this.toast.message = 'Akun Berhasil Dibuat'
        this.initPartner(data_post)
      }).catch(err => {
        this.toast.message = err
        this.toast.isOpen = true
      }).catch(err => {
        this.toast.message = err
        this.toast.isOpen = true
      })
    })
    console.log(partner)

  }
  async initPartner(data: any){
    const cat = await this.sbService.addInitCat(data.busines_id)
    const page = await this.sbService.addInitPage(data)
  }
  generateUnique(l: number){
    const char = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let index = 0; index < l; index++) {
      result += char.charAt(Math.floor(Math.random() * char.length))
    }
    return result
  }
  setOpen(opt: boolean){
    this.toast.isOpen = opt
  }
}

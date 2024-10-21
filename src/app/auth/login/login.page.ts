import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ''
  password: string = ''
  toast = {
    isOpen: false,
    message: 'Akun Berhasil Dibuat',
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignIn(){
    try {
      this.authService.signIn(this.email, this.password).then(res => {
        console.log(res)
        localStorage.setItem('user_id', res.user.id)
        this.router.navigate(['/dashboard'])
      }).catch(e=> {
        this.toast.message = e
        this.toast.isOpen = true
      })
    } catch (e){
    }


  }
  setOpen(opt: boolean){
    this.toast.isOpen = opt
  }
}

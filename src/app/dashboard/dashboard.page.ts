import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  busines_data: any;
  user_id: string = ''
  total_trx = 0
  constructor(
    private data: SupabaseService
  ) { }

  ngOnInit() {
    this.getSelfData()
  }

  async getSelfData(){
    this.user_id = localStorage.getItem('user_id') || ''
    try{
      const user = await this.data.getSelf(this.user_id)
      this.busines_data = user.data
      const b_name =  this.busines_data[0].busines_name
      const b_email = this.busines_data[0].busines_email

      localStorage.setItem('busines_name', b_name)
      localStorage.setItem('busines_email', b_email)

    } catch (err) {
    } finally {

    }
  }

  async getCountData() {
    // TODO: get trx data count
  }


}

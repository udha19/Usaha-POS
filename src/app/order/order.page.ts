import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { OrderService } from './_service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  id = localStorage.getItem('user_id') || ''
  date =  new Date()
  client_name: string = ''
  due_date = this.date.getDate()
  order_lists: any = []
  order: any = {
    item: [],
    down_payment: 0,
    total_price: 0,
  }
  items: any = []
  custom_item ={
    item_name:'',
    price:0,
    qty:1,
    desc:''
  }
  total = 0
  isModalOpen = false
  isCustomItemModalOpen = false
  isItemModalOpen = false
  toast = {
    isOpen: false,
    message: 'Order Dibuat'
  }
  constructor(
    private baseService: SupabaseService,
    private service: OrderService
  ) { }

  ngOnInit() {
    this.getOrderList()
    this.getItems()
  }

  async getOrderList(){
    const data = await this.service.getOrders(this.id)
    this.order_lists = data
  }

  getOrderDetail(){


  }
  async getItems(){
    const data = await this.baseService.fetchItem(this.id)
    const d: { element: any; qty: number }[] = [];
    data.data?.forEach((element: any) => {
      d.push({ ...element, qty: 0 });
    });

    this.items = d;

  }
  openItemModal(opt: boolean){
    if(opt){
      this.isItemModalOpen = true
    } else {
      this.isItemModalOpen = false
    }
  }
  insertOrder(data?: any){
    if(data){
      data.price = parseInt(data.price.replace('.', ''))
      this.order.item.push(data)
      this.order.total_price += data.price * data.qty
    } else {
      this.items.map((item: any) => {
          if(item.qty > 0) {
            this.order.item.push(item)
            this.order.total_price += item.price * item.qty
          }
        })
      }
    this.isItemModalOpen = false
    this.isCustomItemModalOpen = false
  }

  addOrder(){
    this.order.down_payment = parseInt(this.order.down_payment.replace('.', ''))
    const data_post = {
      busines_id: this.id,
      client_name: this.client_name,
      due_date: this.due_date,
      item: this.order,
    }
    try{
      this.service.addOrder(data_post).then(data => {
        setTimeout(()=> {
          this.getOrderList()
        }, 200)
      })
      this.isModalOpen = false
      this.order = {
        item: [],
        down_payment: 0,
        total_price: 0,
      }
      this.toast.isOpen = true
      this.toast.message = 'Order berhasil dibuat'
    } catch(error: any) {
      this.toast.isOpen = true
      this.toast.message = error.message
    }


  }


}

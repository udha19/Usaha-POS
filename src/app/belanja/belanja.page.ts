import { Component, OnInit } from '@angular/core';
import { StockService } from './_services/stock.service';

@Component({
  selector: 'app-belanja',
  templateUrl: './belanja.page.html',
  styleUrls: ['./belanja.page.scss'],
})
export class BelanjaPage implements OnInit {
  id = localStorage.getItem('user_id') || '';

  isModalOpen = false;
  newItem = {
    item_name: '',
    price: 0,
    qty: 0,
    unit: '',
    is_cart: true,
    is_product: false,
    busines_id: this.id,
  }


  in_stock: any;
  out_stock: any;

  view = 'stock'

  toast = {
    isOpen: false,
    message: 'Kategori Dibuat'
  }
  constructor(
    private service: StockService
  ) { }

  ngOnInit() {
    this.getStockData()
  }

  async getStockData(){
    const {data, error} = await this.service.getStock(this.id)
    this.in_stock = data?.filter((item: any) => item.is_cart == false)
    this.out_stock = data?.filter((item: any) => item.is_cart == true)
  }

  async addStockItem(){
    const price = this.newItem.price.toString().replace('.', '');
    this.newItem.price = parseInt(price);
    try {
      const {data, error} = await this.service.addStock(this.newItem)
      this.toast.message = 'Stock Ditambahkan'
      this.toast.isOpen = true;
      this.postOperation('add')

    } catch (error) {
    }
  }

  openCartOptions(stock: any){

  }

  openStockOption(){

  }

  checkCart(){

  }

  checkStock(){

  }

  postOperation(ev: string){
    if(ev == 'add'){

      setTimeout(() => {
        this.getStockData()
      }, 500);
    }
    this.newItem = {
      item_name: '',
      price: 0,
      qty: 0,
      unit: '',
      is_cart: true,
      is_product: false,
      busines_id: this.id,
    }

  }

  setOpen(isOPne: boolean) {
    this.toast.isOpen = isOPne;
  }
}

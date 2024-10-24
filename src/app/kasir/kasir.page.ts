import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { KasirService } from './_services/kasir.service';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.page.html',
  styleUrls: ['./kasir.page.scss'],
})
export class KasirPage implements OnInit {
  id = localStorage.getItem('user_id') || '';
  total = 0;

  isSelectItemOpen = false;
  items: any;
  cart: any = [];
  isPurchaseOpen = false;
  isFullpaid = true;
  note = '';
  customItem = {
    item_name: '',
    price: 0,
    qty: 1
  }
  toast = {
    isOpen: false,
    message: 'Pembayaran Berhasil',
  };
  receive_payment = 0;
  prs_rcv_pym  = 0;
  total_change = 0;
  pecahan = [0, 5000, 10000, 20000, 50000, 100000];
  constructor(
    private services: SupabaseService,
    private kasir: KasirService
  ) {}

  ngOnInit() {
    this.getItem();
  }

  async getItem() {
    const it = await this.services.fetchItem(this.id);
    const d: { element: any; qty: number }[] = [];
    it?.data?.forEach((element: any) => {
      d.push({ ...element, qty: 0 });
    });
    this.items = d;
  }

  selectFrom(opt: string) {
    switch (opt) {
      case 'item':
        this.isSelectItemOpen = true;
        break;
      default:
        break;
    }
  }
  addCustomItem(){
    this.customItem.price = parseFloat(this.customItem.price.toString().replace(/\./g, ''))
    this.items.push(this.customItem)
    this.customItem = {
      item_name: '',
      price: 0,
      qty: 1
    }
  }
  addToCart(item: any) {
    // item = {...item, qty: 1}
    this.cart.push(item);
    this.total = this.cart.reduce(
      (n: any, cart: any) => n + cart.price * cart.qty,
      0
    );
  }

  countTotal(i?: number, cart?: any) {
    this.total = this.cart.reduce(
      (n: any, cart: any) => n + cart.price * cart.qty,
      0
    );
  }

  setItemModalOpen(opt: boolean) {
    this.isSelectItemOpen = opt;
  }

  closeModal(type: string) {
    if (type == 'save') {
      this.items.forEach((item: any) => {
        if (item.qty > 0) {
          this.cart.push(item);
        }
      });
      this.countTotal(0, this.cart);
      this.isSelectItemOpen = false;
    } else {
      this.cart = [];
      this.isSelectItemOpen = false;
      this.isPurchaseOpen = false;
    }
  }
  inputPurchase(r: number) {
    this.receive_payment = r;
    this.countChange();
  }
  countChange() {
    this.total_change = parseInt(this.receive_payment.toString().replace(/\./g, '')) - this.total;
    this.prs_rcv_pym = parseInt(this.receive_payment.toString().replace(/\./g, ''))
  }

  setOpen(opt: boolean) {
    this.toast.isOpen = opt;
  }

  processPecahan() {
    const proc: number[] = [];
    let pec = 0;
    let limit = 0
    proc.push(...this.pecahan);

    this.pecahan.forEach((p) => {
      for (let index = 0; index < this.pecahan.length; index++) {
        pec = this.pecahan[index];

        if (this.total > 100000) {

          while (limit < this.total) {
            limit += 100000
          }
          const pr = limit - 100000 + pec;
          if(limit > 0){
            if(!proc.includes(pr) && this.total % 100000 != 0){
              proc.push(pr);
            } else {
              if(!proc.includes(limit)){
                proc.push(limit)
              }
            }
          }

        } else if (this.total < 100000 && pec > 0) {
          const pr = p + pec;
          if(pec >= this.total && limit == 0) limit = pec
          if (pr >= this.total) {
            if (!proc.includes(pr) && pr <= 100000 && pr <= limit) {
              proc.push(pr);
            }
          }
        }
      }
    });
    return proc.sort((a, b) => a-b);
  }

  finishPurchase() {
    if(parseInt(this.receive_payment.toString().replace(/\./g, '')) >= this.total){
      this.isFullpaid = true
    } else {
      this.isFullpaid = false
    }
    this.kasir.postTrx({
      busines_id: this.id,
      total_price: this.total,
      total_paid: parseInt(this.receive_payment.toString().replace(/\./g, '')),
      is_full_paid: this.isFullpaid,
      note: this.note,
      summary: this.cart,
    });
    this.cart.forEach((item: any) => {
      if(item.item_id){
        this.kasir.UpdateItemOrder({
          item_id: item.item_id,
          ordered: item.qty,
        });
      }
    });
    this.isPurchaseOpen = false;
    this.cart = [];
    this.total = 0;
    this.toast.isOpen = true;
    this.items = []
    this.getItem();
  }


}

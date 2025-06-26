import { Photo } from '@capacitor/camera';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
// @ts-ignore
import * as badwords from 'indonesian-badwords';
import { Images, ImagesService } from '../services/images.service';

import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';
import { environment } from 'src/environments/environment';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  image = 'https://usahaku-lqcs.vercel.app/';
  base: string = environment.SUPABASE_URL;

  id = localStorage.getItem('user_id') || '';
  items: any;
  category: any;

  captured_images = this.imageService.photos;
  user_images: Images[] = [];
  item_images = '';
  editImage = false;

  selectedItem = {
    item_id: '',
    item_name: '',
    price: 0,
    desc: '',
    ordered: 0,
    category_id: '',
    item_image: '',
    item_stock: {
      qty: 0,
      id:''
    },
    busines_id: this.id,
  };

  is_related_stock_item = false;
  item_stock: any;

  @ViewChild('cropper') cropper: ImageCropperComponent | undefined;
  myImage: any = null;
  croppedImage: any = '';
  transform: ImageTransform = {};
  // isMobile = Capacitor.getPlatform() !== 'web';

  item_id = '';
  newItem = {
    item_name: '',
    price: 0,
    desc: '',
    ordered: 0,
    category_id: '',
    item_image: '',
    item_stock: {
      qty: 0,
      id: ''
    },
    busines_id: this.id,
  };

  selectedCat: any;

  isModalOpen = false;
  toast = {
    isOpen: false,
    message: 'Kategori Dibuat',
  };

  DECIMAL_SEPARATOR = '.';
  GROUP_SEPARATOR = '.';

  itemAction = false;
  itemsOptions = [
    {
      text: 'Edit',
      icon: 'brush',
      data: {
        action: 'update',
      },
    },
    {
      text: 'Hapus',
      icon: 'close-circle',
      role: 'delete',
      data: {
        action: 'delete',
      },
    },
  ];

  imageSource = [
    {
      text: 'Camera',
      icon: 'camera-outline',
      data: {
        action: 'camera',
      },
    },
    {
      text: 'Galery',
      icon: 'images-outline',
      data: {
        action: 'galery',
      },
    },
  ]

  sourcePicker = false;
  generateLoader = false;

  constructor(
    private service: SupabaseService,
    private imageService: ImagesService,
    private compressImage: NgxImageCompressService,
    private gemini: GeminiService
  ) {}

  ngOnInit() {
    this.getItems();
    this.getCat();
  }

  async getCat() {
    const cat = await this.service.getCategory(this.id);
    this.category = cat?.data;
  }

  async getItems() {
    try {
      const data = await this.service.fetchItem(this.id);
      this.items = data.data;
      const dataStock = await this.service.getStocklinkedItems(this.id)
      this.item_stock = dataStock.data;
    } catch (error) {
    } finally {
    }
  }

  generate(){
    this.generateLoader = true
    this.gemini.generateItem(this.newItem.item_name).then((res) => {
      
      const r = JSON.parse(res);
      const resp = r[0];
      this.newItem.item_name = resp.name;
      this.newItem.price = resp.price;
      this.newItem.desc = resp.description;
      this.generateLoader = false

    });
  }

  addItem() {
    const price = this.newItem.price.toString().replace('.', '');
    this.newItem.price = parseInt(price);
    this.newItem.item_name = badwords.censor(this.newItem.item_name);
    this.newItem.category_id = this.selectedCat.category_id;
    if (this.croppedImage == '') {
      if (this.selectedCat.category_name.toLowerCase() == 'jasa') {
        this.image = this.image + 'services.png';
      } else {
        this.image = this.image + 'product.png';
      }
      this.newItem.item_image = this.image;
      this.postItem();
    } else {
      this.processImage();
    }
  }

  postItem() {
    try {
      this.service.addItem(this.newItem);
    } catch (error) {
    } finally {
      this.setModalOpen(false);
      this.postOperation('add');
    }
  }

  updateItem() {
    const price = this.newItem.price.toString().replace('.', '');
    this.newItem.price = parseInt(price);
    this.newItem.item_name = badwords.censor(this.newItem.item_name);
    if(this.selectedCat != undefined) this.newItem.category_id = this.selectedCat.category_id;
    if (this.croppedImage == '') {
      if (this.selectedCat.category_name.toLowerCase() == 'jasa') {
        this.image = this.image + 'services.png';
      } else {
        this.image = this.image + 'product.png';
      }
      this.newItem.item_image = this.image;
      this.updateItemServer()
    } else {
      this.processImage();
    }

  }

  updateItemServer(){
    try {
      this.service.updateItem(this.newItem);
    } catch (error) {
    } finally {
      this.setModalOpen(false);
      this.postOperation('update');
    }
  }

  async deleteItem() {
    return await this.service.removeItem(this.selectedItem.item_id);
  }

  actionSheetsDidDismiss(data: any) {
    this.itemAction = false;
    if (data.detail.data.action == 'update') {
      this.isModalOpen = true;
      this.item_id = this.selectedItem.item_id;
      this.newItem = this.selectedItem

      if(this.newItem.item_stock == undefined){
        this.newItem.item_stock = {
          qty: 0,
          id:''
        }
      }
    }
    if (data.detail.data.action == 'delete') {
      this.deleteItem();
      this.postOperation('delete');
    }
  }

  imageSourceDidDismiss(data:any) {
    this.sourcePicker = false;
    if(data.detail.data.action == 'camera'){
      this.getImage('camera')
    }
    if(data.detail.data.action == 'galery'){
      this.getImage('galery')
    }
  }

  openItemOptions(data: any) {
    this.itemAction = true;
    this.selectedItem = data;
  }

  openSourceImage(){
    this.sourcePicker = true;
  }

  format(valString: any) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    return (
      parts[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, this.GROUP_SEPARATOR) +
      (!parts[1] ? '' : this.DECIMAL_SEPARATOR + parts[1])
    );
  }
  unFormat(val: any) {
    if (!val) {
      return '';
    }
    val = val.replace(/^0+/, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  }
  postOperation(type: string) {
    switch (type) {
      case 'add':
        this.toast.message = 'Item Berhasil Dibuat';
        this.toast.isOpen = true;
        break;
      case 'update':
        this.toast.message = 'Item Berhasil Diperbarui';
        this.toast.isOpen = true;
        break;
      case 'delete':
        this.toast.message = 'Item Berhasil Dihapus';
        this.toast.isOpen = true;
        break;
      case 'cancel':
        this.setModalOpen(false)
        break;
      default:
        break;
    }

    this.newItem = {
      item_name: '',
      price: 0,
      desc: '',
      ordered: 0,
      category_id: '',
      item_image: '',
      item_stock: {
        qty: 0,
        id:''
      },
      busines_id: this.id,
    };
    this.croppedImage = '';
    this.item_images = '';
    this.item_id = '';
    setTimeout(() => {
      this.getItems();
    }, 500);
  }
  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen(isOPne: boolean) {
    this.toast.isOpen = isOPne;
  }

  async getImage(source: string) {
    if(source == 'camera'){
      const take = await this.imageService.TakeImages().then((res) => {
        this.user_images = this.captured_images;
        this.myImage = this.user_images[0].base64 || '';
        this.editImage = true;
      });
    }

  }

  finishCrop() {
    // this.imageCropped(this.myImage)
    this.cropper?.crop('base64');
    this.editImage = false;
    this.item_images = this.croppedImage || '';
    this.user_images = [];
  }
  // Called when we finished editing (because autoCrop is set to false)
  imageCropped(event?: ImageCroppedEvent) {
    this.croppedImage = event?.base64;
  }

  // We encountered a problem while loading the image
  loadImageFailed() {
    console.log('Image load failed!');
  }

  async processImage() {
    const name = this.id + Date.now();
    this.croppedImage = this.croppedImage.replace('data:image/png;base64,', '');
    await this.service.uploadImage(this.croppedImage, name).then((res) => {
      this.imgUrl(res.data?.path || '');
    });
  }

  async imgUrl(path: string) {
    await this.service.getImgUrl(path).then((res) => {
      this.newItem.item_image = res.data.publicUrl;
      if(this.item_id){
        this.updateItemServer()
      } else {
        this.postItem();
      }
    });
  }
}

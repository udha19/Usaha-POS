import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { PageServiceService } from './page.service.service';

@Component({
  selector: 'app-busines',
  templateUrl: './busines.page.html',
  styleUrls: ['./busines.page.scss'],
})
export class BusinesPage implements OnInit {
  id = localStorage.getItem('user_id') || ''
  view = 'default'
  busines_setting = {
    busines_name: '',
    busines_tagline: '',
    busines_email: '',
    busines_phone: '',
    busines_whatsapp: '',
  }

  busines_social = {
    busines_ig: '',
    busines_yt: '',
    busines_fp: '',
    busines_tiktok: '',
  }

  busines_services = {
    gofood: '',
    shopeefood: '',
    grabfood: '',
  }
  busines_address = {
    busines_address: '',
    busines_city: '',
    busines_province: '',
    busines_postal_code: '',
    lat: '',
    long: '',
  }
  preview = 'https://usahaku-lqcs.vercel.app/sample/'
  domain = 'https://usahaku-lqcs.vercel.app/'
  page = {
    name: '',
    slug: '',
    tagline: '',
    theme: {
      name: 'default',
    },
    info: {
      show_info: 'false',
      open_hour: '09:00',
      close_hour: '17:00',
      note: '',
      is_open: 'true',
    },
  }
  t = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ]
  themes = [
    {
      name: 'default',
      preview: this.preview+'/kopi-susu',
      is_checked: false,
    },
  ]
  chooseThemes = false
  themesOptions = [
    {
      text: 'Pilih',
      icon: 'checkmark-circle-outline',
      data: {
        action: 'Pilih',
      },
    },
    {
      text: 'Preview',
      icon: 'eye-outline',
      data: {
        action: 'Preview',
      },
    },
    {
      text: 'Cancel',
      icon: 'close-circle',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ]
  selectedThemes = {
    name: 'default',
    preview: this.preview+'/light',
    is_checked: false,
  }

  is_slug_available = true;
  toast = {
    isOpen: false,
    message: 'Kategori Dibuat'
  }
  constructor(
    private pageService: PageServiceService
  ) { }

  ngOnInit() {
    this.getPagedata()
  }

  async getPagedata() {
    const page = await this.pageService.getPage(this.id).then(data => {
      return data
    })
    this.page = page.data
    this.generateTheme()
  }
  async checkSlug(e: any){
    const slug = await this.pageService.checkSlug(e).then(data => {
      return data?.data
    })

    if(slug != null) {
      if(slug.length >= 1){
        this.is_slug_available = false
      }else{
        this.is_slug_available = true
      }
    }

  }
  generateTheme(){
    this.t.forEach(theme => {
      this.themes.push({
        name: theme,
        preview: this.preview+theme,
        is_checked: theme == this.page.theme.name ? true : false ,
      })
    })
  }
  openThemeOptions(data: any){
    this.chooseThemes = true
    this.selectedThemes = data
  }

  actionSheetsDidDismiss(data: any){
    this.chooseThemes = false
    if(data.detail.data.action == 'Preview'){
      this.previewThemes()
    }
    if(data.detail.data.action == 'Pilih') {
      this.selectTheme(data.detail.data.name)
    }
  }

  previewThemes(){
    Browser.open({ url: this.selectedThemes.preview });
  }

  selectTheme(theme: string){
    const post_data = {
      busines_id: this.id,
      theme: {
        name: this.selectedThemes.name,
      },
    }
    this.pageService.changeTheme(post_data).then(data => {
      this.toast.message = "Tema berhasil diperbarui",
      this.toast.isOpen = true
      this.themes = []
      this.getPagedata()
    })
  }
  setOpen(isOPne: boolean) {
    this.toast.isOpen = isOPne
  }
}

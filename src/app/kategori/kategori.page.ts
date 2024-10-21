import { SupabaseService } from './../services/supabase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {
  id= localStorage.getItem('user_id') || ''
  kategori: any
  newKategori = ''
  toast = {
    isOpen: false,
    message: 'Kategori Dibuat'
  }
  id_cat = ''

  constructor(
    private service: SupabaseService
  ) { }

  ngOnInit() {
    this.getKategori()
  }

  async getKategori(){
    try{
      const kat = await this.service.getCategory(this.id)
      this.kategori = kat.data
    } catch (error) {
    } finally {

    }
    // this.kategori = kat
  }
  addKategori(){
    const data = {
      busines_id: this.id,
      category_name: this.newKategori
    }
    try{
      this.service.addCategory(data)
    } catch (error){

    } finally {
      this.postOperation('add')
    }
  }
  updateKategori(){
    const data = {
      busines_id: this.id,
      category_name: this.newKategori,
      category_id: this.id_cat
    }
    try{
      this.service.updateCategory(data)
    } catch (error){

    } finally {
     this.postOperation('update')
    }

  }
  deleteKategori(id: string){
    try{
      this.service.deleteCategory(id)
    } catch (error) {

    } finally {
      this.postOperation('delete')
    }
  }
  setOpen(isOpen: boolean){
    this.toast.isOpen = isOpen
  }

  setEdit(kat: any){
    this.newKategori = kat.category_name
    this.id_cat = kat.category_id
  }

  postOperation(type: string){
    switch (type) {
      case 'add':
        this.toast.message = 'Kategori Berhasil Dibuat'
        break;
      case 'update':
        this.toast.message = 'Kategori Berhasil Diperbarui'
        break;
      case 'delete':
        this.toast.message = 'Kategori Berhasil Dihapus'
        break;
      default:
        break;
    }
    this.newKategori = ''
    setTimeout(() => {
      this.getKategori()
      this.toast.isOpen = true
    }, 500)

  }
}

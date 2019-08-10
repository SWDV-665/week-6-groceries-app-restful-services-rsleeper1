import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '.././groceries-service.service';
import { InputDialogServiceService } from '.././input-dialog-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title = "Grocery List";
  items = [];
  errorMessage: string;
  
  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidLoad(){
    this.loadItems();
  }
  
  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  async removeItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Removing item - ' + item.name + "...",
      duration: 2000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  async shareItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Sharing item - ' + item.name + "...",
      duration: 2000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Grocery App";
    // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared Successfully!");
    }).catch((error) => {
      console.error("Error occurred while sharing ", error);
      // Sharing via email is not possible
    });


  }


  async editItem(item, index) {
    const toast = await this.toastController.create({
      message: 'Edit item - ' + item.name + "...",
      duration: 2000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);

  }

  addNewItem(){
    this.inputDialogService.showPrompt();
  }

  

}

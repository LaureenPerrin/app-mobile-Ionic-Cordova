import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pseudo: string = "";
  difficulte = "easy";
  sauvegarder = false;
  errorMessage = "";

  constructor(private toastCtrl: ToastController, private router: Router) {
  }

  async beginGame() {
    if (this.pseudo == "" || this.pseudo.length < 3 || this.difficulte == "") {
      this.errorMessage = "Veuillez rentrer un pseudo plus long et une difficulté.";
      const toast = await (this.toastCtrl.create({
        message: "Veuillez rentrer un pseudo et une difficulté.",
        duration: 5000 // équivaut à 5 secondes
      }));
      toast.present();
      return ;
    }
    this.router.navigate(["/game", this.pseudo, this.difficulte]);
  }
}

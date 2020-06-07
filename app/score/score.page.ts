import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage {

  public score: number = 0;

  constructor(public route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.score = params['score'];
    });
  }

  retour() {
    this.router.navigate(["/home"]);
  }
}

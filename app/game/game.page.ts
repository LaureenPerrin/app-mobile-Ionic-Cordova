import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../open-trivia.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  pseudo: string = "";
  difficulte = "easy";
  finJeu = false;
  questionSuivante = false;
  questions = [];
  questionCourante: any = {};
  numeroQuestion: number = 0;
  points: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private toastCtrl: ToastController,
              private openTriviaService: OpenTriviaService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadQuestions();
    this.activatedRoute.params.subscribe((params) => {
      this.pseudo = params["pseudo"];
      this.difficulte = params["difficulty"];
    })
  }

  async loadQuestions() {
    this.numeroQuestion = 0;
    this.points = 0;
    this.finJeu = false;
    this.questionSuivante = false;
    try {
      this.questions = await this.openTriviaService.getQuestions(this.difficulte, 10);
      this.loadQuestion()
    } catch (error) {
      console.log(error);
      const toast = await (this.toastCtrl.create({
        message: error,
        duration: 5000
      }));
      toast.present();
    }
  }

  loadQuestion() {
    this.questionCourante = this.questions[this.numeroQuestion];
    this.questionCourante["answers"] = [];
    
    for (let answer of this.questionCourante["incorrect_answers"]) {
      this.questionCourante["answers"].push({
        answer: answer,
        correct: false
      });
    }
    this.questionCourante["answers"].push({
      answer: this.questionCourante["correct_answer"],
      correct: true
    });
    this.questionCourante["answers"] = this.shuffleAnswers(this.questionCourante["answers"]);
  }

  shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = answers[i];
      answers[i] = answers[j];
      answers[j] = tmp;
    }
    return answers;
  }

  nextQuestion() {
    if (this.numeroQuestion < this.questions.length - 1) {
      this.numeroQuestion++;
      this.questionSuivante = false;
      this.loadQuestion();
    }
  }

  reponse(answer) {
    this.questionSuivante = true;
    if (answer["correct"]) {
      this.points++;
    }
    if (this.numeroQuestion >= this.questions.length -1) {
      this.finJeu = true;
    }
  }

  retour() {
    this.router.navigate(["/score", this.points]);
  }
}

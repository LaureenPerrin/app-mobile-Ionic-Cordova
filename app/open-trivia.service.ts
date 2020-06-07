import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

  constructor(private httpClient: HttpClient) { }

  async getQuestions(difficulte: string, nbQuestions: number) {
    const result = await this.httpClient.get("https://opentdb.com/api.php?amount=" + nbQuestions + "&difficulty=" + difficulte).toPromise();
    if (result && result['results']) {
      return result['results'];
    } else {
      throw Error("Erreur : impossible de récupérer les questions.");
    }
  }
}

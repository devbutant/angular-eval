import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  categoryId!: number;
  categoryName: string = '';

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      this.categoryId = params['categoryId'];

      this.categoriesService
        .getCategory(this.categoryId)
        .subscribe((category: any) => {
          this.categoryName = category[0].name;
        });
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}

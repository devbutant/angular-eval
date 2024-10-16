import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  searchedCategory: string = '';
  allCategories: any[] = [];
  categoriesFiltered: any[] = [];
  username: string = '';

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.username = this.route.snapshot.params['username'];
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (categories: any[]) => {
        this.allCategories = categories;
        this.categoriesFiltered = categories;
        console.log(this.allCategories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }

  onSearch() {
    this.categoriesFiltered = this.allCategories.filter((category) => {
      return category.name.includes(this.searchedCategory);
    });
  }

  resetSearch() {
    this.searchedCategory = '';
    this.categoriesFiltered = this.allCategories;
  }
}

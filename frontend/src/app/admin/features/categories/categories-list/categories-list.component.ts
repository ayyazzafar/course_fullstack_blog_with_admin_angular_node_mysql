import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategory } from '../../../../core/interfaces/models/category.model.interface';
import moment from 'moment';
import { CategoryService } from '../../../../core/services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    MatTableModule, MatCheckboxModule, MatButtonModule, MatIcon, RouterModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent {
  moment = moment;
  displayedColumns: string[] = ['select', 'id', 'name', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<ICategory>([]);
  selection = new SelectionModel<ICategory>(true, []);
  categoryService = inject(CategoryService)

  constructor() {
    this.loadCategories();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ICategory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} `;
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.dataSource.data = categories
    });
  }

  deleteSelectedCategories() {
    const selectedCategories = this.selection.selected;
    const selectedCategoryIds = selectedCategories.map(category => category.id);
    let promises =
      selectedCategoryIds.map((id) => {
        let ob = this.categoryService.deleteCategory(id);
        // convert into promise
        return lastValueFrom(ob)
      });

      Promise.all(promises).then(()=>{
        this.loadCategories();
      });
  }
}

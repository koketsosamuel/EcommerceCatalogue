import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
})
export class CategoriesSelectorComponent {
  @Input({ required: true }) filter!: string[];
  @Output() categoryChanged = new EventEmitter<any>();
  categories: string[] = [
    'Apparel',
    'Books',
    'Electronics',
    'Footwear',
    'Gardening',
    'Watches',
  ];

  filterAndSortEmit() {
    this.categoryChanged.emit(this.filter);
  }
}

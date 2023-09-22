import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import IProduct from 'src/app/models/product.interface';
import { tSortMethod } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input({ required: true }) products!: IProduct[];
  @Input({ required: true }) search!: string;
  @Input({ required: true }) sortMethod: tSortMethod = 'NAME:A_Z';
  @Output() inputChanged = new EventEmitter<any>();
  sortName: string = 'Name A-Z';

  sortMethods: { name: string; value: tSortMethod }[] = [
    {
      name: 'Name A-Z',
      value: 'NAME:A_Z',
    },
    {
      name: 'Category A-Z',
      value: 'CATEGORY:A-Z',
    },
    {
      name: 'Price: Low - High',
      value: 'PRICE:L-H',
    },
    {
      name: 'Price: High - Low',
      value: 'PRICE:H-L',
    },
  ];

  ngOnInit(): void {
    this.setSortName(this.sortMethod);
  }

  filterAndSortEmit(data: any = null) {
    this.inputChanged.emit(data || { search: this.search });
  }

  setSortMethod(sortValue: tSortMethod) {
    this.setSortName(sortValue);
    this.sortMethod = sortValue;
    this.filterAndSortEmit({ sortMethod: this.sortMethod });
  }

  setSortName(sortValue: tSortMethod) {
    this.sortName = this.sortMethods.find(sm => sm.value === sortValue)?.name as string;
  }
}

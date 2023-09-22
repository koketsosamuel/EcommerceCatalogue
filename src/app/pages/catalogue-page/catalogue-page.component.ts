import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IProduct from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { tSortMethod } from 'src/app/types';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.scss'],
})
export class CataloguePageComponent implements OnInit {
  products: IProduct[] = [];
  sortMethod: tSortMethod = 'NAME:A_Z';
  filter: string[] = [];
  search: string = '';
  limitPerLoad = 8;
  productsLeft: IProduct[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: Record<string, any>) => {
      if (queryParams['sortMethod']) {
        this.sortMethod = queryParams['sortMethod'];
      }

      if (queryParams['filter']) {
        this.filter = queryParams['filter'].split(',');
      }

      if (queryParams['search']) {
        this.search = queryParams['search'];
      }

      const localProducts = this.productService.getProducts(
        this.filter,
        this.sortMethod,
        this.search
      );

      this.products = localProducts.splice(0, this.limitPerLoad);
      this.productsLeft = localProducts;
    });
  }

  filterAndSort(filter: string[] = []) {
    const queryParamsObj: any = { sortMethod: this.sortMethod };

    this.filter = filter;

    if (this.filter.length) {
      queryParamsObj.filter = this.filter.join(',');
    }

    if (this.search) {
      queryParamsObj.search = this.search;
    }

    this.router.navigate([], {
      queryParams: queryParamsObj,
    });
  }

  headerInputsChanged(data: any) {
    if (data.search) {
      this.search = data.search;
    }

    if (data.sortMethod) {
      this.sortMethod = data.sortMethod;
    }

    this.filterAndSort(this.filter);
  }

  showMore() {
    this.products = [
      ...this.products,
      ...this.productsLeft.splice(0, this.limitPerLoad),
    ];
  }
}

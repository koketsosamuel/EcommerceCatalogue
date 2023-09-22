import { Injectable } from '@angular/core';
import IProduct from 'src/app/models/product.interface';
import { tSortMethod } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: IProduct[] = [
    {
      name: 'Classic T-Shirt',
      category: 'Apparel',
      price: 25.99,
      salePrice: 19.99,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Running Shoes',
      category: 'Footwear',
      price: 89.99,
      salePrice: 74.99,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Cookbook',
      category: 'Books',
      price: 19.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Garden Tools Set',
      category: 'Gardening',
      price: 49.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: "Men's Watch",
      category: 'Watches',
      price: 129.99,
      salePrice: 109.99,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 129.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Denim Jeans',
      category: 'Apparel',
      price: 49.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Smartwatch',
      category: 'Electronics',
      price: 199.99,
      salePrice: 179.99,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Cookbook',
      category: 'Books',
      price: 19.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: 'Garden Tools Set',
      category: 'Gardening',
      price: 49.99,
      salePrice: null,
      imgSrc: 'https://picsum.photos/200/300',
    },
    {
      name: "Men's Watch",
      category: 'Watches',
      price: 129.99,
      salePrice: 109.99,
      imgSrc: 'https://picsum.photos/200/300',
    },
  ];

  getProducts(
    filter: string[],
    sort: tSortMethod = 'NAME:A_Z',
    searchTerm: string = ''
  ) {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const localProducts = this.products.filter((p) => {
      const containsSearchTerm =
        p.name.toLocaleLowerCase().includes(lowercaseSearchTerm) ||
        p.category.toLocaleLowerCase().includes(lowercaseSearchTerm) || String(p.price) == lowercaseSearchTerm;

      if (filter.length > 0) {
        return filter.includes(p.category) && containsSearchTerm;
      }
      return containsSearchTerm;
    });
    return this.sortProducts(localProducts, sort);
  }

  private sortProducts(
    products: IProduct[] = [],
    sort: tSortMethod
  ): IProduct[] {
    if (sort == 'CATEGORY:A-Z' || sort == 'NAME:A_Z') {
      const propertyName = sort == 'CATEGORY:A-Z' ? 'category' : 'name';
      return this.sortAlphabetically(products, propertyName);
    } else if (sort == 'PRICE:L-H') {
      return products.sort((a, b) => {
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      });
    } else if ((sort = 'PRICE:H-L')) {
      return products.sort((a, b) => {
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      });
    }
    return this.sortAlphabetically(products, 'name');
  }

  private sortAlphabetically(array: any[], propertyName: string) {
    return array.slice().sort(function (a, b) {
      return a[propertyName].localeCompare(b[propertyName]);
    });
  }
}

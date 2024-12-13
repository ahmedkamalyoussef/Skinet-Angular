import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Product;
}

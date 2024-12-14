import { Component, inject, ViewChildren, QueryList } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ShopService } from '../../../core/services/shop.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.scss']
})
export class FiltersDialogComponent {
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  selectedBrands = this.data.selectedBrands;
  selectedTypes = this.data.selectedTypes;

  @ViewChildren(MatSelectionList) selectionLists!: QueryList<MatSelectionList>;

  onApplyFilters() {
    const [brandsList, typesList] = this.selectionLists.toArray();
    
    this.selectedBrands = brandsList.selectedOptions.selected.map(option => option.value);
    this.selectedTypes = typesList.selectedOptions.selected.map(option => option.value);
    
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
  }
}

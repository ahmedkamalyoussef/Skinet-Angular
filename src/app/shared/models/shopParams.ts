export class ShopParams {
    brands: string[] = [];
    types: string[] = [];
    sort = 'name';
    pageIndex: number = 1;
    pageSize: number = 10;
    search: string = '';
}
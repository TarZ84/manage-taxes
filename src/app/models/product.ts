export class Product {
  private _id: string;
  private _title: string;
  private _quantity: number;
  private _selectedPriceHT: number;
  private _priceTTC: number;
  private _taxeAppliquee: number;
  private _isNecessary: boolean;
  private _isImported: boolean;
  private _pricesHt: Array<number>;

  constructor(){}

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(value: number) {
    this._quantity = value;
  }

  public get selectedPriceHT(): number {
    return this._selectedPriceHT;
  }
  public set selectedPriceHT(value: number) {
    this._selectedPriceHT = value;
  }

  public get priceTTC(): number {
    return this._priceTTC;
  }
  public set priceTTC(value: number) {
    this._priceTTC = value;
  }

  public get taxeAppliquee(): number {
    return this._taxeAppliquee;
  }
  public set taxeAppliquee(value: number) {
    this._taxeAppliquee = value;
  }

  public get isNecessary(): boolean {
    return this._isNecessary;
  }
  public set isNecessary(value: boolean) {
    this._isNecessary = value;
  }

  public get isImported(): boolean {
    return this._isImported;
  }
  public set isImported(value: boolean) {
    this._isImported = value;
  }

  public get pricesHt(): Array<number> {
    return this._pricesHt;
  }
  public set pricesHt(value: Array<number>) {
    this._pricesHt = value;
  }

}

import { Model } from "objection";
import { ID } from "../../core/types";
import ProductReal from "../products_real/product_real.model";

export default class SaleSubline extends Model {
  id?: ID;
  idLine?: number;
  idProductReal?: number;

  productReal?: ProductReal;
}

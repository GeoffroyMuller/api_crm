
import { Model } from "objection";

export default class Right extends Model {
  id?: number;
  name?: string;

  static get tableName() {
    return "rights";
  }
}

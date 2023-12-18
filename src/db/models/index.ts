import pg from "./client";
import { Knex } from "knex";

type CurrencyModelType = {
  id: number;
  name: string;
  rate: number;
}

interface DbModel<DB, ModelCurrency> {
  _db: DB;
  findByIdCurrency(id: number): Promise<ModelCurrency>,
  getCurrency(offset: number, limit: number): Promise<ModelCurrency[]>,
}

class PgModel implements DbModel<Knex, CurrencyModelType> {
  _db: Knex;
  private columnNameCurrency = 'currency';

  constructor(Db: Knex){
    this._db = Db;
  }

  public findByIdCurrency = async (id: number): Promise<CurrencyModelType> => {
    try {
      const result = await this._db(this.columnNameCurrency).select('*').where({ id }).first();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public getCurrency = async (offset: number, limit: number): Promise<CurrencyModelType[]> => {
    try {
      const result = await this._db(this.columnNameCurrency).select('*').offset(offset).limit(limit);
      return result;
    } catch (error) {
      throw error;
    }
  }

}


export const DbAction = new PgModel(pg);

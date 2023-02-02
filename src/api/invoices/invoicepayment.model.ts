import { Model } from "objection"

export default class InvoicePayment extends Model {
    id?: number;
    idClient?: number;
    idInvoice?: number;
    amount?: number;
    created_at?: string;

    static get tableName() {
        return 'invoice_payments'
    }

    static relationMappings() {
        const InvoiceModel = require('./invoice.model').default;
        return {
            invoice: {
                relation: Model.BelongsToOneRelation,
                modelClass: InvoiceModel,
                join: {
                    from: 'invoice_payments.idInvoice',
                    to: 'invoices.id'
                }
            },
        }
    };
}


import { Model, QueryBuilderType } from "objection";
import { Stream } from "stream";

export type IPdfService = {
  printPDF: (props: {
    returnType: "buffer" | "stream";
    inputPath: string;
    data: any;
    outputPath?: string;
  }) => Promise<Stream | Buffer>;
};

export type HandleFiltersFunction = <T extends Model>(
  query: QueryBuilderType<T>,
  filters: any,
  or?: boolean
) => QueryBuilderType<T>;

export type IMailService = {
    sendMail: (props: {
        from?: string;
        to: string | [string];
        html: string;
        text: string;
        subject: string;
    }) => void; 
}
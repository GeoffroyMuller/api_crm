import { join } from 'path';	
import { mkdirSync, writeFileSync } from 'fs';

const apiName = process.argv[2];
const apiNamePlural = apiName;
const apiNameUcFirst = apiName[0].toLocaleUpperCase() + apiName.substring(1);

const model = `
import { Model } from "objection";

export default class ${apiNameUcFirst} extends Model {
  static get tableName() {
    return "${apiNamePlural}";
  }
}
`;
const service = `
import serviceFactory from "../../core/service";
import ${apiNameUcFirst} from "./${apiName}.model";

const ${apiNamePlural}Service = serviceFactory<${apiNameUcFirst}>(${apiNameUcFirst}, {});

export default ${apiNamePlural}Service;

`;
const controller = `
import controllerFactory from "../../core/controller";
import ${apiNamePlural}Service from "./${apiName}.service";

const ${apiNamePlural}Controller = controllerFactory(${apiNamePlural}Service);

export default ${apiNamePlural}Controller;
`;
const index = `
const express = require('express');
import controller from "./${apiName}.controller";

const router = express.Router()

router.get('/', controller.getAll)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.get('/:id', controller.getById) 

export default router;
`;

const path = join('src', 'api', apiName);

mkdirSync(path);
writeFileSync(join(path, `${apiName}.model.ts`), model);
writeFileSync(join(path, `${apiName}.service.ts`), service);
writeFileSync(join(path, `${apiName}.controller.ts`), controller);
writeFileSync(join(path, `index.ts`), index);










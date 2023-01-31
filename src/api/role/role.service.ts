
import serviceFactory from "../../core/service";
import Role from "./role.model";

const roleService = serviceFactory<Role>(Role, {});

export default roleService;


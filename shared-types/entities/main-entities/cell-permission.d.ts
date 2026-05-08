import { BasePermission } from "../../common/permission";
import { EntityBase } from "../entity-base";

export interface CellPermission extends EntityBase {
    meeting_permissions: BasePermission,

    member_permissions: BasePermission
}
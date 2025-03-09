import { applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { UseGuards } from "@nestjs/common";
import { ROLES } from "../constants/roles.constants";

export const Auth = (...roles: ROLES[]) =>{
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}
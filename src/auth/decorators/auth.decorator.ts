import { applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { UseGuards } from "@nestjs/common";

export const Auth = (...roles: string[]) =>{
    roles.push('Admin');
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}
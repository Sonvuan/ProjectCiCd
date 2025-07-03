import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    Router
} from '@angular/router';
import { AuthService } from '../services/auth.services';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedPermissions = route.data['permissions']?.only || [];

        if (!Array.isArray(expectedPermissions)) {
            console.error('expectedPermissions không phải là mảng:', expectedPermissions);
            this.router.navigate(['/403']);
            return false;
        }

        const user = this.authService.getUser();
        if (!user) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        const userRoles = user.role || [];

        // 🔥 Sửa chỗ này: biến permission object => array
        let flatPermissions: string[] = [];
        if (user.permission && typeof user.permission === 'object') {
            for (const role in user.permission) {
                flatPermissions.push(role); // ROLE_STAFF, ROLE_USER
                flatPermissions.push(...user.permission[role]); // VIEW, EDIT,...
            }
        }

        const hasAccess = expectedPermissions.some((p: string) =>
            userRoles.includes(p) || flatPermissions.includes(p)
        );

        if (!hasAccess) {
            this.router.navigate(['/403']);
            return false;
        }

        return true;
    }
}

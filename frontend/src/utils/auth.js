// src/utils/auth.js

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user_info'));
    } catch {
        return null;
    }
}

export function getToken() {
    return localStorage.getItem('access_token');
}

export function hasPermission(permission) {
    const user = getUser();
    return user?.permissions.includes(permission);
}

export function hasRole(role) {
    const user = getUser();
    return user?.groups.includes(role);
}

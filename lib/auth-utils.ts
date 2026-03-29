export async function checkAdminPermissions() { return true; }
export async function withAdminAuth(fn: any) { return fn; }

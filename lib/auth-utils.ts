import { NextResponse } from 'next/server';

export async function checkAdminPermissions(): Promise<NextResponse | null> { return null; }
export async function withAdminAuth(fn: any) { return fn; }

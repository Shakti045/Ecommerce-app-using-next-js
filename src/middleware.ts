import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const token=request.cookies.get("ecommercetoken")?.value
    const currentpath=request.nextUrl.pathname;
    const publicpaths=['/signin', '/signup']
    if(publicpaths.includes(currentpath) && token ){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}
 

export const config = {
    matcher: ['/signin', '/signup'],
  }
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  // pages: {
  //   signIn: '/login',
  // },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - InfatecLogo.svg (logo file)
     * - LoginFormImage.svg (login form image file)
     * - PEGELogo.svg (logo file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

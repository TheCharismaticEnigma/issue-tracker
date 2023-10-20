export { default } from 'next-auth/middleware';

export const config = { matcher: ['/issues/new', '/issues/:id/edit'] };
// export const config = { matcher: ['/issues/new', '/issues/:id+'] };

// ? : 0/1 parameter(s)
// * : 0/more parameter(s)
// + : 1/more parameter(s)

/* 
    SECURITY - 
    1. Securing the entire private routes. (redirection w/ middleware) 
    2. Securing the API Endpoints. 
    3. Securing certain features in PUBLIC PAGES. 
*/

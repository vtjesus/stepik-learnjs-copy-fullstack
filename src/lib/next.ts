export const isServer = typeof window === 'undefined' ? true : false;
export const isClient = typeof window === 'undefined' ? false : true;

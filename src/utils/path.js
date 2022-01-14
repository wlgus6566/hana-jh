const pages = (path) => () => import(`@/views/${path}`);

export { pages };

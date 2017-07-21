import about from './subRoutes/about'
import account from './subRoutes/account'
import common from './subRoutes/common'

let routes = common;
routes.unshift(about, account);

export default routes;

import PeoplePage from "@containers/PeoplePage/PeoplePage"
import HomePage from "@containers/HomePage/HomePage"
import NotFoundPage from "@containers/NotFoundPage/NotFoundPage"
import PersonPage from "@containers/PersonPage/PersonPage"
import FavoritePage from "@containers/FavoritePage/FavoritePage"
import SearchPage from "@containers/SearchPage/SearchPage"
import ErrorMessage from "@components/ErrorMessage/ErrorMessage"

const routesConfig = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/people",
    component: PeoplePage,
  },
  {
    path: "/people/:id",
    component: PersonPage,
  },
  {
    path: "/not-found",
    component: NotFoundPage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/favorites",
    component: FavoritePage,
  },
  {
    path: "/fail",
    component: ErrorMessage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
]

export default routesConfig

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Switch from "react-router-transition-switch";
import Loadable from "react-loadable";
import { connect } from "react-redux";

import Layout from "layouts";
import Loader from "components/layout/Loader";
// import NotFoundPage from 'pages/system/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />
  });

const routes = [
  // Dashboards
  {
    path: "/dashboard/analytics",
    Component: loadable(() => import("pages/dashboard/analytics")),
    exact: true
  },

  // System Pages
  {
    path: "/system/login",
    Component: loadable(() => import("pages/system/login")),
    exact: true
  },
  {
    path: "/system/forgot-password",
    Component: loadable(() => import("pages/system/forgot-password")),
    exact: true
  },
  {
    path: "/system/register",
    Component: loadable(() => import("pages/system/register")),
    exact: true
  },
  {
    path: "/system/lockscreen",
    Component: loadable(() => import("pages/system/lockscreen")),
    exact: true
  },
  {
    path: "/system/404",
    Component: loadable(() => import("pages/system/404")),
    exact: true
  },
  {
    path: "/system/500",
    Component: loadable(() => import("pages/system/500")),
    exact: true
  },
  {
    path: "/publisher/list",
    Component: loadable(() => import("components/Publishers/PublishersList")),
    exact: true
  },
  {
    path: "/publisher/create",
    Component: loadable(() => import("components/Publishers/CreatePublisher")),
    exact: true
  },
  // {
  //   path: '/publisher/update',
  //   Component: loadable(() => import('components/Publishers/UpdatePublisher')),
  //   exact: true,
  // },

  {
    path: "/stats/index/offers",
    Component: loadable(() => import("components/Reports/OfferReports")),
    exact: true
  },
  {
    path: "/advertisers/list",
    Component: loadable(() => import("components/Advertisers/AdvertisersList")),
    exact: true
  },
  {
    path: "/advertisers/create",
    Component: loadable(() =>
      import("components/Advertisers/CreateAdvertiser")
    ),
    exact: true
  },
  // {
  //   path: '/advertisers/update',
  //   Component: loadable(() => import('components/Advertisers/UpdateAdvertiser')),
  //   exact: true,
  // },
  {
    path: "/offers_list",
    Component: loadable(() => import("components/Offers/Offers/ManageOffers")),
    exact: true
  },
  {
    path: "/offers/add",
    Component: loadable(() => import("components/Offers/Offers/CreateOffer")),
    exact: true
  },
  {
    path: "/offers/view/:id",
    Component: loadable(() => import("components/Offers/Offers/ViewOffer")),
    exact: true
  },
  {
    path: "/offers/edit/:id",
    Component: loadable(() => import("components/Offers/Offers/EditOffer")),
    exact: true
  },
  {
    path: "/offer_files",
    Component: loadable(() =>
      import("components/Offers/CreativeFiles/CreativeFiles")
    ),
    exact: true
  },
  {
    path: "/offer_files/upload_multiple",
    Component: loadable(() =>
      import("components/Offers/CreativeFiles/CreateBanner")
    ),
    exact: true
  },
  {
    path: "/offer_files/view/:id",
    Component: loadable(() =>
      import("components/Offers/CreativeFiles/ViewBanner")
    ),
    exact: true
  },
  {
    path: "/offer_files/edit/:id",
    Component: loadable(() =>
      import("components/Offers/CreativeFiles/EditBanner")
    ),
    exact: true
  },

  {
    path: "/offer_access/applications",
    Component: loadable(() =>
      import("components/Offers/OfferApplications/OfferApplications")
    ),
    exact: true
  },
  {
    path: "/offer_types",
    Component: loadable(() =>
      import("components/Offers/Categories/OfferCategories")
    ),
    exact: true
  },
  {
    path: "/offer_types/view/:id",
    Component: loadable(() =>
      import("components/Offers/Categories/AddOfferCategory")
    ),
    exact: true
  },
  {
    path: "/offer_types/create",
    Component: loadable(() =>
      import("components/Offers/Categories/CreateCategory")
    ),
    exact: true
  },
  {
    path: "/offer_types/add_offer/:id",
    Component: loadable(() =>
      import("components/Offers/Categories/AddOfferToCategory")
    ),
    exact: true
  },
  {
    path: "/offer_types/edit/:id",
    Component: loadable(() =>
      import("components/Offers/Categories/EditCategory")
    ),
    exact: true
  },
  {
    path: "/offer_groups",
    Component: loadable(() => import("components/Offers/Groups/OfferGroups")),
    exact: true
  },
  {
    path: "/offer_groups/create",
    Component: loadable(() => import("components/Offers/Groups/CreateGroup")),
    exact: true
  },
  {
    path: "/offer_groups/view/:id",
    Component: loadable(() => import("components/Offers/Groups/AddOfferGroup")),
    exact: true
  },
  {
    path: "/offer_groups/add_offer/:id",
    Component: loadable(() =>
      import("components/Offers/Groups/AddOfferToGroup")
    ),
    exact: true
  },
  {
    path: "/offer_groups/edit/:id",
    Component: loadable(() => import("components/Offers/Groups/EditGroup")),
    exact: true
  },

  {
    path: "/dne_lists",
    Component: loadable(() =>
      import("components/Offers/SuppressionLists/SuppressionLists")
    ),
    exact: true
  },
  {
    path: "/dne_lists/create_list",
    Component: loadable(() =>
      import("components/Offers/SuppressionLists/CreateSuppression")
    ),
    exact: true
  }
  // {
  //   path: '/offer/update',
  //   Component: loadable(() => import('components/Offers/UpdateOffer')),
  //   exact: true,
  // },
];

const mapStateToProps = ({ settings }) => ({ settings });

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation }
    } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname }
              } = props;
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === "none" ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              );
            }}
          >
            <Route
              exact
              path="/"
              render={() => <Redirect to="/dashboard/analytics" />}
            />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Layout>
      </ConnectedRouter>
    );
  }
}

export default Router;

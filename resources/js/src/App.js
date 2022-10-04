import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from 'aos';

import ErrorBoundary from './hoc/ErrorBoundary';

import AuthUserLayout from './containers/Auth/User/Layout';
import AuthAdminLayout from './containers/Auth/Admin/Layout';
import FrontendLayout from './containers/Frontend/Layout';
import BackendManagerLayout from './containers/Backend/Manager/Layout';

import Spinner from './components/UI/Preloaders/Spinner';
import Loading from './components/UI/Preloaders/Loading';

import { authCheckState } from './store/actions/auth';

import 'aos/dist/aos.css';

const importedRoutes = {
    // Backend routes
    Backend: {
        // Manager routes
        Manager: {
            Dashboard: lazy(() => import('./containers/Backend/Manager/Dashboard')),
            Cms: {
                Global: lazy(() => import('./containers/Backend/Manager/Cms/Global')),
                General: lazy(() => import('./containers/Backend/Manager/Cms/General')),
                Auth: lazy(() => import('./containers/Backend/Manager/Cms/Auth')),
                Backend: lazy(() => import('./containers/Backend/Manager/Cms/Backend')),
                Frontend: lazy(() => import('./containers/Backend/Manager/Cms/Frontend'))
            },
            Settings: {
                Language: lazy(() => import('./containers/Backend/Manager/Settings/Language')),
            },
            Features: {
                Index: lazy(() => import('./containers/Backend/Manager/Features')),
                Add: lazy(() => import('./containers/Backend/Manager/Features/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Features/Edit'))
            },
            Languages: {
                Index: lazy(() => import('./containers/Backend/Manager/Languages')),
                Add: lazy(() => import('./containers/Backend/Manager/Languages/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Languages/Edit'))
            },
            Roles: {
                Index: lazy(() => import('./containers/Backend/Manager/Roles')),
                Add: lazy(() => import('./containers/Backend/Manager/Roles/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Roles/Edit'))
            },
            Subjects: {
                Index: lazy(() => import('./containers/Backend/Manager/Subjects')),
                Add: lazy(() => import('./containers/Backend/Manager/Subjects/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Subjects/Edit')),
            },
            Testimonies: {
                Index: lazy(() => import('./containers/Backend/Manager/Testimonies')),
                Add: lazy(() => import('./containers/Backend/Manager/Testimonies/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Testimonies/Edit')),
            },
            TrainingCategories: {
                Index: lazy(() => import('./containers/Backend/Manager/TrainingCategories')),
                Add: lazy(() => import('./containers/Backend/Manager/TrainingCategories/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/TrainingCategories/Edit'))
            },
            TrainingLevels: {
                Index: lazy(() => import('./containers/Backend/Manager/TrainingLevels')),
                Add: lazy(() => import('./containers/Backend/Manager/TrainingLevels/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/TrainingLevels/Edit')),
            },
            Trainings: {
                Index: lazy(() => import('./containers/Backend/Manager/Trainings')),
                Add: lazy(() => import('./containers/Backend/Manager/Trainings/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Trainings/Edit')),
            },
            PublicationCategories: {
                Index: lazy(() => import('./containers/Backend/Manager/PublicationCategories')),
                Add: lazy(() => import('./containers/Backend/Manager/PublicationCategories/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/PublicationCategories/Edit'))
            },
            Publications: {
                Index: lazy(() => import('./containers/Backend/Manager/Publications')),
                Add: lazy(() => import('./containers/Backend/Manager/Publications/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Publications/Edit'))
            },
            Images: {
                Index: lazy(() => import('./containers/Backend/Manager/Images')),
                Add: lazy(() => import('./containers/Backend/Manager/Images/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Images/Edit'))
            },
            Users: {
                Index: lazy(() => import('./containers/Backend/Manager/Users')),
                Add: lazy(() => import('./containers/Backend/Manager/Users/Add')),
                Edit: lazy(() => import('./containers/Backend/Manager/Users/Edit'))
            }
        },

        // Admin routes
        Admin: {
            Admins: {
                Index: lazy(() => import('./containers/Backend/Admin/Admins')),
                Add: lazy(() => import('./containers/Backend/Admin/Admins/Add')),
                Edit: lazy(() => import('./containers/Backend/Admin/Admins/Edit')),
            }
        }
    },

    // Auth routes
    Auth: {
        User: {
            Login: lazy(() => import('./containers/Auth/User/Login'))
        },
        Admin: {
            Login: lazy(() => import('./containers/Auth/Admin/Login')),
            Verify: lazy(() => import('./containers/Auth/Admin/Verify'))
        }
    },

    // Frontend routes
    Frontend: {
        Home: lazy(() => import('./containers/Frontend/Home')),
        About: lazy(() => import('./containers/Frontend/About')),
        Gallery: lazy(() => import('./containers/Frontend/Gallery')),
        Contact: lazy(() => import('./containers/Frontend/Contact')),
        Publications: {
            Index: lazy(() => import('./containers/Frontend/Publications')),
            Show: lazy(() => import('./containers/Frontend/Publications/Show')),
        },
        Trainings: {
            Index: lazy(() => import('./containers/Frontend/Trainings')),
            Show: lazy(() => import('./containers/Frontend/Trainings/Show')),
        },
    }
};

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
        init();
    }

    render() {
        const { content: { cms, error: content_error, countries }, auth: { error: auth_error, role }, location: { pathname } } = this.props;
        const isAuthenticated = localStorage.getItem('token') !== null;
        if (
            (content_error && (content_error.message.includes("Server Error" || "[1045] Access denied for user"))) ||
            (auth_error && (auth_error.message.includes("Server Error" || "[1045] Access denied for user" || "No application encryption key has been specified.")))
        ) location.reload();

        const frontendRoutes = <Route path="/">
            <FrontendLayout>
                <Switch>
                    <Route path="/publications/:category?">
                        <Switch>
                            <Route path="/publications/:category/:slug" component={importedRoutes.Frontend.Publications.Show} />
                            <Route path="/publications/:category?" component={importedRoutes.Frontend.Publications.Index} />
                        </Switch>
                    </Route>

                    <Route path="/trainings/:category?">
                        <Switch>
                            <Route path="/trainings/:category/:slug" component={importedRoutes.Frontend.Trainings.Show} />
                            <Route path="/trainings/:category?" component={importedRoutes.Frontend.Trainings.Index} />
                        </Switch>
                    </Route>

                    <Route path="/contact" component={importedRoutes.Frontend.Contact} />
                    <Route path="/gallery" component={importedRoutes.Frontend.Gallery} />
                    <Route path="/about" component={importedRoutes.Frontend.About} />
                    <Route path="/" component={importedRoutes.Frontend.Home} />
                </Switch>
            </FrontendLayout>
        </Route>;

        let routes = <Switch>
            <Route path="/auth/admin">
                <AuthAdminLayout>
                    <Switch>
                        <Route path="/auth/admin/verify" component={importedRoutes.Auth.Admin.Verify} />
                        <Route path="/auth/admin/login" component={importedRoutes.Auth.Admin.Login} />
                    </Switch>
                </AuthAdminLayout>
            </Route>
            <Redirect path="/admin" to="/auth/admin/login" />

            <Route path="/auth/user">
                <AuthUserLayout>
                    <Switch>
                        <Route path="/auth/user/login" component={importedRoutes.Auth.User.Login} />
                    </Switch>
                </AuthUserLayout>
            </Route>
            <Redirect path="/user" to="/auth/user/login" />

            {frontendRoutes}
        </Switch>;

        if (isAuthenticated) {
            routes = <Switch>
                <Route path={['/user', '/admin']}>
                    <BackendManagerLayout>
                        <Switch>
                            <Route path="/admin/admins/:id/edit" component={importedRoutes.Backend.Admin.Admins.Edit} />
                            <Route path="/admin/admins/add" component={importedRoutes.Backend.Admin.Admins.Add} />
                            <Route path="/admin/admins" component={importedRoutes.Backend.Admin.Admins.Index} />

                            <Route path="/:manager/cms/global" component={importedRoutes.Backend.Manager.Cms.Global} />
                            <Route path="/:manager/cms/general" component={importedRoutes.Backend.Manager.Cms.General} />
                            <Route path="/:manager/cms/auth" component={importedRoutes.Backend.Manager.Cms.Auth} />
                            <Route path="/:manager/cms/backend" component={importedRoutes.Backend.Manager.Cms.Backend} />
                            <Route path="/:manager/cms/frontend" component={importedRoutes.Backend.Manager.Cms.Frontend} />

                            <Route path="/:manager/dashboard" component={importedRoutes.Backend.Manager.Dashboard} />

                            <Route path="/:manager/features/:id/edit" component={importedRoutes.Backend.Manager.Features.Edit} />
                            <Route path="/:manager/features/add" component={importedRoutes.Backend.Manager.Features.Add} />
                            <Route path="/:manager/features" component={importedRoutes.Backend.Manager.Features.Index} />

                            <Route path="/:manager/languages/:id/edit" component={importedRoutes.Backend.Manager.Languages.Edit} />
                            <Route path="/:manager/languages/add" component={importedRoutes.Backend.Manager.Languages.Add} />
                            <Route path="/:manager/languages" component={importedRoutes.Backend.Manager.Languages.Index} />

                            <Route path="/:manager/roles/:id/edit" component={importedRoutes.Backend.Manager.Roles.Edit} />
                            <Route path="/:manager/roles/add" component={importedRoutes.Backend.Manager.Roles.Add} />
                            <Route path="/:manager/roles" component={importedRoutes.Backend.Manager.Roles.Index} />

                            <Route path="/:manager/settings/language" component={importedRoutes.Backend.Manager.Settings.Language} />

                            <Route path="/:manager/users/:id/edit" component={importedRoutes.Backend.Manager.Users.Edit} />
                            <Route path="/:manager/users/add" component={importedRoutes.Backend.Manager.Users.Add} />
                            <Route path="/:manager/users" component={importedRoutes.Backend.Manager.Users.Index} />



                            <Route path="/:manager/subjects/:id/edit" component={importedRoutes.Backend.Manager.Subjects.Edit} />
                            <Route path="/:manager/subjects/add" component={importedRoutes.Backend.Manager.Subjects.Add} />
                            <Route path="/:manager/subjects" component={importedRoutes.Backend.Manager.Subjects.Index} />

                            <Route path="/:manager/testimonies/:id/edit" component={importedRoutes.Backend.Manager.Testimonies.Edit} />
                            <Route path="/:manager/testimonies/add" component={importedRoutes.Backend.Manager.Testimonies.Add} />
                            <Route path="/:manager/testimonies" component={importedRoutes.Backend.Manager.Testimonies.Index} />

                            <Route path="/:manager/training-categories/:id/edit" component={importedRoutes.Backend.Manager.TrainingCategories.Edit} />
                            <Route path="/:manager/training-categories/add" component={importedRoutes.Backend.Manager.TrainingCategories.Add} />
                            <Route path="/:manager/training-categories" component={importedRoutes.Backend.Manager.TrainingCategories.Index} />

                            <Route path="/:manager/training-levels/:id/edit" component={importedRoutes.Backend.Manager.TrainingLevels.Edit} />
                            <Route path="/:manager/training-levels/add" component={importedRoutes.Backend.Manager.TrainingLevels.Add} />
                            <Route path="/:manager/training-levels" component={importedRoutes.Backend.Manager.TrainingLevels.Index} />

                            <Route path="/:manager/trainings/:id/edit" component={importedRoutes.Backend.Manager.Trainings.Edit} />
                            <Route path="/:manager/trainings/add" component={importedRoutes.Backend.Manager.Trainings.Add} />
                            <Route path="/:manager/trainings" component={importedRoutes.Backend.Manager.Trainings.Index} />

                            <Route path="/:manager/publication-categories/:id/edit" component={importedRoutes.Backend.Manager.PublicationCategories.Edit} />
                            <Route path="/:manager/publication-categories/add" component={importedRoutes.Backend.Manager.PublicationCategories.Add} />
                            <Route path="/:manager/publication-categories" component={importedRoutes.Backend.Manager.PublicationCategories.Index} />

                            <Route path="/:manager/publications/:id/edit" component={importedRoutes.Backend.Manager.Publications.Edit} />
                            <Route path="/:manager/publications/add" component={importedRoutes.Backend.Manager.Publications.Add} />
                            <Route path="/:manager/publications" component={importedRoutes.Backend.Manager.Publications.Index} />

                            <Route path="/:manager/images/:id/edit" component={importedRoutes.Backend.Manager.Images.Edit} />
                            <Route path="/:manager/images/add" component={importedRoutes.Backend.Manager.Images.Add} />
                            <Route path="/:manager/images" component={importedRoutes.Backend.Manager.Images.Index} />



                            <Redirect path="/admin" to={`/admin/dashboard`} />
                            <Redirect path="/user" to={`/user/dashboard`} />
                        </Switch>
                    </BackendManagerLayout>
                </Route>

                <Redirect path="/dashboard" to={`/${role}/dashboard`} />
                <Redirect path="/login" to={`/${role}/dashboard`} />
                <Redirect path="/start" to={`/${role}/dashboard`} />
                <Redirect path="/auth" to={`/${role}/dashboard`} />

                {frontendRoutes}
            </Switch>;
        }

        routes = <ErrorBoundary>
            <Suspense fallback={<Loading waiting isAuthenticated={isAuthenticated && (pathname.includes('/user/') || pathname.includes('/admin/'))} />}>
                {routes}
            </Suspense>
        </ErrorBoundary>;

        const dataReady = cms !== undefined && countries !== undefined && ((isAuthenticated && role !== undefined) || !isAuthenticated);

        return <div className='App'>{dataReady ? routes : <Spinner />}</div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    authCheckState: () => dispatch(authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import withInsideModal from '../hoc/withInsideModal';
import Navbar from './Navbar/Navbar';
import Loading from '../pages/Loading/Loading';

import UploadPage from '../pages/Upload/Upload';
const Modal = React.lazy(() => import('../UI/Modal/Modal'));
const LogoutPage = React.lazy(() => import('../components/Logout'));
const HomePage = React.lazy(() => import('../pages/Home/Home'));
const ImagePage = React.lazy(() => import('../pages/Image/Image'));
const LoginPage = React.lazy(() => import('../pages/Login/Login'));
const UserPage = React.lazy(() => import('../pages/User/User'));
const MobileSearchPage = React.lazy(() =>
  import('../pages/MobileSearch/MobileSearch')
);
const SearchImagePage = React.lazy(() =>
  import('../pages/SearchImage/SearchImage')
);
const SearchUserPage = React.lazy(() =>
  import('../pages/SearchUser/SearchUser')
);
const AccountPage = React.lazy(() => import('../pages/Account/Account'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

class RootRoutesMapping extends React.Component {
  render() {
    const { inModal, previousLocation, location } = this.props;

    return (
      <Suspense fallback={<Loading />}>
        {/* height of navbar is 6.5rem or 65 px */}
        <Navbar />

        {/* used marginTop to not overlap with NavBar */}
        <div style={{ marginTop: '6.5rem' }}>
          {/* location prop tells route to match its path with Switch's location prop */}
          <Switch location={inModal ? previousLocation : location}>
            <Route exact path="/" component={HomePage} />
            <Route path="/images/:id" component={ImagePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="/mobile-search" component={MobileSearchPage} />
            <Route path="/s/images/:searchTerm" component={SearchImagePage} />
            <Route path="/s/users/:searchTerm" component={SearchUserPage} />
            <Route path="/account" component={AccountPage} />
            <Route component={NotFound} />
          </Switch>

          {/* path "/upload" will render inside modal */}
          <Route exact path="/upload" component={UploadPage} />

          {inModal ? (
            <Route
              path="/images/:id"
              render={props => <Modal {...props} component={ImagePage} />}
            />
          ) : null}
        </div>
      </Suspense>
    );
  }
}

export default withInsideModal(RootRoutesMapping);

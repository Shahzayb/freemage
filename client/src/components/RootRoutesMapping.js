import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import withInsideModal from '../hoc/withInsideModal';
import HomePage from '../pages/Home/Home';
import ImagePage from '../pages/Image/Image';
import UploadPage from '../pages/Upload/Upload';
import LoginPage from '../pages/Login/Login';
import UserPage from '../pages/User/User';
import MobileSearchPage from '../pages/MobileSearch/MobileSearch';
import SearchImagePage from '../pages/SearchImage/SearchImage';
import Navbar from './Navbar/Navbar';

class RootRoutesMapping extends React.Component {
  render() {
    const { inModal, previousLocation, location } = this.props;

    return (
      <>
        {/* height of navbar is 6.5rem or 65 px */}
        <Navbar />

        {/* used marginTop to not overlap with NavBar */}
        <div style={{ marginTop: '6.5rem' }}>
          {/* location prop tells route to match its path with Switch's location prop */}
          <Switch location={inModal ? previousLocation : location}>
            <Route exact path="/" component={HomePage} />
            <Route path="/images/:id" component={ImagePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/users/:id" component={UserPage} />
            <Route path="/mobile-search" component={MobileSearchPage} />
            <Route path="/s/images/:searchTerm" component={SearchImagePage} />
          </Switch>

          {/* Upload page will always render inside modal */}
          <Route
            path="/upload"
            render={props => <Modal {...props} component={UploadPage} />}
          />

          {inModal ? (
            <Route
              path="/images/:id"
              render={props => <Modal {...props} component={ImagePage} />}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default withInsideModal(RootRoutesMapping);

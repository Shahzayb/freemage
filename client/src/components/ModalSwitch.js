import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import withMobileSize from '../hoc/withMobileSize';
import Home from '../pages/Home/Home';
import Image from '../pages/Image/Image';
import Upload from '../pages/Upload/Upload';
import Login from '../pages/Login/Login';
import User from '../pages/User/User';
import MobileSearch from '../pages/MobileSearch/MobileSearch';
import SearchImage from '../pages/SearchImage/SearchImage';
import Navbar from './Navbar/Navbar';

class ModalSwitch extends React.Component {
  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const isModal =
      (!!(location.state && location.state.modal) &&
        !this.props.isMobileSized &&
        this.props.history.action !== 'POP') ||
      this.props.location.pathname === '/upload';

    if (!isModal) {
      this.previousLocation = location;
    }

    return (
      <>
        <Navbar />
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/images/:id" component={Image} />
          <Route path="/login" component={Login} />
          <Route path="/users/:id" component={User} />
          <Route path="/mobile-search" component={MobileSearch} />
          <Route path="/s/images/:searchTerm" component={SearchImage} />
        </Switch>
        {/* Upload page will always render inside modal */}
        <Route
          path="/upload"
          render={props => <Modal {...props} component={Upload} />}
        />
        {isModal ? (
          <Route
            path="/images/:id"
            render={props => <Modal {...props} component={Image} />}
          />
        ) : null}
      </>
    );
  }
}

export default withMobileSize(ModalSwitch);

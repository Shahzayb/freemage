import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import withMobileSize from '../hoc/withMobileSize';
import Home from '../pages/Home/Home';
import Image from '../pages/Image/Image';
import Upload from '../pages/Upload/Upload';
import Login from '../pages/Login/Login';

class ModalSwitch extends React.Component {
  render() {
    const { location } = this.props;
    const isModal =
      (!!(location.state && location.state.modal) &&
        !this.props.isMobileSized &&
        this.props.history.action !== 'POP') ||
      this.props.location.pathname === '/upload';

    return (
      <>
        <Switch location={isModal ? { pathname: '/' } : location}>
          <Route exact path="/" component={Home} />
          <Route path="/images/:id" component={Image} />
          <Route path="/login" component={Login} />
        </Switch>
        <Route
          path="/upload"
          render={props => (
            <Modal {...props}>
              <Upload></Upload>
            </Modal>
          )}
        />
        {isModal ? (
          <Route
            path="/images/:id"
            render={props => (
              <Modal {...props}>
                <Image></Image>
              </Modal>
            )}
          />
        ) : null}
      </>
    );
  }
}

export default withMobileSize(ModalSwitch);

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './Account.module.css';
import Spinner from '../../UI/Spinner';
import { fetchAccount, updateAccount } from '../../actions/account';

const Account = props => {
  const isLoggedIn = props.isLoggedIn;
  const loggedUserId = props.userId;
  const { fetchAccount, updateAccount } = props;
  useEffect(() => {
    if (isLoggedIn) {
      fetchAccount(loggedUserId);
    }
  }, [isLoggedIn, loggedUserId, fetchAccount]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (!props.account.userId) {
    return (
      <div
        style={{
          marginTop: '15rem',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Spinner type="TailSpin" color="#111" width={40} height={40} />
      </div>
    );
  }

  return (
    <div className={css.AccountContainer}>
      <h1>Update Account</h1>
      <Formik
        initialValues={{
          firstName: props.account.firstName,
          lastName: props.account.lastName
        }}
        validate={values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          } else if (!values.lastName) {
            errors.lastName = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            updateAccount(values.firstName, values.lastName, () =>
              setSubmitting(false)
            );
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.Field}>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div className={css.Field}>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <button
              className={css.PrimaryBtn}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.userId,
  account: state.account
});

const mapDispatchToProps = { fetchAccount, updateAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Account);

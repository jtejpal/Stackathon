import React from "react";
import { connect } from "react-redux";
import { updateUserStripeIdThunk } from "../store/auth";
import { createStripeSubscriptionThunk } from "../store/stripeSubscription";

class Memberships extends React.Component {
  constructor() {
    super();
    this.clickHandlerTierOne = this.clickHandlerTierOne.bind(this);
    this.clickHandlerTierTwo = this.clickHandlerTierTwo.bind(this);
  }

  componentDidMount() {
    if (this.props.updateUser) {
      this.props.updateUserStripeId(
        this.props.auth.id,
        this.props.stripeCustomer.id
      );
    }
  }

  async clickHandlerTierOne() {
    //StripeSubscription thunk
    if (this.props.updateUser) {
      await this.props.createStripeSubscription(
        this.props.stripeCustomer.id,
        "price_1JO75mBleqgWsErVzIHZHQdf"
      );
      this.props.history.push("/subscribe");
    }
  }

  clickHandlerTierTwo() {
  }

  render() {
    return (
      <div className="container vh-100 d-flex align-items-start">
        <div className="row row-cols-3 text-white bg-dark h-25 mt-5 h-50">
          <div className="col">
            <div className="card bg-dark bg-opacity-50 bg-gradient h-100">
              <div className="card-header bg-transparent border-success">
                <h4 className="fw-bolder text-center">Free</h4>
              </div>
              <div className="card-body">
                <h4 className="fw-bold text-center">Enjoy your Music and Search any song you want to
                listen to!</h4>
              </div>
              <div className="card-footer">
                <a className="col-12 btn btn-success" href="http://localhost:8080/api/spotify/login" role="button">
                  Link
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark bg-opacity-50 bg-gradient h-100">
              <div className="card-header bg-transparent border-success">
                <h4 className="fw-bolder text-center">Tier 1</h4>
              </div>
              <div className="card-body">
                <h4 className="fw-bold text-center">Unlock lyrics and sing along to your favorite music</h4>
              </div>
              <div className="card-footer">
                <form action={`/api/stripe/subscription?priceId=price_1JO75mBleqgWsErVzIHZHQdf&stripeId=${this.props.auth.stripeId}`} method="POST">
                <input type="hidden" name="priceId" value="price_1JO75mBleqgWsErVzIHZHQdf" />
                <button className="col-12 btn btn-success" type="submit">Buy Me</button>
            </form>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark bg-opacity-50 bg-gradient h-100">
              <div className="card-header bg-transparent border-success">
                <h4 className="fw-bolder text-center">Tier 2</h4>
              </div>
              <div className="card-body">
                <h4 className="fw-bold text-center">Create Rooms and invite friends to sing along with you</h4>
              </div>
              <div className="card-footer">
                <button className="col-12 btn btn-success" type="submit">Buy Me</button>
              </div>
            </div>
          </div>
          {/* <div>
            <form action={`/api/stripe/subscription?priceId=price_1JO75mBleqgWsErVzIHZHQdf&stripeId=${this.props.auth.stripeId}`} method="POST">
            Tier 1: Unlock lyrics and sing along to your favorite music
              <input type="hidden" name="priceId" value="price_1JO75mBleqgWsErVzIHZHQdf" />
              <button type="submit">Buy Me</button>
            </form>
          </div> */}
          {/* <div>
            Tier 2: Create Rooms and invite friends to sing along with you
            <button className="btn btn-success">Buy Me</button>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUserStripeId: (userId, stripeCustomer) =>
      dispatch(updateUserStripeIdThunk(userId, stripeCustomer)),
    createStripeSubscription: (customerId, priceId) =>
      dispatch(createStripeSubscriptionThunk(customerId, priceId)),
  };
};

const mapSignup = (state) => {
  return {
    auth: state.auth,
    stripeCustomer: state.stripeCustomer,
    updateUser: true,
  };
};

const mapUser = (state) => {
  return {
    auth: state.auth,
    updateUser: false,
  };
};

// export default connect(null, mapDispatch)(Memberships)

export const UserMemberships = connect(mapUser, mapDispatch)(Memberships);
export const SignupMemberships = connect(mapSignup, mapDispatch)(Memberships);

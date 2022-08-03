import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product, setProduct] = useState({
    name: "R App",
    price: 10,
    productBy: "by vibhu"
  });
  const makePayment = token => {
    const body = {
      token,
      product
    };

    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:8282/payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      const { status } = res;
      console.log("STATUS", status);
      console.log("RESPONSE::", res);
      if (!res.ok) {
        throw Error(res.statusText);
      }
      // Read the response as json.
      return res.json();
    }).then(response => console.log("GOT RES::", response)).catch(err => console.log("ERROR", err))

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey='pk_test_51IZVN6SBtBgOt9E1ZtGy194DMTs0s7wKgVAdr1gptpoUdQ0VxWoLMkcIfVLWKChH5bKpwxP8IXS9LxPC0StZUN0s00z4mFtqNc'
          token={makePayment}
          name='Buy App'
          amount={product.price * 100}
        />
      </header>
    </div>
  );
}

export default App;

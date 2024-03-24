import React, { useState, useEffect } from "react";
import { request } from "../axios_helper";

function HomeContent({ createSavings }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    request("GET", "/bank/home", {}).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="row justify-content-md-center">
      <div className="col-4">
        <div className="card" style={{ width: "18rem", marginTop: "30px" }}>
          <div className="card-body">
            <h5 className="card-title">Backend response</h5>
            <p className="card-text">Home Content:</p>
            <ul>
              {data && data.map((line, index) => <li key={index}>{line}</li>)}
            </ul>
          </div>
        </div>
        <div class="media">
          <div class="media-body">
            <h5 class="mt-0">Digitbank Savings</h5>
            <p>
              Digitbank now works even harder for you with a new Savings
              account. Grow your Daily Cash over time at 4.50% APY when you open
              a high-yield Savings account.
            </p>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick={() => createSavings()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;

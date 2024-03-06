import React, { useState, useEffect } from 'react';
import { request } from '../axios_helper';

function HomeContent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        request(
            "GET",
            "/bank/home",
            {}
        ).then((response) => {
            setData(response.data);
        });
    }, []);

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{ width: "18rem", marginTop: '30px' }}>
                    <div className="card-body">
                        <h5 className="card-title">Backend response</h5>
                        <p className="card-text">Home Content:</p>
                        <ul>
                            {data && data.map((line, index) => <li key={index}>{line}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;

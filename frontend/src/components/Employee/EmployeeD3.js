import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import "../../styles.css";

const EmployeeD3 = () => {
    const [data, setData] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch("/data.json");
        setData(await response.json());
    };

    return (
        <div className="App">
            <LineChart data={data}/>
        </div>
    );
};

export default EmployeeD3;

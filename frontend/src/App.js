import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // d3
    const [data, setData] = useState([]);
    const svgRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('데이터를 가져오는 데 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sales'); // 예시로 sales 데이터를 가져온다고 가정
                setData(response.data);
            } catch (err) {
                setError('시각화 데이터를 가져오는 데 오류가 발생했습니다.');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.sales)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('x', (d, i) => x(i))
            .attr('y', d => y(d.sales))
            .attr('height', d => y(0) - y(d.sales))
            .attr('width', x.bandwidth());

        svg.append("g")
            .attr("class", "axis-label")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickFormat(i => `Week ${i + 1}`).tickSizeOuter(0));

        svg.append("g")
            .attr("class", "axis-label")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

    }, [data]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        이름: {user.name}, 번호: {user.num}
                    </li>
                ))}
            </ul>
            <h1>그래프 테스트</h1>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default App;

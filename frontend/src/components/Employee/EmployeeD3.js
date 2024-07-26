import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import "../../styles.css";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, NativeSelect, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeD3 = () => {
    const [data, setData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedOption, setSelectedOption] = useState('salary');
    const [showSelect, setShowSelect] = useState(false);
    const [averageSalary, setAverageSalary] = useState(null);

    const navigate = useNavigate(-1);


    useEffect(() => {
        if (selectedDepartment) {
            fetchData();
        }
    }, );

    const fetchData = async () => {
        try {
            const response = await fetch('/api/d3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    department: selectedDepartment,
                    option: selectedOption,
                }),
            });

            const result = await response.json();
            if (selectedOption === 'salary') {
                const salaryData = result.map(item => ({ salary: Number(item.salary) }));
                setData(salaryData);
                const totalSalary = salaryData.reduce((sum, item) => sum + item.salary, 0);
                const average = totalSalary / salaryData.length;
                setAverageSalary(average);
            } else if (selectedOption === 'job_title') {
                const formattedData = result.map(item => ({
                    job_title: item.job_title,
                    count: item.count
                }));
                setData(formattedData);
                setAverageSalary(null);
            }
        } catch (error) {
            console.error('에러메세지:', error);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedDepartment(event.target.value);
        setShowSelect(true);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="App">
            <FormControl style={{ marginLeft: '20px' }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Department</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="개발팀" control={<Radio />} label="개발팀" />
                    <FormControlLabel value="재무팀" control={<Radio />} label="재무팀" />
                    <FormControlLabel value="인사팀" control={<Radio />} label="인사팀" />
                    <FormControlLabel value="물류팀" control={<Radio />} label="물류팀" />
                </RadioGroup>
            </FormControl>
            <Button style={{ color: 'black', marginLeft: '15px', marginTop: '23px', border: '1px solid' }} onClick={() => navigate(-1)}>
                BACK
            </Button>
            <br />
            {showSelect && (
                <FormControl style={{ marginLeft: '20px' }}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Select
                    </InputLabel>
                    <NativeSelect
                        value={selectedOption}
                        onChange={handleSelectChange}
                        inputProps={{
                            name: 'option',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={'salary'}>Salary</option>
                        <option value={'job_title'}>Job Title</option>
                    </NativeSelect>
                </FormControl>
            )}

            <LineChart data={data} option={selectedOption} style={{ maxWidth: '90%' }} />
            {selectedOption === 'salary' && averageSalary !== null && (
                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '100px' }}>
                    <strong>{selectedDepartment} 급여평균: </strong>
                    {averageSalary.toLocaleString()} 원
                </div>
            )}
        </div>
    );
};

export default EmployeeD3;

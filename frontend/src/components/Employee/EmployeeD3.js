import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import "../../styles.css";
import { FormControl, FormControlLabel, FormLabel, InputLabel, NativeSelect, Radio, RadioGroup } from '@mui/material';

const EmployeeD3 = () => {
    const [data, setData] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedOption, setSelectedOption] = useState('salary'); // 기본값 설정
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch("/data.json");
        setData(await response.json());
    };

    const handleRadioChange = (event) => {
        setSelectedDepartment(event.target.value);
        setShowSelect(true); 
    };

    const handleSelectChange = async (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        // 백엔드로 데이터를 보내는 요청
        try {
            await fetch('/api/d3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    department: selectedDepartment,
                    option: value,
                }),
            });
            console.log('Data sent to the server');
        } catch (error) {
            console.error('Error sending data to the server', error);
        }
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

            <LineChart data={data} />
        </div>
    );
};

export default EmployeeD3;

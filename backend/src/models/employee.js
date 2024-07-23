// src/models/employee.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Sequelize 인스턴스 가져오기

const Employee = sequelize.define('Employee', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hire_date: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD 형식
        allowNull: false
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employee_pw: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Employee;

// Your code here
function createEmployeeRecord(record) {
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employee;
}

function createEmployeeRecords(records) {
    const employees = [];
    records.forEach((record) => {
        employees.push(createEmployeeRecord(record));
    });
    return employees;
}

function createTimeInEvent(employee, date) {
    const timeInObject = {
        type: "TimeIn",
        hour: Number(date.substring(11)),
        date: date.substring(0, 10),
    };
    employee.timeInEvents.push(timeInObject);
    return employee;
}

function createTimeOutEvent(employee, date) {
    const timeOutObject = {
        type: "TimeOut",
        hour: Number(date.substring(11)),
        date: date.substring(0, 10),
    };
    employee.timeOutEvents.push(timeOutObject);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const possibleDates = employee.timeInEvents;
    const dateIndex = possibleDates.findIndex(
        (employeeDate) => employeeDate.date === date
    );

    const hours =
        (employee.timeOutEvents[dateIndex].hour -
            employee.timeInEvents[dateIndex].hour) /
        100;

    return hours;
}

function wagesEarnedOnDate(employee, date) {
    const dateIndex = employee.timeInEvents.findIndex(
        (dateWorked) => dateWorked.date === date
    );

    if (dateIndex === -1) {
        return;
    }
    const payOwed =
        ((employee.timeOutEvents[dateIndex].hour -
            employee.timeInEvents[dateIndex].hour) /
            100) *
        employee.payPerHour;

    return payOwed;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((acc, currDate) => {
        return (acc += wagesEarnedOnDate(employee, currDate.date));
    }, 0);
}

function calculatePayroll(records) {
    return records.reduce((total, employee) => {
        return (total += employee.timeInEvents.reduce((acc, currDate) => {
            return (acc += wagesEarnedOnDate(employee, currDate.date));
        }, 0));
    }, 0);
}

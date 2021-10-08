// Your code here
function createEmployeeRecord(src) {
    return {
        firstName: src[0],
        familyName: src[1],
        title: src[2],
        payPerHour: src[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(src){
        return createEmployeeRecord(src);
    })
}

let createTimeInEvent = function(employee, timeCard) {
    let [date, hour] = timeCard.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let createTimeOutEvent = function(employee, timeCard) {
    let [date, hour] = timeCard.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, refDate) {
    let timesClockedIn = employee.timeInEvents.find(function(e){
        return e.date === refDate
    })

    let timesClockedOut = employee.timeOutEvents.find(function(e){
        return e.date === refDate
    })

    return (timesClockedOut.hour - timesClockedIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, refDate) {
    let wage = hoursWorkedOnDate(employee, refDate) * employee.payPerHour;
    return wage
}

let allWagesFor = function(employee){
    let possibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let totalWages = possibleDates.reduce(function(l, d){
        return l + wagesEarnedOnDate(employee, d)
    }, 0)
    return totalWages
}

let calculatePayroll = function(src){
    return src.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArr, soughtName) {
    return srcArr.find(function(e){
        return e.firstName === soughtName
    })
}

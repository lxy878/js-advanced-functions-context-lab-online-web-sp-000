function createEmployeeRecord(array){
  const keys = ['firstName', 'familyName', 'title', 'payPerHour', 'timeInEvents', 'timeOutEvents'];
  const newRecord = keys.reduce((records, key, index)=>{
    records[key] = array.length > index ? array[index]:[];
    return records;
  }, {});
  return newRecord;
}


function createEmployeeRecords(array2d){
  return array2d.map(array => createEmployeeRecord(array), []);
}

function createTimeInEvent(date){
  // fix
  const timeIn = date.split(' ');
  const newObj = {
    'type': 'TimeIn',
    'hour': parseInt(timeIn[1]),
    'date': timeIn[0]
  }
  this.timeInEvents.push(newObj);
  return this;
}

function createTimeOutEvent(date){
  // fix
  const timeOut = date.split(' ');
  const newObj = {
    'type': 'TimeOut',
    'hour': parseInt(timeOut[1]),
    'date': timeOut[0]
  }
  this.timeOutEvents.push(newObj);
  return this;
}

function hoursWorkedOnDate(date){
  const iTimeIn = this.timeInEvents.findIndex(timeIn => timeIn.date === date);
  const iTimeOut = this.timeInEvents.findIndex(timeOut => timeOut.date === date);
  return  (iTimeIn>=0 && iTimeOut>=0) ? (this.timeOutEvents[iTimeOut].hour - this.timeInEvents[iTimeIn].hour)/100:0;
}

function wagesEarnedOnDate(date){
  const hours = hoursWorkedOnDate.call(this, date);
  return this.payPerHour * hours;
}

function allWagesFor(){
  const allDates = this.timeOutEvents.map(timeOut => timeOut.date, []);

  return allDates.reduce((sum, date) => sum + wagesEarnedOnDate.call(this, date), 0);
  return allDates.reduce((sum, date) => sum + wagesEarnedOnDate.call(this, date) , 0)
}

function findEmployeeByFirstName(records, firstName){
  return records.find(record => record.firstName === firstName);
}

function calculatePayroll(records){
  return records.reduce((sum, record) => sum+allWagesFor.call(record),0);

function calculatePayroll(){
  return records.reduce((sum, this) => sum+allWagesFor.call(this),0);
}


// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })
//
//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
//
//     return payable
// }

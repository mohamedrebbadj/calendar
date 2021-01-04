function Calendar() {
  // Months full names
  this.monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Day of week full names
  this.dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // get dates container
  this.$ = function (selector) {
    let elements = document.querySelectorAll(selector);
    return elements.length > 1 ? elements : elements[0];
  };
  // initilazing of calendar
  this.init = function () {
    this.setDate();
    this.current();
    let $this = this;
    let updateCalendarHead = setInterval(function () {
      // update current time and current full date
      $this.update();
    }, 1000);
  };
  // set the calendar current time and current full date
  this.current = function () {
    // create current date
    let current = new Date();
    // display current time
    this.displayTime(
      current.getHours(),
      current.getMinutes(),
      current.getSeconds()
    );
    // dispay current full date
    this.displayFullDate(
      current.getFullYear(),
      this.monthNames[current.getMonth()],
      current.getDate(),
      this.dayNames[current.getDay()]
    );
    return current;
  };
  this.Date = new Date();
  this.dateContainers = this.$(".calendar__day");
  this.setDate = function () {
    this.date = this.Date.getDate();
    this.fullYear = this.Date.getFullYear();
    this.month = this.Date.getMonth();
    this.lastDateOfMonth = new Date(this.fullYear, this.month + 1, 0).getDate();
    this.lastDateOfLastMonth = new Date(this.fullYear, this.month, 0).getDate();
    this.firstDayOfMonth = new Date(this.fullYear, this.month, 1).getDay();
    this.availableDates = [];
    let counter = -(this.firstDayOfMonth - 1);
    for (let i = 0; i < this.dateContainers.length; i++) {
      if (counter > this.lastDateOfMonth) {counter = 1}
      if (i < this.firstDayOfMonth) {
        this.availableDates.push({statusClass: "--inactive", value: this.lastDateOfLastMonth + counter});
      } else if ((this.firstDayOfMonth) <= i && i < (this.lastDateOfMonth + this.firstDayOfMonth)) {
        if (counter == this.date && this.month == this.current().getMonth() && this.fullYear == this.current().getFullYear()) {
          this.availableDates.push({statusClass: "--active", value: counter});
        } else {
          this.availableDates.push({statusClass: "", value: counter});
        }
      } else {
        this.availableDates.push({statusClass: "--inactive", value: counter});
      }
      counter++;
    }
    this.display(".calendar__current-year", this.fullYear, "calendar__current-year");
    this.display(".calendar__current-month", this.monthNames[this.month], "calendar__current-month");
    this.displayDates();
  };

  this.display = function (container, data, identifier, className = "") {
    if (typeof container == "string") {container = this.$(container);}
    if (container && !(container instanceof NodeList)) {
      container.innerHTML = data;
      console.log(className);
      container.className = identifier + className;
    }
  };

  this.displayTime = function (hours, minutes, seconds) {
    this.display(".time__hours", this.formatTime(hours), "time_hours");
    this.display(".time__minutes", this.formatTime(minutes), "time_minutes");
    this.display(".time__seconds", this.formatTime(seconds), "time_seconds");
  };

  this.displayFullDate = function (year, monthName, date, dayName) {
    this.display(".date__day", dayName, "date__day");
    this.display(".date__month", monthName, "date__month");
    this.display(".date__date", date, "date__date");
    this.display(".date__year", year, "date__year");
  };

  this.displayDates = function () {

    for (let i = 0; i < this.dateContainers.length; i++) {
      this.display(this.dateContainers[i], this.availableDates[i].value, "calendar__day", this.availableDates[i].statusClass);
    }
  };

  this.formatTime = function (time) {
    return time < 10 ? "0" + time : time;
  };

  this.update = function () {
    this.current();
  };

  this.next = function () {
    this.Date.setMonth(this.month + 1);
    this.setDate();
  }
  this.prev = function () {
    this.Date.setMonth(this.month - 1);
    this.setDate();
  }
}
let calendar = new Calendar();
calendar.init();
document.querySelector(".calendar__left").addEventListener("click", function () {
  calendar.next();
});
document.querySelector(".calendar__right").addEventListener("click", function () {
  calendar.prev();
});

import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { UserService } from 'src/app/shared/user.service';
import { DoctorService } from 'src/app/shared/doctor.service';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { forkJoin, zip, combineLatest, Subject, Observable } from 'rxjs';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  appointmentStat: any = {};
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any = [];
  public myChartData;
  weekChartData: any = {};
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  doctors: any = [];
  users: any = [];
  appointments: any = [];
  chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  monthsLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  daysLabels = ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday']
  weeksInCurrentMonth: number;
  weeklabels: any = [];

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    // this.getDoctors();
    // this.getUsers();
    // this.getAppointments();
    this.setWeeks()
    this.getDashData(this.getDoctors(), this.getUsers(), this.getAppointments())

  }
  setWeeks() {
    this.weeksInCurrentMonth = weeksInMonth(new Date());
    for (let i = 0; i < this.weeksInCurrentMonth; i++) {
      this.weeklabels.push(`Week ${i + 1}`)
      this.weekChartData[i + 1] = 0;
    }
  }
  getDashData(doctors$, users$, appointments$) {
    zip(doctors$, users$, appointments$).subscribe(([doctors, users, appointments]) => {
      this.doctors = doctors,
        this.users = users,
        this.appointments = appointments
      // console.log(this.doctors)
      // console.log(this.users)
      // console.log(this.appointments)
      this.groupAppointmentsByMonths()
    })
  }
  getWeekOfMonth(date) {
    date = new Date(date)
    const adjustedDate = date.getDate() + date.getDay();
    const prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
  }
  groupAppointmentsByMonths() {
    const data = [];
    this.appointments.forEach(appointment => {
      if (appointment.appointmentDay) {
        const month = new Date(appointment.appointmentDay).getMonth()
        // console.log(month)
        const year = new Date(appointment.appointmentDay).getFullYear().toString()
        if (new Date().getFullYear().toString() == year && new Date().getMonth() == month) {
          const weekNo = this.getWeekOfMonth(appointment.appointmentDay);
          console.log('weekNo', weekNo)
          this.weekChartData[weekNo] ? this.weekChartData[weekNo] += 1 : this.weekChartData[weekNo] = 1;
        }
        data.push({
          year: year,
          month: month,
        })

      }
    });
    const years = Array.from(new Set(data.map(data => data.year)))
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    years.forEach(year => {
      // console.log('d', year)
      this.appointmentStat[year] = {}
      months.forEach(month => {
        // console.log('d', month)

        this.appointmentStat[year][month] = null
        data.forEach(appointment => {
          if (appointment.year == year && appointment.month == month) {
            this.appointmentStat[year][month] == '' ? this.appointmentStat[year][month] = 1 : this.appointmentStat[year][month] += 1
          }
        })
      })
    })


    this.showPerformanceChart();


  }
  getDoctors(): Observable<any> {
    return this.doctorService.getDoctors()
  }
  getUsers(): Observable<any> {
    return this.userService.getUsers()
  }
  getAppointments(): Observable<any> {
    return this.appointmentService.getAppointments()
  }
  public updateOptions(filter) {
    this.chart_labels = []
    switch (filter) {
      case 0:
        this.myChartData.data.datasets[0].data = this.data;
        this.myChartData.data.labels = this.monthsLabels
        break;
      case 1:

        this.myChartData.data.datasets[0].data = this.datasets[1];
        this.myChartData.data.labels = this.weeklabels
        break;
    }


    // this.myChartData.data.datasets[0].data = this.data;
    // this.myChartData.data.labels = this.chart_labels

    // console.log('this.myChartData', this.myChartData)
    this.myChartData.update();
  }

  showPerformanceChart() {
    const gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };


    this.datasets = [
      [],
      [],
    ];
    for (const [key, value] of Object.entries(this.weekChartData)) {
      this.datasets[1].push(value)
    }
    for (const [key, value] of Object.entries(this.appointmentStat[new Date().getFullYear().toString()])) {
      this.data.push(value)
    }
    this.datasets[0] = this.data
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var config = {
      type: 'line',
      data: {
        labels: this.chart_labels,
        datasets: [{
          label: "Appointments Booked",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);
  }

}
function weeksInMonth(d) {
  var firstDay = new Date(new Date(d).getFullYear(), new Date(d).getMonth(), 1).getDay();
  return Math.ceil((d.getDate() + (firstDay - 1)) / 7);
}

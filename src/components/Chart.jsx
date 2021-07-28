import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'

function Chart(props) {
    const [state, setState] = useState({
        labels: [],
        datasets: [],
        options: {}
    })

    useEffect(() => {
        const temps = props.list.map(temp => { return temp.main.temp })
        const labels = props.list.map(td => {
            var datetime = new Date(td.dt * 1000);
            var time = datetime.getHours();
            // var date = datetime.toLocaleString('default', { day: 'numeric', month: 'short' });
            return time 
            })

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Temprature',
                data: temps,
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHitRadius: 10,
            }],
            options: {
                responsive : true,
                maintainAspectRatio: false,
                scales: {
                     xAxes: [{
                        gridLines: {
                           display: false
                        }
                     }],
                     yAxes: [{
                        gridLines: {
                           display: false
                        }
                     }]
                }
             }
        }

        setState(chartData)

        console.log(temps);
        console.log(labels);

    }, [props.list])


    return  <Line data={state} />

}


export default Chart
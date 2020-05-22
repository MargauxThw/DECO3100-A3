Plotly.d3.csv("data/host_medals_every_year.csv", displayVis);

function displayVis(originalData) {
    hosts = ['Greece', 'France', 'USA', 'Greece', 'UK', 'Sweden', 'Belgium', 'France', 'Netherlands', 'USA', 'Germany', 'UK', 'Finland', 'Australia', 'Italy', 'Japan', 'Mexico', 'Germany', 'Canada', 'Russia', 'USA', 'South Korea', 'Spain', 'USA', 'Australia', 'Greece', 'China', 'UK', 'Brazil']
    hosts_ind = [8, 6, 18, 8, 17, 16, 1, 6, 12, 18, 7, 17, 5, 0, 9, 10, 11, 7, 3, 13, 18, 14, 15, 18, 0, 8, 4, 17, 2];
    games = ["Athina", "Paris", "St. Louis", "Athina", "London", "Stockholm", "Antwerpen", "Paris", "Amsterdam", "Los Angeles", "Berlin", "London", "Helsinki", "Melbourne", "Roma", "Tokyo", "Mexico City", "Munich", "Montreal", "Moskva", "Los Angeles", "Seoul", "Barcelona", "Atlanta", "Sydney", "Athina", "Beijing", "London", "Rio de Janeiro"];
    years = ["1896", "1900", "1904", "1906", "1908", "1912", "1920", "1924", "1928", "1932", "1936", "1948", "1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
    gamesYears = ["Athina, 1896", "Paris, 1900", "St. Louis, 1904", "Athina, 1906", "London, 1908", "Stockholm, 1912", "Antwerpen, 1920", "Paris, 1924", "Amsterdam, 1928", "Los Angeles, 1932", "Berlin, 1936", "London, 1948", "Helsinki, 1952", "Melbourne, 1956", "Roma, 1960", "Tokyo, 1964", "Mexico City, 1968", "Munich, 1972", "Montreal, 1976", "Moskva, 1980", "Los Angeles, 1984", "Seoul, 1988", "Barcelona, 1992", "Atlanta, 1996", "Sydney, 2000", "Athina, 2004", "Beijing, 2008", "London, 2012", "Rio de Janeiro, 2016"];
    host_labels = ["Host nation: Greece", "Host nation: France", "Host nation: USA", "Host nation: Greece", "Host nation: UK", "Host nation: Sweden", "Host nation: Belgium", "Host nation: France", "Host nation: Netherlands", "Host nation: USA", "Host nation: Germany", "Host nation: UK", "Host nation: Finland", "Host nation: Australia", "Host nation: Italy", "Host nation: Japan", "Host nation: Mexico", "Host nation: Germany", "Host nation: Canada", "Host nation: Russia", "Host nation: USA", "Host nation: South Korea", "Host nation: Spain", "Host nation: USA", "Host nation: Australia", "Host nation: Greece", "Host nation: China", "Host nation: UK", "Host nation: Brazil"];

    // gamesYears = [];
    // for (i = 1; i < sYears.length; i++) {
    //     tick = games[i] + ", " + sYears[i];
    //     gamesYears.push(tick);
    // }

    // host_labels = [];
    // for (i = 0; i < hosts.length; i++) {
    //     tick = "Host nation: " + hosts[i];
    //     host_labels.push(tick);
    // }


    // host_ind = [];
    // for (i = 0; i < hosts.length; i++) {
    //     for (j = 0; j < originalData.length; j++) {
    //         if (originalData[j].Region == hosts[i]) {
    //             host_ind[i] = j;

    //         }
    //     }
    // }


    function setPlot() {

        csvData = originalData;

        // csvData.sort((a, b) => a[index] - b[index]);
        // console.log(csvData);


        values = [];
        max_val = 0;

        // Default - host nation medal tally each year
        for (i = 0; i < hosts.length; i++) {
            new_val = csvData[hosts_ind[i]][years[i]];
            if (+new_val > max_val) {
                max_val = +new_val;
            }

            values.push(new_val)
        }

        trace = {
            x: gamesYears,
            y: values,
            text: host_labels,
            showscale: true,
            type: "bar",
        }

        data = [trace];
        layout = {
            height: 1000,
            xaxis: {
                ticks: "outside",
                tickangle: -45,
                automargin: true,
            },
            yaxis: {
                range: [0, max_val + 50 - (+max_val % 50)],
            },
        };

        Plotly.newPlot("datavis", data, layout);

    }

    myPlot = document.getElementById("datavis"), setPlot();

    // document.getElementById("female").addEventListener("click", function () {
    //     setPlot(n, "F");
    //     console.log(n);
    // });

    // document.getElementById("male").addEventListener("click", function () {
    //     setPlot(n, "M");
    //     console.log(n);
    // });

    // document.getElementById("number").addEventListener("keydown", function (e) {
    //     if (e.keyCode == 13) {
    //         setPlot(this.value, sex);
    //     }
    // });

    // setPlot();

    myPlot.on('plotly_click', function (data) {
        var pts = '';
        for (var i = 0; i < data.points.length; i++) {
            pts = 'x = ' + data.points[i].x;
        }
        console.log('Closest point clicked:\n\n', pts);
    });


}
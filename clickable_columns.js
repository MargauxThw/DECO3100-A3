Plotly.d3.csv("data/host_medals_every_year.csv", displayVis);


function displayVis(originalData) {
    hosts = ['Greece', 'France', 'USA', 'Greece', 'UK', 'Sweden', 'Belgium', 'France', 'Netherlands', 'USA', 'Germany', 'UK', 'Finland', 'Australia', 'Italy', 'Japan', 'Mexico', 'Germany', 'Canada', 'Russia', 'USA', 'South Korea', 'Spain', 'USA', 'Australia', 'Greece', 'China', 'UK', 'Brazil']
    hosts_ind = [8, 6, 18, 8, 17, 16, 1, 6, 12, 18, 7, 17, 5, 0, 9, 10, 11, 7, 3, 13, 18, 14, 15, 18, 0, 8, 4, 17, 2];
    games = ["Athina", "Paris", "St. Louis", "Athina", "London", "Stockholm", "Antwerpen", "Paris", "Amsterdam", "Los Angeles", "Berlin", "London", "Helsinki", "Melbourne", "Roma", "Tokyo", "Mexico City", "Munich", "Montreal", "Moskva", "Los Angeles", "Seoul", "Barcelona", "Atlanta", "Sydney", "Athina", "Beijing", "London", "Rio de Janeiro"];
    years = ["1896", "1900", "1904", "1906", "1908", "1912", "1920", "1924", "1928", "1932", "1936", "1948", "1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
    gamesYears = ["Athina, 1896", "Paris, 1900", "St. Louis, 1904", "Athina, 1906", "London, 1908", "Stockholm, 1912", "Antwerpen, 1920", "Paris, 1924", "Amsterdam, 1928", "Los Angeles, 1932", "Berlin, 1936", "London, 1948", "Helsinki, 1952", "Melbourne, 1956", "Roma, 1960", "Tokyo, 1964", "Mexico City, 1968", "Munich, 1972", "Montreal, 1976", "Moskva, 1980", "Los Angeles, 1984", "Seoul, 1988", "Barcelona, 1992", "Atlanta, 1996", "Sydney, 2000", "Athina, 2004", "Beijing, 2008", "London, 2012", "Rio de Janeiro, 2016"];
    host_labels = ["Host nation: Greece", "Host nation: France", "Host nation: USA", "Host nation: Greece", "Host nation: UK", "Host nation: Sweden", "Host nation: Belgium", "Host nation: France", "Host nation: Netherlands", "Host nation: USA", "Host nation: Germany", "Host nation: UK", "Host nation: Finland", "Host nation: Australia", "Host nation: Italy", "Host nation: Japan", "Host nation: Mexico", "Host nation: Germany", "Host nation: Canada", "Host nation: Russia", "Host nation: USA", "Host nation: South Korea", "Host nation: Spain", "Host nation: USA", "Host nation: Australia", "Host nation: Greece", "Host nation: China", "Host nation: UK", "Host nation: Brazil"];
    sport_append = ["", ",Swimming", ",Wrestling", ",Gymnastics", ",Weightlifting", ",Sailing", ",Diving", ",Archery", ",Rowing", ",Cycling", ",Athletics"]
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

    state = 0;
    host = null;
    sport = 0;
    comp = 1;


    function setPlot(this_state, this_host, this_sport, this_comp) {

        state = this_state;
        host = this_host;
        sport = this_sport;
        comp = this_comp;

        csvData = originalData;

        if (sport == 0) {
            sport_name = "All events"
        } else {
            sport_name = sport_append[sport].substr(1)
        }


        values = [];
        comp_values = [];
        colours = [];
        max_val = 0;

        if (state == 0) {
            host_name = "All hosts"
            // Default - host nation medal tally each year
            for (i = 0; i < hosts.length; i++) {
                new_val = csvData[hosts_ind[i]][years[i] + sport_append[sport]];
                new_comp = csvData[19][years[i] + sport_append[sport]];
                if (+new_val > max_val) {
                    max_val = +new_val;
                }

                values.push(new_val)
                comp_values.push(new_comp)
                colours.push('rgba(222,45,38,0.8)');
            }

        } else if (state == 1) {
            host_name = csvData[host].Region
            // Level 1 - isolated host
            for (i = 0; i < games.length; i++) {
                new_val = csvData[host][years[i] + sport_append[sport]];
                new_comp = csvData[19][years[i] + sport_append[sport]];
                // console.log(new_val)
                if (+new_val > max_val) {
                    max_val = +new_val;
                }

                values.push(new_val)
                comp_values.push(new_comp)

                if (host == hosts_ind[i]) {
                    colours.push("rgba(222,45,38,0.8)")
                } else {
                    colours.push("rgba(204,204,204,1)");
                }
            }
        }

        if (sport != 0) {
            // max_cap =  max_val + 50 - (+max_val % 50);
            max_cap = 80;
        } else {
            max_cap = 450;
        }

        console.log(values)

        main_trace = {
            x: gamesYears,
            y: values,
            text: host_labels,
            type: "bar",
            marker:{
                // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                // color: 'rgba(204,204,204,1)',
                // color: 'rgba(222,45,38,0.8)',
                color: colours,
            },
        }

        comp_trace = {
            x: gamesYears,
            y: comp_values,
            text: host_labels,
            type: "bar",
            marker:{
                // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                // color: 'rgba(204,204,204,1)',
                // color: 'rgba(222,45,38,0.8)',
                // color: colours,
                color: "black",
            },
        }

        if (comp == 1) {
            if (sport != 0) {
                max_cap = 220;
            } else {
                max_cap = 1500;
            }
            data = [main_trace, comp_trace];
        } else {
            data = [main_trace];
        }

        
        layout = {
            title: `Medal tally: ${host_name}, ${sport_name}`,
            showlegend: false,
            height: 1000,
            xaxis: {
                ticks: "outside",
                tickangle: -45,
                automargin: true,
            },
            yaxis: {
                // range: [0, max_val + 50 - (+max_val % 50)],
                range: [0, max_cap],
            },
        };

        Plotly.newPlot("datavis", data, layout);

    }

    setPlot(state, host, sport, comp);

    /* TOGGLE COMPARISON TRACE */

    document.getElementById("toggle-comp").addEventListener("click", function () {
        if (comp == 0) {
            setPlot(state, host, sport, 1);
        } else {
            setPlot(state, host, sport, 0);
        }
    });

    /* REGION BUTTONS */

    document.getElementById("All-hosts").addEventListener("click", function () {
        setPlot(0, 0, sport, comp);
    });

    document.getElementById("Australia").addEventListener("click", function () {
        setPlot(1, 0, sport, comp);
    });

    document.getElementById("Belgium").addEventListener("click", function () {
        setPlot(1, 1, sport, comp);
    });

    document.getElementById("Brazil").addEventListener("click", function () {
        setPlot(1, 2, sport, comp);
    });

    document.getElementById("Canada").addEventListener("click", function () {
        setPlot(1, 3, sport, comp);
    });

    document.getElementById("China").addEventListener("click", function () {
        setPlot(1, 4, sport, comp);
    });

    document.getElementById("Finland").addEventListener("click", function () {
        setPlot(1, 5, sport, comp);
    });

    document.getElementById("France").addEventListener("click", function () {
        setPlot(1, 6, sport, comp);
    });

    document.getElementById("Germany").addEventListener("click", function () {
        setPlot(1, 7, sport, comp);
    });

    document.getElementById("Greece").addEventListener("click", function () {
        setPlot(1, 8, sport, comp);
    });

    document.getElementById("Italy").addEventListener("click", function () {
        setPlot(1, 9, sport, comp);
    });

    document.getElementById("Japan").addEventListener("click", function () {
        setPlot(1, 10, sport, comp);
    });

    document.getElementById("Mexico").addEventListener("click", function () {
        setPlot(1, 11, sport, comp);
    });

    document.getElementById("Netherlands").addEventListener("click", function () {
        setPlot(1, 12, sport, comp);
    });

    document.getElementById("Russia").addEventListener("click", function () {
        setPlot(1, 13, sport, comp);
    });

    document.getElementById("South Korea").addEventListener("click", function () {
        setPlot(1, 14, sport, comp);
    });

    document.getElementById("Spain").addEventListener("click", function () {
        setPlot(1, 15, sport, comp);
    });

    document.getElementById("Sweden").addEventListener("click", function () {
        setPlot(1, 16, sport, comp);
    });

    document.getElementById("UK").addEventListener("click", function () {
        setPlot(1, 17, sport, comp);
    });

    document.getElementById("USA").addEventListener("click", function () {
        setPlot(1, 18, sport, comp);
    });

    /* EVENT CATEGORY BUTTONS */

    document.getElementById("All-sports").addEventListener("click", function () {
        setPlot(state, host, 0, comp);
    });

    document.getElementById("Swimming").addEventListener("click", function () {
        setPlot(state, host, 1, comp);
    });

    document.getElementById("Wrestling").addEventListener("click", function () {
        setPlot(state, host, 2, comp);
    });

    document.getElementById("Gymnastics").addEventListener("click", function () {
        setPlot(state, host, 3, comp);
    });

    document.getElementById("Weightlifting").addEventListener("click", function () {
        setPlot(state, host, 4, comp);
    });

    document.getElementById("Sailing").addEventListener("click", function () {
        setPlot(state, host, 5, comp);
    });

    document.getElementById("Diving").addEventListener("click", function () {
        setPlot(state, host, 6, comp);
    });
    
    document.getElementById("Archery").addEventListener("click", function () {
        setPlot(state, host, 7, comp);
    });

    document.getElementById("Rowing").addEventListener("click", function () {
        setPlot(state, host, 8, comp);
    });

    document.getElementById("Cycling").addEventListener("click", function () {
        setPlot(state, host, 9, comp);
    });
    
    document.getElementById("Athletics").addEventListener("click", function () {
        setPlot(state, host, 10, comp);
    });


    // document.getElementById("number").addEventListener("keydown", function (e) {
    //     if (e.keyCode == 13) {
    //         setPlot(this.value, sex);
    //     }
    // });

    // setPlot();
    // var data_update = {
    //     y: [Math.round(Math.random() * 290), Math.round(Math.random() * 29), Math.round(Math.random() * 290)],
    // }

    // myPlot.on('plotly_click', function (data) {
    //     console.log("WORKING...");

    //     new_host = host;

    //     for (var i = 0; i < data.points.length; i++) {
    //         new_host = hosts_ind[data.points[i].pointIndex];
    //     }

    //     if (new_host != host) {
    //         console.log("SUCCESS");
    //         // Plotly.relayout(myPlot, {

    //         // })
    //         setPlot(1, new_host);
    //     }
        

    //     // setPlot(1, Math.round(Math.random() * 29));
    //     Plotly.update(myPlot);

    //     console.log("SUCCESS");

    // });

    // function testFunction(num) {
    //     new_host = host;

    //     for (var i = 0; i < data.points.length; i++) {
    //         new_host = hosts_ind[data.points[i].pointIndex];
    //     }

    //     if (new_host != host) {
    //         console.log("SUCCESS");
    //         setPlot(1, new_host);
    //     }
        

    //     // setPlot(1, Math.round(Math.random() * 29));
    // }


}
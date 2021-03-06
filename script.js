Plotly.d3.csv("yearly_medals.csv", displayVis);

function displayVis(csvData) {
    hosts = ['Greece', 'France', 'USA', 'Greece', 'UK', 'Sweden', 'Belgium', 'France', 'Netherlands', 'USA', 'Germany', 'UK', 'Finland', 'Australia', 'Italy', 'Japan', 'Mexico', 'Germany', 'Canada', 'Russia', 'USA', 'South Korea', 'Spain', 'USA', 'Australia', 'Greece', 'China', 'UK', 'Brazil'];
    hosts_ind = [8, 6, 18, 8, 17, 16, 1, 6, 12, 18, 7, 17, 5, 0, 9, 10, 11, 7, 3, 13, 18, 14, 15, 18, 0, 8, 4, 17, 2];
    years = ["1896", "1900", "1904", "1906", "1908", "1912", "1920", "1924", "1928", "1932", "1936", "1948", "1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
    gamesYears = ["Athina, 1896", "Paris, 1900", "St. Louis, 1904", "Athina, 1906", "London, 1908", "Stockholm, 1912", "Antwerpen, 1920", "Paris, 1924", "Amsterdam, 1928", "Los Angeles, 1932", "Berlin, 1936", "London, 1948", "Helsinki, 1952", "Melbourne, 1956", "Roma, 1960", "Tokyo, 1964", "Mexico City, 1968", "Munich, 1972", "Montreal, 1976", "Moskva, 1980", "Los Angeles, 1984", "Seoul, 1988", "Barcelona, 1992", "Atlanta, 1996", "Sydney, 2000", "Athina, 2004", "Beijing, 2008", "London, 2012", "Rio de Janeiro, 2016"];
    host_labels = ["Host nation: Greece", "Host nation: France", "Host nation: USA", "Host nation: Greece", "Host nation: UK", "Host nation: Sweden", "Host nation: Belgium", "Host nation: France", "Host nation: Netherlands", "Host nation: USA", "Host nation: Germany", "Host nation: UK", "Host nation: Finland", "Host nation: Australia", "Host nation: Italy", "Host nation: Japan", "Host nation: Mexico", "Host nation: Germany", "Host nation: Canada", "Host nation: Russia", "Host nation: USA", "Host nation: South Korea", "Host nation: Spain", "Host nation: USA", "Host nation: Australia", "Host nation: Greece", "Host nation: China", "Host nation: UK", "Host nation: Brazil"];
    regions = ["Individual Olympic Athletes", "Africa", "Asia", "Eastern Europe", "Middle East", "North America", "Northern Europe", "Oceania", "South America", "Western Europe"];
    host_regions = [9, 9, 5, 9, 9, 6, 9, 9, 9, 5, 9, 9, 6, 7, 9, 2, 5, 9, 5, 3, 5, 2, 9, 5, 7, 9, 2, 9, 8];

    function setPlot(this_mode, this_state, this_host, this_game) {
        // Initialise parameter values
        mode = this_mode;
        state = this_state;
        host = this_host;
        game = this_game;

        // Initialise arrays for axes values & bar colours
        y_values = [];
        x_values = [];
        colours = [];
        upper_y_bound = 0;

        // Adjust x axes label
        if (state == 2) {
            text_labels = [];
            if (mode == 0) {
                x_title = "Top 10 medal winning nations this year"
            } else {
                x_title = "Regions"
            }
        } else {
            text_labels = host_labels;
            x_title = "Olympic Games (host city, year)"
        }

        // Level 1: Overall host graph
        if (state == 0) {
            x_values = gamesYears;
            if (mode == 0) { // By country
                upper_y_bound = 450;
                for (i = 0; i < hosts.length; i++) {
                    y_values.push(csvData[hosts_ind[i]][years[i]]);
                    colours.push('#EE334E');
                }
            } else { // By region
                upper_y_bound = 820;
                for (i = 0; i < hosts.length; i++) {
                    y_values.push(csvData[20 + host_regions[i]][years[i]]);
                    colours.push('#EE334E');
                }
            }
        }

        // Level 2: Yearly split of isolated host nation/region
        if (state == 1) {
            x_values = gamesYears;
            if (mode == 0) { // By country
                upper_y_bound = 450;
                for (i = 0; i < years.length; i++) {    
                    y_values.push(csvData[host][years[i]]);
    
                    if (host == hosts_ind[i]) {
                        colours.push("#EE334E");
                    } else {
                        colours.push("rgba(204,204,204,1)");
                    }
                }
            } else { // By region
                upper_y_bound = 820;
                for (i = 0; i < years.length; i++) {   
                    y_values.push(csvData[20 + host][years[i]]);

                    if (host == host_regions[i]) {
                        colours.push("#EE334E");
                    } else {
                        colours.push("rgba(204,204,204,1)");
                    }
                }
            }

        }

        // Level 3: Focus on one games - showing each region/top country's performance
        if (state == 2) {
            if (mode == 0) { // By country
                upper_y_bound = 450;

                // Get top 10 medal winning countries
                participating = csvData.slice(30);
                participating.sort((b, a) => a[years[game]] - b[years[game]]);
                participating = participating.slice(0, 10);

                x_values = participating.map((row) => row.Region);
                y_values = participating.map((row) => row[years[game]]);

                for (i = 0; i < participating.length; i++) {
                    if (participating[i].Region === hosts[game]) {
                        colours.push('#EE334E');
                    } else {
                        colours.push('rgb(204,204,204)');
                    }
                }


            } else { // By region
                x_values = regions;
                upper_y_bound = 820;
                for (i = 0; i < regions.length; i++) {
                    y_values.push(csvData[20 + i][years[game]]);

                    if (i == host_regions[game]) {
                        colours.push('#EE334E');
                    } else {
                        colours.push('rgb(204,204,204)');
                    }
                }
            }
        }

        trace = {
            name: "",
            x: x_values,
            y: y_values,
            text: text_labels,
            type: "bar",
            marker: {
                color: colours,
            },
        }

        data = [trace];

        layout = {
            showlegend: false,
            hovermode: "closest",
            font: {
                family: 'Cabin',
                size: 16,
            },
            hoverlabel: {
                font: {
                    family: 'Cabin',
                    size: 14,
                },
            },
            height: 800,
            xaxis: {
                title: {
                    text: x_title,
                    standoff: 30,
                },
                showgrid: false,
                ticks: "outside",
                tickangle: -45,
                automargin: true,
                
            },
            yaxis: {
                title: {
                    text: "Total medals won",
                    standoff: 30,
                },
                showgrid: false,
                range: [0, upper_y_bound],
            },
        };

        Plotly.newPlot("datavis", data, layout);
        checkTitle();
    }

    setPlot(0, 0, 0, 0);

    function checkTitle() {
        if (state == 0) {
            // Only show title-1
            document.getElementById("title-1").style.display = "block";
            document.getElementById("title-2-nation").style.display = "none";
            document.getElementById("title-2-region").style.display = "none";
            document.getElementById("title-3").style.display = "none";

            // Only show appropriate fill-1
            if (mode == 0) {
                document.getElementById("fill-1-nation").style.display = "inline";
                document.getElementById("fill-1-region").style.display = "none";
            } else {
                document.getElementById("fill-1-nation").style.display = "none";
                document.getElementById("fill-1-region").style.display = "inline";
            }

        }

        if (state == 1) {
            // Only show appropriate title-2
            document.getElementById("title-1").style.display = "none";
            document.getElementById("title-3").style.display = "none";

            // Only show appropriate fill-2
            if (mode == 0) {
                document.getElementById("title-2-nation").style.display = "block";
                document.getElementById("title-2-region").style.display = "none";
            } else {
                document.getElementById("title-2-nation").style.display = "none";
                document.getElementById("title-2-region").style.display = "block";
            }
        }

        if (state == 2) {
            // Only show title-3
            document.getElementById("title-1").style.display = "none";
            document.getElementById("title-2-nation").style.display = "none";
            document.getElementById("title-2-region").style.display = "none";
            document.getElementById("title-3").style.display = "block";

            // Only show appropriate fill-3
            if (mode == 0) {
                document.getElementById("fill-3-nation").style.display = "inline";
                document.getElementById("fill-3-region").style.display = "none";
            } else {
                document.getElementById("fill-3-nation").style.display = "none";
                document.getElementById("fill-3-region").style.display = "inline";
            }
        }
    }

    /* FILTERS */

    document.getElementById("nations").addEventListener("click", function () {
        host = parseInt(document.getElementById("nations-select").value);
        setPlot(0, state, host, game);
    });

    document.getElementById("regions").addEventListener("click", function () {
        host = parseInt(document.getElementById("regions-select").value);
        setPlot(1, state, host, game);
    });

    document.getElementById("overall").addEventListener("click", function () {
        setPlot(mode, 0, host, game);
    });

    document.getElementById("by_host").addEventListener("click", function () {
        setPlot(mode, 1, host, game);
    });

    document.getElementById("by_games").addEventListener("click", function () {
        setPlot(mode, 2, host, game);
    });

    /* DROPDOWNS */

    document.getElementById("nations-select").addEventListener("change", function () {
        setPlot(mode, state, parseInt(document.getElementById("nations-select").value), game);
    });

    document.getElementById("regions-select").addEventListener("change", function () {
        setPlot(mode, state, parseInt(document.getElementById("regions-select").value), game);
    });

    document.getElementById("games-select").addEventListener("change", function () {
        setPlot(mode, state, host, parseInt(document.getElementById("games-select").value));
    });

}
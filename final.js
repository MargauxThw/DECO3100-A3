Plotly.d3.csv("data/host_medals_every_year.csv", displayVis);

function displayVis(originalData) {
    hosts = ['Greece', 'France', 'USA', 'Greece', 'UK', 'Sweden', 'Belgium', 'France', 'Netherlands', 'USA', 'Germany', 'UK', 'Finland', 'Australia', 'Italy', 'Japan', 'Mexico', 'Germany', 'Canada', 'Russia', 'USA', 'South Korea', 'Spain', 'USA', 'Australia', 'Greece', 'China', 'UK', 'Brazil']
    hosts_ind = [8, 6, 18, 8, 17, 16, 1, 6, 12, 18, 7, 17, 5, 0, 9, 10, 11, 7, 3, 13, 18, 14, 15, 18, 0, 8, 4, 17, 2];
    years = ["1896", "1900", "1904", "1906", "1908", "1912", "1920", "1924", "1928", "1932", "1936", "1948", "1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016"];
    gamesYears = ["Athina, 1896", "Paris, 1900", "St. Louis, 1904", "Athina, 1906", "London, 1908", "Stockholm, 1912", "Antwerpen, 1920", "Paris, 1924", "Amsterdam, 1928", "Los Angeles, 1932", "Berlin, 1936", "London, 1948", "Helsinki, 1952", "Melbourne, 1956", "Roma, 1960", "Tokyo, 1964", "Mexico City, 1968", "Munich, 1972", "Montreal, 1976", "Moskva, 1980", "Los Angeles, 1984", "Seoul, 1988", "Barcelona, 1992", "Atlanta, 1996", "Sydney, 2000", "Athina, 2004", "Beijing, 2008", "London, 2012", "Rio de Janeiro, 2016"];
    host_labels = ["Host nation: Greece", "Host nation: France", "Host nation: USA", "Host nation: Greece", "Host nation: UK", "Host nation: Sweden", "Host nation: Belgium", "Host nation: France", "Host nation: Netherlands", "Host nation: USA", "Host nation: Germany", "Host nation: UK", "Host nation: Finland", "Host nation: Australia", "Host nation: Italy", "Host nation: Japan", "Host nation: Mexico", "Host nation: Germany", "Host nation: Canada", "Host nation: Russia", "Host nation: USA", "Host nation: South Korea", "Host nation: Spain", "Host nation: USA", "Host nation: Australia", "Host nation: Greece", "Host nation: China", "Host nation: UK", "Host nation: Brazil"];
    regions = ["Individual Olympic Athletes", "Africa", "Asia", "Eastern Europe", "Middle East", "North America", "Northern Europe", "Oceania", "South America", "Western Europe"]
    host_regions = [9, 9, 5, 9, 9, 6, 9, 9, 9, 5, 9, 9, 6, 7, 9, 2, 5, 9, 5, 3, 5, 2, 9, 5, 7, 9, 2, 9, 8]


    function setPlot(this_mode, this_host, this_game) {
        mode = this_mode;

        csvData = originalData;

        if (mode == 0) {

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

            main_trace = {
                name: "",
                x: gamesYears,
                y: values,
                text: host_labels,
                type: "bar",
                marker: {
                    // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                    // color: 'rgba(204,204,204,1)',
                    // color: 'rgba(222,45,38,0.8)',
                    color: colours,
                },
            }

            comp_trace = {
                name: "",
                x: gamesYears,
                y: comp_values,
                text: "Total medals on offer",
                type: "bar",
                marker: {
                    color: "black",
                },
            }

            if (comp == 1) {
                if (sport != 0) {
                    max_cap = 220;
                } else {
                    max_cap = 2050;
                }
                data = [main_trace, comp_trace];
            } else {
                data = [main_trace];
            }


            layout = {
                title: `Medal tally: ${host_name}, ${sport_name}`,
                showlegend: false,
                hovermode: "closest",
                hoverlabel: {
                    bordercolor: "white",
                },
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

        } else {
            values = [];
            colours = [];

            for (i = 0; i < regions.length; i++) {
                new_val = csvData[20 + i][years[year]];
                values.push(new_val);
                // console.log(host_region)
                if (i == host_regions[year]) {
                    colours.push('rgba(222,45,38,0.8)');
                } else {
                    colours.push('rgba(204,204,204,1)');
                }
            }

            main_trace = {
                name: "",
                x: regions,
                y: values,
                type: "bar",
                marker: {
                    // color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
                    // color: 'rgba(204,204,204,1)',
                    // color: 'rgba(222,45,38,0.8)',
                    color: colours,
                },
            }

            data = [main_trace];

            layout = {
                title: `Medal tally by region:  ${gamesYears[year]}`,
                showlegend: false,
                hovermode: "closest",
                hoverlabel: {
                    bordercolor: "white",
                },
                height: 1000,
                xaxis: {
                    ticks: "outside",
                    tickangle: -45,
                    automargin: true,
                },
                yaxis: {
                    // range: [0, max_val + 50 - (+max_val % 50)],
                    range: [0, 650],
                },
            };
        }

        Plotly.newPlot("datavis", data, layout);

    }

    setPlot(state, host, sport, comp, mode, year);


}
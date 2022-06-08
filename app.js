function assignment8(){
    var filePath="exam.csv";
    question0(filePath);
    question1(filePath);
    question2(filePath);
}

var question0=function(filePath){

}

var question1=function(filePath){
    var rowConverter = function(d){
        return {
            age: parseInt(d.age),
            allergies: d.allergies,
            Amblyopia: parseInt(d.amblyopia),
            Astigmatism: parseInt(d.astigmatism),
            color: d.color,
            comments: d.comments,
            complaints: d.complaints,
            current_srx: d.current_srx,
            date: d.date,
            date_dt: d.date_dt,
            dbl: parseFloat(d.dbl),
            diagnosis: d.diagnosis,
            dilated: d.dilated,
            dilation_quality_od: d.dilation_quality_od,
            dilation_quality_os: d.dilation_quality_os,
            distance: d.distance,
            distance_od: parseFloat(d.distance_od),
            distance_os: parseFloat(d.distance_os),
            dob: d.dob,
            dob_dt: d.dob_dt,
            dry_od_axis: parseInt(d.dry_od_axis),
            dry_od_cyl: parseFloat(d.dry_od_cyl),
            dry_od_re: parseInt(d.dry_od_re),
            dry_od_sph: parseFloat(d.dry_od_sph),
            dry_os_axis: parseInt(d.dry_os_axis),
            dry_os_cyl: parseFloat(d.dry_os_cyl),
            dry_os_re: parseInt(d.dry_os_re),
            dry_os_sph: parseFloat(d.dry_os_sph),
            dry_ret_od_axis: parseInt(d.dry_ret_od_axis),
            dry_ret_od_cyl: parseFloat(d.dry_ret_od_cyl),
            dry_ret_od_score: parseFloat(d.dry_ret_od_score),
            dry_ret_od_sph: parseFloat(d.dry_ret_od_sph),
            dry_ret_os_axis: parseInt(d.dry_ret_os_axis),
            dry_ret_os_cyl: parseFloat(d.dry_ret_os_cyl),
            dry_ret_os_score: parseFloat(d.dry_ret_os_score),
            dry_ret_os_sph:  parseFloat(d.dry_ret_os_sph),
            emmetropia: parseInt(d.emmetropia),
            family_hx: d.family_hx,
            final_pd_od: parseFloat(d.final_pd_od),
            final_pd_os: parseFloat(d.final_pd_os),
            follow_up: d.follow_up,
            frame: d.frame,
            fundus: d.fundus,
            gestation: d.gestation,
            glasses: d.glasses,
            Hyperopia: parseInt(d.hyperopia),
            matching: d.matching,
            medical_hx: d.medical_hx,
            medications: d.medications,
            Myopia: parseInt(d.myopia),
            near: d.near,
            near_od: d.near_od,
            near_os: d.near_os,
            normal_bvat_oph: d.normal_bvat_oph,
            ocular_hx: d.ocular_hx,
            optometrist: d.optometrist,
            pd_od: parseFloat(d.pd_od),
            pd_os: parseFloat(d.pd_os),
            school: d.school,
            show: parseInt(d.show),
            size: parseFloat(d.size),
            slit_lamp: d.slit_lamp,
            srx_doctor: d.srx_doctor,
            srx_od_axis: parseFloat(d.srx_od_axis),
            srx_od_cyl: parseFloat(d.srx_od_cyl),
            srx_od_score: parseFloat(d.srx_od_score),
            srx_od_sph: parseFloat(d.srx_od_sph),
            srx_os_axis: parseFloat(d.srx_os_axis),
            srx_os_cyl: parseFloat(d.srx_os_cyl),
            srx_os_score: parseFloat(d.srx_os_score),
            srx_os_sph: parseFloat(d.srx_os_sph),
            student_id: parseInt(d.student_id),
            temple: parseFloat(d.temple),
            terms: d.terms,
            wet_od_axis: parseFloat(d.wet_od_axis),
            wet_od_cyl: parseFloat(d.wet_od_cyl),
            wet_od_re: parseFloat(d.wet_od_re),
            wet_od_sph: parseFloat(d.wet_od_sph),
            wet_os_axis: parseFloat(d.wet_os_axis),
            wet_os_cyl: parseFloat(d.wet_os_cyl),
            wet_os_re: parseFloat(d.wet_os_re),
            wet_os_sph: parseFloat(d.wet_os_sph),
            wet_ret_od_axis: parseFloat(d.wet_ret_od_axis),
            wet_ret_od_cyl: parseFloat(d.wet_ret_od_cyl),
            wet_ret_od_score: parseFloat(d.wet_ret_od_score),
            wet_ret_od_sph: parseFloat(d.wet_ret_od_sph),
            wet_ret_os_axis: parseFloat(d.wet_ret_os_axis),
            wet_ret_os_cyl: parseFloat(d.wet_ret_os_cyl),
            wet_ret_os_score: parseFloat(d.wet_ret_os_score),
            wet_ret_os_sph: parseFloat(d.wet_ret_os_sph),
            year: parseInt(d.year),
            zip_code: parseInt(d.zip_code)
        };
    };
    d3.csv(filePath, rowConverter).then(function(data){

        console.log(data)
        var svgheight = 1000;
        var svgwidth = 1000;
        var padding = 75;

        var curGroup = 'Astigmatism';
        var curDisplay = 'Percentage';
        var diags = ['Astigmatism', 'Hyperopia', 'Myopia', 'Amblyopia'];
        var zips = [...new Set(data.map(d => d.zip_code))];
        var dd = []
        zips.forEach(function(d){
            var dataDict = {}
            dataDict['zip'] = d;
            var onlyZip = data.filter(function(j){ return j['zip_code'] == d});
            diags.forEach(function(p){
                var averaged = d3.mean(onlyZip, l => l[p]);
                var totaled = d3.sum(onlyZip, l => l[p]);
                dataDict[p] = averaged;
                dataDict[p+'Total'] = totaled;
            })
            dd.push(dataDict);
        })
        console.log(zips)
        const svg = d3.select('#q1_plot').append('svg').attr('width', svgwidth).attr('height', svgheight)

        var tooltip = d3.select('#q1_plot').append('div').style('opacity', 0).attr('class', 'tooltip').style('background-color', 'white').style('border', 'solid').style('border-width', '2px').style('border-radius', '5px').style('padding', '5px');
        var mouseover = function(d){
            tooltip.style('opacity', 1)
            d3.select(this).style('stroke', 'black').style('opacity', 1)
        }
        var mousemove = function(d, e){
            var row = e
            var coordinates = [xScale(row.zip), yScale(row[curGroup])];
            tooltip.html('Zip Code: '+e.zip+'<br>'+curGroup+' Total: '+e[curGroup+'Total']+'<br>'+curGroup+' Rate: '+Math.round(e[curGroup]*100)+'%').style('left', (coordinates[0]+360)+'px').style('top', (coordinates[1]+175)+'px').style('font-size', 18)
        }
        var mouseleave = function(d){
            tooltip.style('opacity', 0)
            d3.select(this).style('stroke', 'none').style('opacity', 0.8)
        }

        const xScale = d3.scaleBand().domain(zips).range([padding, svgwidth-padding]).paddingInner(0.05);
        const yScale = d3.scaleLinear().domain([0, 1]).range([svgheight-padding, padding]);

        const yTotal = d3.scaleLinear().domain([0, d3.max(dd, d => d['HyperopiaTotal'])]).range([svgheight-padding, padding]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        var xAx = svg.append('g').call(xAxis).attr('transform', 'translate(0, 925)').selectAll('text').attr('transform', 'rotate(325)').style('font-size', 9)
        var yAx = svg.append('g').call(yAxis).attr('transform', 'translate(75, 0)')

        var bars = svg.selectAll('rect').data(dd).enter().append('rect')
            .attr('width', xScale.bandwidth())
            .attr('height', function(d){
                return (svgheight - yScale(d.Astigmatism) - padding)
            })
            .attr('x', function(d){
                return xScale(d.zip);
            })
            .attr('y', function(d){
                return yScale(d.Astigmatism)
            })
            .style('opacity', 0.8)
            .attr('fill', '#172A54')
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);

        function update(selectedGroup){
            curGroup = selectedGroup;
            if (curDisplay == 'Total'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yTotal(d[curGroup+'Total']) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip);
                    })
                    .attr('y', function(d){
                        return yTotal(d[curGroup+'Total'])
                    })
            }
            if (curDisplay == 'Percentage'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yScale(d[curGroup]) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip)
                    })
                    .attr('y', function(d){
                        return yScale(d[curGroup])
                    })
            }
        };
        function updateDropdown(selectedDisplay) {
            curDisplay = selectedDisplay;
            if (curDisplay == 'Total'){
                bars
                .data(dd)
                .transition()
                .duration(1000)
                .attr('width', xScale.bandwidth())
                .attr('height', function(d){
                    return (svgheight - yTotal(d[curGroup+'Total']) - padding)
                })
                .attr('x', function(d){
                    return xScale(d.zip);
                })
                .attr('y', function(d){
                    return yTotal(d[curGroup+'Total']);
                });
                const yTotalAx = d3.axisLeft(yTotal)
                yAx
                    .transition()
                    .duration(1000)
                    .call(yTotalAx)
                    .attr('transform', 'translate(75,0)')
            }
            if (curDisplay == 'Percentage'){
                bars
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('width', xScale.bandwidth())
                    .attr('height', function(d){
                        return (svgheight - yScale(d[curGroup]) - padding)
                    })
                    .attr('x', function(d){
                        return xScale(d.zip);
                    })
                    .attr('y', function(d){
                        return yScale(d[curGroup])
                    });
                yAx
                    .transition()
                    .duration(1000)
                    .call(yAxis)
                    .attr('transform', 'translate(75,0)')

            }

        }

        d3.select('#Astigmatism').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Hyperopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Myopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#Amblyopia').on('change', function(event, d){
            var selectOption = d3.select(this).property('value')
            update(selectOption)
        })
        d3.select('#display').on('change', function(event, d){
            var selectDisplay = d3.select(this).property('value')
            updateDropdown(selectDisplay)
        })
    })
    
}
var question2 = function(filePath){
    var rowConverter = function(d){
        return {
            age: parseInt(d.age),
            allergies: d.allergies,
            Amblyopia: parseInt(d.amblyopia),
            Astigmatism: parseInt(d.astigmatism),
            color: d.color,
            comments: d.comments,
            complaints: d.complaints,
            current_srx: d.current_srx,
            date: d.date,
            date_dt: d.date_dt,
            dbl: parseFloat(d.dbl),
            diagnosis: d.diagnosis,
            dilated: d.dilated,
            dilation_quality_od: d.dilation_quality_od,
            dilation_quality_os: d.dilation_quality_os,
            distance: d.distance,
            distance_od: parseFloat(d.distance_od),
            distance_os: parseFloat(d.distance_os),
            dob: d.dob,
            dob_dt: d.dob_dt,
            dry_od_axis: parseInt(d.dry_od_axis),
            dry_od_cyl: parseFloat(d.dry_od_cyl),
            dry_od_re: parseInt(d.dry_od_re),
            dry_od_sph: parseFloat(d.dry_od_sph),
            dry_os_axis: parseInt(d.dry_os_axis),
            dry_os_cyl: parseFloat(d.dry_os_cyl),
            dry_os_re: parseInt(d.dry_os_re),
            dry_os_sph: parseFloat(d.dry_os_sph),
            dry_ret_od_axis: parseInt(d.dry_ret_od_axis),
            dry_ret_od_cyl: parseFloat(d.dry_ret_od_cyl),
            dry_ret_od_score: parseFloat(d.dry_ret_od_score),
            dry_ret_od_sph: parseFloat(d.dry_ret_od_sph),
            dry_ret_os_axis: parseInt(d.dry_ret_os_axis),
            dry_ret_os_cyl: parseFloat(d.dry_ret_os_cyl),
            dry_ret_os_score: parseFloat(d.dry_ret_os_score),
            dry_ret_os_sph:  parseFloat(d.dry_ret_os_sph),
            emmetropia: parseInt(d.emmetropia),
            family_hx: d.family_hx,
            final_pd_od: parseFloat(d.final_pd_od),
            final_pd_os: parseFloat(d.final_pd_os),
            follow_up: d.follow_up,
            frame: d.frame,
            fundus: d.fundus,
            gestation: d.gestation,
            glasses: d.glasses,
            Hyperopia: parseInt(d.hyperopia),
            matching: d.matching,
            medical_hx: d.medical_hx,
            medications: d.medications,
            Myopia: parseInt(d.myopia),
            near: d.near,
            near_od: d.near_od,
            near_os: d.near_os,
            normal_bvat_oph: d.normal_bvat_oph,
            ocular_hx: d.ocular_hx,
            optometrist: d.optometrist,
            pd_od: parseFloat(d.pd_od),
            pd_os: parseFloat(d.pd_os),
            school: d.school,
            show: parseInt(d.show),
            size: parseFloat(d.size),
            slit_lamp: d.slit_lamp,
            srx_doctor: d.srx_doctor,
            srx_od_axis: parseFloat(d.srx_od_axis),
            srx_od_cyl: parseFloat(d.srx_od_cyl),
            srx_od_score: parseFloat(d.srx_od_score),
            srx_od_sph: parseFloat(d.srx_od_sph),
            srx_os_axis: parseFloat(d.srx_os_axis),
            srx_os_cyl: parseFloat(d.srx_os_cyl),
            srx_os_score: parseFloat(d.srx_os_score),
            srx_os_sph: parseFloat(d.srx_os_sph),
            student_id: parseInt(d.student_id),
            temple: parseFloat(d.temple),
            terms: d.terms,
            wet_od_axis: parseFloat(d.wet_od_axis),
            wet_od_cyl: parseFloat(d.wet_od_cyl),
            wet_od_re: parseFloat(d.wet_od_re),
            wet_od_sph: parseFloat(d.wet_od_sph),
            wet_os_axis: parseFloat(d.wet_os_axis),
            wet_os_cyl: parseFloat(d.wet_os_cyl),
            wet_os_re: parseFloat(d.wet_os_re),
            wet_os_sph: parseFloat(d.wet_os_sph),
            wet_ret_od_axis: parseFloat(d.wet_ret_od_axis),
            wet_ret_od_cyl: parseFloat(d.wet_ret_od_cyl),
            wet_ret_od_score: parseFloat(d.wet_ret_od_score),
            wet_ret_od_sph: parseFloat(d.wet_ret_od_sph),
            wet_ret_os_axis: parseFloat(d.wet_ret_os_axis),
            wet_ret_os_cyl: parseFloat(d.wet_ret_os_cyl),
            wet_ret_os_score: parseFloat(d.wet_ret_os_score),
            wet_ret_os_sph: parseFloat(d.wet_ret_os_sph),
            year: parseInt(d.year),
            zip_code: parseInt(d.zip_code)
        };
    };
    d3.csv(filePath, rowConverter).then(function(data){
        var zips = [...new Set(data.map(d => d.zip_code))];
        const sdmap = d3.json('sdZips.geojson');

        var diags = ['Astigmatism', 'Hyperopia', 'Myopia', 'Amblyopia'];
        const colorScale = d3.scaleLinear().domain([0,1]).range(['#D2D8FF', '#000738'])
        var dd = []
        zips.forEach(function(d){
            var dataDict = {}
            dataDict['zip'] = d;
            var onlyZip = data.filter(function(j){ return j['zip_code'] == d});
            diags.forEach(function(p){
                var averaged = d3.mean(onlyZip, l => l[p]);
                var totaled = d3.sum(onlyZip, l => l[p]);
                dataDict[p] = averaged;
                dataDict[p+'Total'] = totaled;
            })
            dd.push(dataDict);
        })
        console.log(dd)

        sdmap.then(function(map){
            var width = 1000;
            var height = 1000;
            var curDiag = 'Astigmatism'
            function getCurColor(zipCode){
                var f = dd.filter(function(d){ return d['zip'] == parseInt(zipCode)})
                if (f.length == 0){
                    return '#FFFFFF'
                }
                else {
                    return colorScale(f[0][curDiag]);
                }
            }

            var tooltip = d3.select('#q2_plot')
                .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .style('background-color', 'white')
                .style('border', 'solid')
                .style('border-width', '2px')
                .style('border-radius', '5px')
                .style('padding', '5px');
            var mouseover = function(d){
                tooltip
                    .style('opacity', 1)
                d3.select(this)
                    .style('stroke', 'black')
                    .style('opacity', 1)
            }
            var mousemove = function(d, e){
                console.log(e)
                tooltip.html('Zip Code: '+e.zip+'<br>'+curDiag+' Total: '+e[curDiag+'Total']+'<br>'+curDiag+' Rate: '+(Math.round(e[curDiag]*100))+'%')
                    .style('left', '275px')
                    .style('top', '1900px')
                    .style('font-size', 18)
            }
            var mouseleave = function(d){
                tooltip.style('opacity', 0)
                d3.select(this) 
                    .style('stroke', 'black').style('opacity', 0.9)
            };
            var projection = d3.geoAlbersUsa().fitSize([width, height], map);
            var geoGenerator = d3.geoPath().projection(projection);
            var svg = d3.select('#q2_plot').append('svg')
                .attr('width', width)
                .attr('height', height)
            var lines = svg.append('g').selectAll('path')
                .data(map.features).join('path')
                .attr('d', geoGenerator).attr('fill', function(d){
                    return getCurColor(d.properties.zip)
                })
                .attr('stroke', 'black')
                .style('opacity', 0.9)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseleave', mouseleave);


            console.log(map)

            function update(selectedGroup) {
                curDiag = selectedGroup
                lines
                    .data(dd)
                    .transition()
                    .duration(1000)
                    .attr('fill', function(d){
                        console.log(d)
                        return getCurColor(d.zip)
                    })
            }
            d3.select('#Astigmatism2').on('change', function(event, d){
                var selected = d3.select(this).property('value')
                curDiag = selected;
                update(selected)
            })
            d3.select('#Hyperopia2').on('change', function(event, d){
                var selected = d3.select(this).property('value')
                curDiag = selected;
                update(selected)
            })
            d3.select('#Myopia2').on('change', function(event, d){
                var selected = d3.select(this).property('value')
                curDiag = selected;
                update(selected)
            })
            d3.select('#Amblyopia2').on('change', function(event, d){
                var selected = d3.select(this).property('value')
                curDiag = selected;
                update(selected)
            })
        })

    })
}
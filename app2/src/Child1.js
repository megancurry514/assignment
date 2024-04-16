import React, { Component } from "react";
import * as d3 from 'd3';

class Child1 extends Component {
    constructor(props) {
        super(props)
        this.svgRef = React.createRef();
    }

    componentDidUpdate() {
        const { data1 } = this.props;

        if (!data1) return;

        const margin = { top: 10, right: 10, bottom: 30, left: 20 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;

        const svg = d3.select(this.svgRef.current);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data1, d => d.total_bill)])
            .range([margin.left, w]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data1, d => d.tip)])
            .range([h, margin.top]); 

        // X axis
        svg.append("g")
            .attr("transform", `translate(0, ${h})`)
            .call(d3.axisBottom(xScale));

        // Y axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        // circles
        svg.selectAll("circle")
            .data(data1)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.total_bill))
            .attr("cy", d => yScale(d.tip))
            .attr("r", 3)
            .style("fill", "#69b3a2");
    }

    render() {
        return (
            <svg ref={this.svgRef} width="500" height="300"></svg>
        );
    }
}

export default Child1;

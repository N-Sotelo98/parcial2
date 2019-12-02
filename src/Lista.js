import React, { Component } from 'react';
import axios from 'axios'
import * as d3 from "d3";
import {FormattedMessage ,FormattedNumber, FormattedPlural} from 'react-intl';
import ListaDetailed from "./ListaDetailed"

const superlink1 = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
const superlink2="https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json"

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            elegido:{}
        }
    }

    componentDidMount() {
        if (!navigator.onLine) {
            this.setState({ heroes: JSON.parse(localStorage.getItem('heroes')) || [] });
        }
if (navigator.language.includes('en')){
    axios.get(superlink1)
    .then(respose => {
        
        this.setState({ heroes: respose.data});
        localStorage.setItem('heroes', JSON.stringify(this.state.heroes));
        this.drawChart(this.state.heroes);    
       
    })
    .catch(err => console.log("Error en fetch :( --> ", err))

}
else {

    axios.get(superlink2)
    .then(respose => {
        
        this.setState({ heroes: respose.data});
        localStorage.setItem('heroes', JSON.stringify(this.state.heroes));
        this.drawChart(this.state.heroes);    
       
    })
    .catch(err => console.log("Error en fetch :( --> ", err))

}
      

           
    }
    handdleC(heroe)
{
    this.setState({elegido:heroe})

}
    drawChart(data) {
        const svg = d3.select(this.refs.canvas).append("svg");
        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 100, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;
    
        svg.attr("width", width);
        svg.attr("height", height);
    
        let g = svg
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
    
        const y = d3
          .scaleLinear()
          .domain([0, 9256000])
          .range([iheight, 0]);
    
        const x = d3
          .scaleBand()
          .domain(this.state.heroes.map(d => d.name))
          .range([0, iwidth])
          .padding(0.1);
    
        const bars = g.selectAll("rect").data(this.state.heroes);
    
        const bar = bars
          .enter()
          .append("rect")
          .attr("class", "bar")
          .style("fill", "steelblue")
          .attr("x", d => x(d.name))
          .attr("y", d => y(d.views))
          .attr("height", d => iheight - y(d.views))
          .attr("width", x.bandwidth());
    
        g.append("g")
          .classed("x--axis", true)
          .call(d3.axisBottom(x))
          .attr("transform", `translate(0, ${iheight})`);
    
        g.append("g")
          .classed("y--axis", true)
          .call(d3.axisLeft(y));
    
      }

    
    render() {
        return (
            <div>
                        <div  className="row">
                            <div className= "col-6">
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col"><FormattedMessage id="Name"/></th>
                                <th scope="col"><FormattedMessage id="Director"/></th>
                                <th scope="col"><FormattedMessage id="Country"/></th>
                                <th scope="col"><FormattedMessage id="Budget"/></th>
                                <th scope="col"><FormattedMessage id="Views"/></th>
                                <th scope="col"><FormattedMessage id="Release"/></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.heroes.map((heroe) => {
                                return (
                                    <tr>
                                     <td>{heroe.id}</td>
                                        <td> <a onClick={_ => this.handdleC(heroe)}>{heroe.name} </a> </td>
                                      
                                        <td>{heroe.directedBy}</td>
                                        
                                        <td>{heroe.country}</td>
                                        
                                        <td>{heroe.budget}</td>
                                        
                                        <td> {heroe.views } <FormattedPlural value={heroe.views} one={<FormattedMessage id="million"/>} other={<FormattedMessage id="millions"/>}></FormattedPlural></td>
                                       
                                        <td>{heroe.releaseDate}</td>
                    
                                    </tr>
                                )
                            })}
                              </tbody>
                            </table>
                            </div>
                            <div className= "col-6">

                                <ListaDetailed datos ={this.state.elegido}/>
                            </div>

                            </div>
                        
                   
                ) 
                <div ref="canvas"></div>
                
                
            </div>
            
        );
    }
}

export default Lista;
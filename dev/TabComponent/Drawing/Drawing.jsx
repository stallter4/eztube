import React from 'react';
var ReactDom = require('react-dom');
import DrawingTube from './DrawingTube/DrawingTube.jsx';
import styles from './Drawing.css';
var d3 = require("d3");


let Drawing = React.createClass({
    getInitialState : function() {
        return {
            visibility: false,
            x: 0,
            y: 0,
            width: 5,
            height: 5,
            startX: 0,
            startY: 0,
        };
    },
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.tubesArray !== nextProps.tubesArray) {
            return true;
        }
        if (this.state.visibility !== nextState.visibility) {
            return true;
        }
        if (this.state.x !== nextState.x) {
            return true;
        }
        if (this.state.y !== nextState.y) {
            return true;
        }
        if (this.state.width !== nextState.width) {
            return true;
        }
        if (this.state.height !== nextState.height) {
            return true;
        }
        if (this.state.startX !== nextState.startX) {
            return true;
        }
        if (this.state.startY !== nextState.startY) {
            return true;
        }
        return false;
    },

    componentDidUpdate: function(){
        console.log("drawing did update");
    },

    handleMouseDown: function(event) {
        if(event.button === 0) {
            var svg = this.refs.svg;
            this.setState({ visibility:true });
            var userPosX = event.clientX - svg.getBoundingClientRect().left;
            var userPosY = event.clientY - svg.getBoundingClientRect().top;
            var x = (userPosX - svg.getCTM().e) / svg.getCTM().a;
            var y = (userPosY - svg.getCTM().f) / svg.getCTM().d;
            this.setState({ x:x, y:y, startX:x, startY:y});
        }
    },
    handleMouseMove: function(event) {
        if((this.state.visibility === true)) {
            var svg = this.refs.svg;
            var userPosX = event.clientX - svg.getBoundingClientRect().left;
            var userPosY = event.clientY - svg.getBoundingClientRect().top;
            var x = (userPosX - svg.getCTM().e) / svg.getCTM().a;
            var y = (userPosY - svg.getCTM().f) / svg.getCTM().d;
            var width = x - this.state.startX;
            var height = y - this.state.startY;
            if (x < this.state.startX){
                this.setState({x: x, width: Math.abs(width)});
            }
            else{
                this.setState({width: width});
            }
            if(y < this.state.startY){
                this.setState({y:y, height: Math.abs(height)});
            }
            else{
                this.setState({height:height});
            }
        }
    },

    handleMouseUp: function(event) {
        this.setState({visibility:false, width:0, height:0, x:0, y:0});
    },
    renderTubes: function() {
        let deleteTube = this.props.deleteTube;
        return this.props.tubesArray.map((row) => {
            return row.map((tube) => {
                return <DrawingTube key={tube.id} row={row} tube={tube} delete={deleteTube}
                                    selection={this.state.visibility} x={this.state.x} y={this.state.y}
                                    width={this.state.width} height={this.state.height}/>;
            });
        });
    },

    render: function() {
        return (
            <div className={styles.drawing} style={{"border":"1px solid black"}}>
                <svg onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown}
                     ref="svg" className={styles.svg} viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet">
                    <rect className={styles.rect} x={this.state.x} y={this.state.y} width={this.state.width} height={this.state.height}
                                visibility={this.state.visibility ? 'visible' : 'hidden'}/>
                    {this.renderTubes()}
                </svg>
            </div>
        );
    }
});

module.exports = Drawing;
/* updateDrawing: function(props){
 console.log("drawing updated");
 var data = props.data;

 var svg = d3.select("svg");

 var circleSelection = svg.selectAll("circle")
 .data(data)
 .enter()
 .append("circle");

 var attributes = circleSelection
 .attr("cx", function(d){return d.xPos;})
 .attr("cy", function(d){return d.yPos;})
 .attr("r", function(d){return d.radius})
 .style("fill", "purple");

 },

 componentDidMount: function() {
 console.log("mounted" + this.props.data);
 var count = 0;
 var el = ReactDom.findDOMNode(this); // This is de div we are rendering
 var svg = d3.select(el)
 .append("svg")
 .attr("viewBox", "0 0 480 300")
 .attr("preserveAspectRatio", "xMidYMid meet")
 this.updateDrawing(this.props);

 /* Tracker.autorun(function() {
 count++;
 var tC = Tubes.find().count();
 if(count > 2) {
 this.updateDrawing(this.props);
 }
 });
 },

 componentWillUpdate: function(nextProps) {
 console.log("componentwillupdate");
 this.updateDrawing(nextProps);
 },*/
import React from 'react';
var ReactDom = require('react-dom');


let DrawingTube = React.createClass({

    getInitialState : function() {
        return {
            selected: false
        };
    },
    componentDidUpdate: function() {
        console.log("tube updated");
    },
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.tube !== nextProps.tube) {
            return true;
        }
        if (this.state.selected !== nextState.selected) {
            return true;
        }
        return false;
    },

    componentWillReceiveProps: function(nextProps) {
        if(!nextProps.selection && this.props.selection &&
            this.props.tube.xPos > this.props.x && this.props.tube.xPos < (this.props.x + this.props.width)
            && this.props.tube.yPos > this.props.y && this.props.tube.yPos < (this.props.y + this.props.height)){
            this.setState({selected: true});
        }
    },
    fillSVG: function(event){
        if(this.state.selected){
            this.setState({selected: false});
        }
        else{
            this.setState({selected: true});
        }
    },

    render: function() {
        return (
            <circle cx={this.props.tube.xPos}
                    cy={this.props.tube.yPos}
                    r={this.props.tube.diameter/2}
                    stroke="black"
                    strokeWidth="1"
                    fill={this.state.selected ? 'black' : 'purple'}
                    onClick={this.fillSVG}
                    onMouseDown={this.handleMouseDown}
            />
        );
    }
});

module.exports = DrawingTube;


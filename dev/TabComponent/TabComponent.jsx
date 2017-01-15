import React from 'react';
import { Tabs, Tab } from 'react-tab-view';
import Drawing from './Drawing/Drawing.jsx';
import InitModal from './InitModal/InitModal.jsx'
import styles from './TabComponent.css';
var shortid=require('js-shortid');
var $ = require('jQuery');



let TabComponent = React.createClass({
    getInitialState : function() {
        return {
            tubesArray: [
                [
                    {id: shortid.gen(), xPos:(0),yPos:(0), diameter: 15},
                    {id: shortid.gen(), xPos:(20),yPos:(0), diameter: 15},
                    {id: shortid.gen(), xPos:(40),yPos:(0), diameter: 15},

                ],
                [
                    {id: shortid.gen(), xPos:(0),yPos:(20), diameter: 15},
                    {id: shortid.gen(), xPos:(20),yPos:(20), diameter: 15},
                    {id: shortid.gen(), xPos:(40),yPos:(20), diameter: 15},

                ],
                [
                    {id: shortid.gen(), xPos:(0),yPos:(40), diameter: 15},
                    {id: shortid.gen(), xPos:(20),yPos:(40), diameter: 15},
                    {id: shortid.gen(), xPos:(40),yPos:(40), diameter: 15},

                ]
            ],
            rows: 10,
            tubesPerRow: 10,
            isModalOpen: false,
            diameter: 10,
            pitch: 5,
            pattern: "square",
        };

    },
    componentDidUpdate: function(){
        console.log("componentDidUpdate");
    },

    openModal() {
        this.setState({ isModalOpen: true })
    },

    closeModal() {
        this.setState({ isModalOpen: false })
    },

    modalSubmit(diameter, rows, tubesPerRow, pitch, pattern) {

        this.setState({diameter:diameter, rows:rows, tubesPerRow: tubesPerRow, pitch: pitch, pattern: pattern});
        var newTubesArray = [];
        var spacingX = 0;
        var spacingY = 0;
        if(pattern == "square"){
            spacingX = pitch;
            spacingY = pitch;
        }
        else if(pattern == "rotatedSquare"){
            spacingX = 2 * pitch * Math.sin(0.785398);
            spacingY = pitch * Math.cos(0.785398);
        }
        else if(pattern == "triangular"){
            spacingX = 2 * pitch * Math.sin(1.0472);
            spacingY = pitch * Math.cos(1.0472);
        }
        else if(pattern == "rotatedTriangular"){
            spacingX = 2 * pitch * Math.sin(0.523599);
            spacingY = pitch * Math.cos(0.523599);
        }
        for(var i = 0; i<rows; i++){
            var innerArray = [];
            for(var j = 0; j<tubesPerRow; j++){
                if(i %2 ==1 | pattern == "square") {
                    innerArray.push({
                        id: shortid.gen(),
                        xPos: (spacingX * j),
                        yPos: (spacingY * i),
                        diameter: diameter
                    })
                }
                else{
                    innerArray.push({
                        id: shortid.gen(),
                        xPos: ((spacingX * j) - (spacingX/2)),
                        yPos: (spacingY * i),
                        diameter: diameter
                    });
                }
            }
            newTubesArray.push(innerArray);
        }

        this.setState({tubesArray:newTubesArray});
    },

    scaleToFit: function(){
        let svg = this.refs.drawing.refs.svg;
        let length = this.state.tubesArray.length;
        var newViewBox = (svg.getBBox().x - 2) + " " + (svg.getBBox().y - 2) +" " + (svg.getBBox().width + 4) + " " + (svg.getBBox().height + 4);
        svg.setAttribute("viewBox", newViewBox);
    },

    saveToOffice: function(){
        Office.context.document.settings.set('tubeArray', this.state.tubesArray);
        Office.context.document.settings.saveAsync(function (asyncResult) {
            console.log('Settings saved with status: ' + asyncResult.status);
        });
    },

    printSettings: function(){
        console.log(Office.context.document.settings.get('tubeArray'));
    },

    saveToFile: function(event){

        var fileInput = event.currentTarget
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var fileImport = reader.result;
            console.log(fileImport);
        }
        reader.readAsText(file);

    },
    clickDiv: function(e){
        this.inputElement.click();
    },

    printTubesArray: function(){
        console.log(this.state.tubesArray);
    },
    printDiameter: function(){
        console.log(this.state.diameter);
    },

    deleteTube: function(row, tube){
        var rowIndex = this.state.tubesArray.indexOf(row);
        var tubeIndex = row.indexOf(tube);
        if(tubeIndex > -1) {
            var newTubesArray = this.state.tubesArray.slice();
            var newRowArray = this.state.tubesArray[rowIndex].slice();
            newRowArray.splice(tubeIndex, 1);
            if (newRowArray.length < 1) {
                newTubesArray.splice(rowIndex,1);
            }
            else {
                newTubesArray[rowIndex] = newRowArray;
            }
            this.setState({tubesArray:newTubesArray});
        }
    },

    render: function() {

        return (
            <Tabs headers ={["Drawing", "Import", "Color Legend", "Tube Sheet", "3D", "Report"]} >
                <Tab >
                    <div className={styles.drawingWrapper}>
                        <InitModal isOpen={this.state.isModalOpen}
                                   onClose={() => this.closeModal()}
                                   modalSubmit={this.modalSubmit}
                                   pattern={this.state.pattern}
                                   diameter={this.state.diameter}
                                   tubesPerRow={this.state.tubesPerRow}
                                   rows={this.state.rows}
                                   pitch={this.state.pitch}/>
                        <div className={styles.TabButtons}>
                            <button className={styles.tabButton} onClick={this.scaleToFit}>
                                Scale to Fit
                            </button>
                            <button className={styles.tabButton} onClick={this.saveToOffice}>
                                Office
                            </button>
                            <button className={styles.tabButton} onClick={this.printTubesArray}>
                                Print Nope                    </button>
                            <button className={styles.tabButton} onClick = {this.clickDiv}>
                                <input ref={input => this.inputElement = input}
                                       className={styles.input}
                                       type="file"
                                       onChange={this.saveToFile}
                                       visibility ="hidden"/>
                                Save
                            </button>
                            <button className={styles.tabButton} onClick={this.printSettings}>
                                Print Settings
                            </button>
                            <button className={styles.tabButton} onClick={this.openModal}>
                                Initialize
                            </button>
                            <button className={styles.tabButton} onClick={this.printDiameter}>
                                Diameter
                            </button>
                        </div>
                        <Drawing ref="drawing" tubesArray = {this.state.tubesArray} deleteTube={this.deleteTube}/>
                    </div>
                </Tab>
                <Tab>
                    <h1>Imported</h1>
                </Tab>
                <Tab >
                    <h1>Failure hot swap</h1>
                </Tab>
                <Tab >
                    <h1>Tube Sheet</h1>
                </Tab>
                <Tab>
                    <h1>3D</h1>
                </Tab>
                <Tab>
                    <h1>Report</h1>
                </Tab>
            </Tabs>
        );
    }


});

module.exports = TabComponent;

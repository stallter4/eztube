import React from 'react';
var ReactDom = require('react-dom');
import styles from './InitModal.css';



let InitModal = React.createClass ({
    getInitialState : function() {
        return {
            diameter: null,
            rows: null,
            tubesPerRow: null,
            pitch: null,
            pattern: "square"
        };
    },
    handleSubmit(event) {
        event.preventDefault();
        this.props.modalSubmit(this.state.diameter, this.state.rows, this.state.tubesPerRow,
            this.state.pitch, this.state.pattern);
        this.props.onClose();
    },

    handleChangeDiameter(event) {
        this.setState({diameter: event.target.value});
    },

    handleChangeRows(event){
        this.setState({rows: event.target.value});
    },

    handleChangeTPR(event){
        this.setState({tubesPerRow: event.target.value});
    },

    handleChangePitch(event){
        this.setState({pitch: event.target.value});
    },

    handleChangePattern(event){
        console.log(event.target.value);
        this.setState({pattern: event.target.value});
    },

    close(e) {
        e.preventDefault();

        if (this.props.onClose) {
            this.props.onClose()
        }
    },
    render() {

        if (this.props.isOpen === false)
            return null

        let modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50vw',
            height: '75vh',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            padding: '20px',
            display: 'flex',
            display: '-webkit-flex',
            flexDirection: 'column'
        }

        let backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
        }

        return (
            <div>
                <div style={modalStyle}>
                    <form onSubmit={this.handleSubmit} className={styles.form}>
                        <h3 className={styles.h3}>Initialize Heat Exchanger Values </h3>
                        <label className={styles.label} htmlFor="diameter" >Diameter:</label>
                        <input autoFocus className={styles.input} type="number" id="diameter" onChange={this.handleChangeDiameter}/>
                        <label className={styles.label} htmlFor="rows">Rows:</label>
                        <input className={styles.input} type="number" id="rows" name="rows" onChange={this.handleChangeRows}/>
                        <label className={styles.label} htmlFor="tubesPerRow">Tubes Per Row:</label>
                        <input className={styles.input} type="number" id="tubesPerRow" name="tubesPerRow"  onChange={this.handleChangeTPR}/>
                        <label className={styles.label} htmlFor="pitch">Pitch:</label>
                        <input className={styles.input} type="number" id="pitch" name="pitch" onChange={this.handleChangePitch}/>
                        <label className={styles.label} htmlFor="pattern">Pattern:</label>
                        <select className={styles.select} id="pattern" onChange={this.handleChangePattern}>
                            <option value="square">Square</option>
                            <option value="rotatedSquare">Rotated Square</option>
                            <option value="triangular">Triangular</option>
                            <option value="rotatedTriangular">Rotated Triangular</option>
                        </select>
                        <button className={styles.button} onClick={e => this.close(e)}>Cancel</button>
                        <input className={styles.submit} type="submit" value="Initialize"/>
                    </form>
                </div>
                <div style={backdropStyle} onClick={e => this.close(e)}/>
            </div>
        );
    }
});

module.exports = InitModal;



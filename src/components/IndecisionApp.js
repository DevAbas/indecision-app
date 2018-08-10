import React, { Component } from 'react';

//COMPONENTS
import Header from './Header';
import AddOption from './AddOption';
import Option from './Option';
import Options from './Options';
import Actions from './Actions';
import OptionModal from './OptionModal';


class IndecisionApp extends Component { 

  state = {
    options: [],
    selectedOption: undefined
  }

  handleRemoveOptions = () => {
    this.setState(() => ({ options: [] }))
  }
  handleRemoveOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }))
  }
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }))
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ 
      selectedOption: option
    }))
  }
  handleAddOption = (option) => {
    if(!option) {
      return 'Enter valid value to add item'
    } else if(this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({ 
      options: prevState.options.concat(option)
     }))
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options) {
        this.setState(() => ({ options }));
      }
    } catch(e) {

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('saving data');
    }
  }
  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Actions pickOption={this.handlePick} hasOptions={this.state.options.length > 0} />
          <div className="widget">
            <Options 
              removeOptions={this.handleRemoveOptions} 
              handleRemoveOption = {this.handleRemoveOption}
              options={this.state.options} 
            />
            <AddOption addOption={this.handleAddOption} />
          </div>
          <OptionModal
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
          />
        </div>
      </div>
    )
  }
}

export default IndecisionApp;
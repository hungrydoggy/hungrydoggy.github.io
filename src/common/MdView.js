import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';

import './github-markdown.css';


// const address = 'https://hungrydoggy.github.io';
const address = 'http://localhost:3000';

class MdView extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      source: '',
    };
  }

  async componentDidMount () {
    this.setState({
      source: await (await fetch(this.props.sourcePath)).text(),
    });
  }

  render () {
    
    return (
      <div className="markdown-body">
        <ReactMarkdown
          source={this.state.source}
          skipHtml={false}
          renderers={{
            code: CodeBlock,
          }}
          transformImageUri={
            (input) => {
              return /^https?:/.test(input)
                ? input
                : `${address}/${input}`
            }
          }
        />
      </div>
    );
  }
}

MdView.propTypes = {
  sourcePath: PropTypes.string,
};

export default MdView;
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';

import './github-markdown.css';


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
          transformLinkUri={
            (input) => {
              return /^https?:/.test(input)
                ? input
                : `${window.location.origin}/${input}`
            }
          }
          transformImageUri={
            (input) => {
              return /^https?:/.test(input)
                ? input
                : `${window.location.origin}/${input}`
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
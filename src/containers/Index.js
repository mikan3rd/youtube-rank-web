import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';

import {IndexActions} from '../modules/Index';

import '../../stylesheets/03_page/index.css';

Modal.setAppElement('#root');

const LoadingModal = (props) => {
  const {isLoading} = props;
  const customStyles = {
    content: {
      backgroundColor: 'rgba(0,0,0,0)',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  };

  return (
    <Modal
      isOpen={isLoading}
      style={customStyles}
    >
      <div className="loading-modal">
        <div className="pac-man" />
      </div>
    </Modal>
  );
};

class Index extends React.Component {

  componentWillMount = () => {
    const {index, getSearchResult} = this.props;
    getSearchResult(index.params.toJS());
  }

  handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      const {index, getSearchResult} = this.props;
      getSearchResult(index.params.toJS());
    }
  }

  render() {
    const {
      index,
      getSearchResult,
      changeValueOfParams,
    } = this.props;

    const {
      params,
      isLoading,
      results,
    } = index;
    console.log(results);

    return (
      <div className="p-index">
        <LoadingModal isLoading={isLoading} />
        <div className="p-index__body">
          <div className="p-index__logo">
            <img
              className="p-index__logo__icon"
              src="/images/youtube-logo.png"
              alt="YouTube"
            />
            <span>ランキング検索(β版)</span>
          </div>
          <div>
            {results.map((result, index) => {
              const time = moment(result.snippet.publishedAt);
              return (
                <div
                  key={index}
                  className="p-index__video"
                >
                  <iframe
                    src={`//www.youtube.com/embed/${result.id}`}
                    width="30%"
                    height="105"
                    frameBorder="0"
                    allowFullScreen
                  />
                  <div className="p-index__video__right">
                    <div className="p-index__video__date">{time.format('YYYY/MM/DD HH:mm')}</div>
                    <div className="p-index__video__title">{result.snippet.title}</div>
                    <div className="p-index__video__channel">{result.snippet.channelTitle}</div>
                    <div className="p-index__video__statistics">
                      <svg
                        className="p-index__video__statistics__icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <use xlinkHref="/images/play-circle.svg#feather-play-circle" />
                      </svg>
                      <div>
                        {result.statistics.viewCount}
                      </div>
                      <svg
                        className="p-index__video__statistics__icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <use xlinkHref="/images/heart.svg#feather-heart" />
                      </svg>
                      <div>
                        {result.statistics.likeCount}
                      </div>
                    </div>
                    <div className="p-index__video__rank">{result.rank}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-index__search-box">
          <input
            className="p-index__search-box__input"
            value={params.get('query')}
            onKeyPress={this.handleOnKeyPress}
            onChange={(e) => changeValueOfParams({key: 'query', value: e.target.value})}
          />
          <svg
            className="p-index__search-box__icon"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            onClick={() => getSearchResult(params.toJS())}
          >
            <use xlinkHref="/images/search.svg#feather-search" />
          </svg>
          <svg
            className="p-index__search-box__icon"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <use xlinkHref="/images/settings.svg#feather-settings" />
          </svg>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    index: state.index,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(IndexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import {is} from 'immutable';
import {
  Page,
  Splitter,
  SplitterContent,
  SplitterSide,
  List,
  ListHeader,
  ListItem,
  LazyList,
  Select,
} from 'react-onsenui';

import {IndexActions} from '../modules/Index';

import '../../stylesheets/03_page/index.css';

Modal.setAppElement('#root');

const CategoryIds = [
  {value: 0, label: 'なし'},
  {value: 1, label: '映画とアニメ'},
  {value: 2, label: '自動車と乗り物'},
  {value: 10, label: '音楽'},
  {value: 15, label: 'ペットと動物'},
  {value: 17, label: 'スポーツ'},
  {value: 19, label: '旅行とイベント'},
  {value: 20, label: 'ゲーム'},
  {value: 22, label: 'ブログ'},
  {value: 23, label: 'コメディー'},
  {value: 24, label: 'エンターテイメント'},
  {value: 25, label: 'ニュースと政治'},
  {value: 26, label: 'ハウツーとスタイル'},
  {value: 27, label: '教育'},
  {value: 28, label: '科学と技術'},
];


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

  componentWillReceiveProps = (nextProps) => {
    const nextParams = nextProps.index.params;
    const params = this.props.index.params;
    if (nextParams.get('query') !== params.get('query')) {
      return;
    } else if (!is(nextParams, params)) {
      this.props.getSearchResult(nextParams.toJS());
    }
  }

  handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      const {index, getSearchResult} = this.props;
      getSearchResult(index.params.toJS());
    }
  }

  renderVideoContent = (index) => {
    const result = this.props.index.results[index];
    const time = moment(result.snippet.publishedAt);
    return (
      <ListItem
        key={index}
        className="p-index__video__wrapper"
      >
        <div className="p-index__video">
          <iframe
            src={`//www.youtube.com/embed/${result.id}`}
            width="30%"
            height="100"
            frameBorder="0"
            allowFullScreen
          />
          <div className="p-index__video__right">
            <div className="p-index__video__rank">{result.rank}</div>
            <div className="p-index__video__date">{time.format('YYYY/MM/DD HH:mm')}</div>
            <div className="p-index__video__title">{result.snippet.title}</div>
            <div className="p-index__video__channel">{result.snippet.channelTitle}</div>
            <div className="p-index__video__statistics">
              <svg
                className="p-index__video__statistics__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="/images/play-circle.svg#feather-play-circle" />
              </svg>
              <div>
                {result.statistics.viewCount || 'なし'}
              </div>
              <svg
                className="p-index__video__statistics__icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <use xlinkHref="/images/heart.svg#feather-heart" />
              </svg>
              <div>
                {result.statistics.likeCount || 'なし'}
              </div>
            </div>

          </div>
        </div>
      </ListItem>
    );
  }

  render() {
    const {
      index,
      getSearchResult,
      changeValueForKey,
      changeValueOfParams,
    } = this.props;

    const {
      params,
      isLoading,
      isSideOpen,
      results,
    } = index;
    console.log(index.params.toJS());

    return (
      <Splitter>
        <SplitterSide
          style={{
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
          }}
          side="left"
          width={200}
          collapse={true}
          swipeable={true}
          isOpen={isSideOpen}
          onClose={() => changeValueForKey({key: 'isSideOpen', value: false})}
          onOpen={() => changeValueForKey({key: 'isSideOpen', value: true})}
        >
          <Page>
            <ListHeader>期間</ListHeader>
            <div className="p-index__side__select">
              <Select
                value={params.get('period')}
                onChange={(e) => changeValueOfParams({key: 'period', value: e.target.value || null})}
              >
                <option value="day">今日</option>
                <option value="yesterday">昨日</option>
                <option value="weeks">週間</option>
                <option value="month">月間</option>
                <option value="all">全期間</option>
              </Select>
            </div>
            <ListHeader>カテゴリー</ListHeader>
            <div className="p-index__side__select">
              <Select
                value={CategoryIds.find((category) => category.value === params.get('videoCategoryId'))}
                onChange={(e) => changeValueOfParams({key: 'videoCategoryId', value: e.target.value})}
              >
                {CategoryIds.map((category, index) => {
                  return (
                    <option key={index} value={category.value}>{category.label}</option>
                  );
                })}
              </Select>
            </div>
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page>
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
                <LazyList
                  length={results.length}
                  renderRow={this.renderVideoContent}
                  calculateItemHeight={() => 125}
                />
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
                  onClick={() => changeValueForKey({key: 'isSideOpen', value: !isSideOpen})}
                >
                  <use xlinkHref="/images/settings.svg#feather-settings" />
                </svg>
              </div>
            </div>
          </Page>
        </SplitterContent>
      </Splitter>
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

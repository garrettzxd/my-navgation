import React, { ReactElement, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import jsonp from '@/helper/jsonp';
import { searchList } from './contants';
import './search.styl';

const Search = (): ReactElement => {
  const [logoIndex, setLogoIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const inputChange = (val: string): void => {
    setSearchValue(val);
  };

  const inputOnFocus = (): void => {
    console.log('focus');
    setIsFocus(true);
  };

  const inputOnBlur = (): void => {
    setIsFocus(false);
  };

  // 搜索框变化事件
  const searchSourceChange = (): void => {
    setLogoIndex(logoIndex >= 2 ? 0 : logoIndex + 1);
  };

  // 搜索按钮
  const search = async (): Promise<void> => {
    const {
      baseUrl, callbackKey, getParams,
    } = searchList[logoIndex];
    jsonp({
      url: baseUrl,
      callbackKey,
      params: getParams(searchValue),
      callback: (data) => {
        console.log('jsonp', data);
      },
    });
  };

  return (
    <div className={`search ${isFocus && searchValue ? 'search__focus' : ''}`}>
      <div
        className="search__logo not-focus"
        onClick={searchSourceChange}
        role="button"
        tabIndex={0}
      >
        <img
          src={searchList[logoIndex].image}
          title={searchList[logoIndex].name}
          className="search__logo__image not-focus"
          alt="logo"
        />
      </div>
      <input
        value={searchValue}
        autoComplete="false"
        className="search__input not-focus"
        onChange={(e) => {
          inputChange(e.target.value);
        }}
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
      />

      <div
        className="search__button not-focus"
        onClick={search}
        role="button"
        tabIndex={0}
      >
        <SearchOutlined />
      </div>

      {isFocus && searchValue ? (<div className="search__sug">1</div>) : null}
    </div>
  );
};

export default Search;

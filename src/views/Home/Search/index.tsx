import React, { ReactElement, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import jsonp from '@/helper/jsonp';
import { searchList } from './contants';
import './search.styl';

const Search = (): ReactElement => {
  const [logoIndex, setLogoIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const inputChange = (val: string): void => {
    setSearchValue(val);
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
    <div className="search">
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
        name="q"
        className="search__input not-focus"
        onChange={(e) => {
          inputChange(e.target.value);
        }}
      />

      <div
        className="search__button not-focus"
        onClick={search}
        role="button"
        tabIndex={0}
      >
        <SearchOutlined />
      </div>
    </div>
  );
};

export default Search;

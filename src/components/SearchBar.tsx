/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @fileoverview A React component that renders a search-bar with a default CSS ctyle.
 * @exports JSX.Element
 */

import React, { useRef, useState } from 'react';
import '../styles/search-bar.scss';
import { TextIconButton } from './PrimaryButton';

/**
 * @name SearchBar
 * @extends `TextIconButton`
 * @description Renders a search field and takes the size of the container.
 * @param {string} props.className The default class of the search-bar.
 * @param {boolean} props.done Accepts a boolean value to set the ongoing search as completed.
 * @param {string} props.placeholder Placeholder text for the search bar.
 * @param {JSX.Element} props.children React Elements
 * @param {function} props.onSearch A function to collect the search text.
 * @param {function} props.cancelSearch A function to cancel an ongoing search.
 * @return {JSX.Element} A search input with a spinner component.
 */
export default function SearchBar(props: any) {
  const [focus, setFocus] = useState(false);
  let input: any = useRef(null);

  input = props.domRef ? props.domRef : input;
  const className = `search-bar ${props.className || ''}`;

  const triggerSearchField = () => {
    if (focus) return;
    setFocus(true);
    input.current.placeholder = '';
    setTimeout(() => input.current.focus(), 100);
  };

  const searchValue = (e: any) => {
    e.preventDefault();
    props.onSearch && props.onSearch(e.target[0].value);
    setTimeout(() => input.current && input.current.blur(), 100);
  };

  const setPlaceholder = (text: any) => {
    input.current.placeholder = text;
  };

  const searchIcon = props.searchIcon || 'search';

  return (
    <form
      className={className}
      onClick={triggerSearchField}
      onSubmit={searchValue}
    >
      <input
        type='text'
        name='search'
        placeholder={props.placeholder || 'Search'}
        required
        disabled={!focus}
        ref={input}
        autoFocus
        onBlur={() => {
          setPlaceholder(props.placeholder);
          setFocus(false);
        }}
        onFocus={() => setPlaceholder('')}
        onChange={props.onChange}
      />
      <span>
        <i>{searchIcon}</i>
      </span>
    </form>
  );
}

/**
 * @name LongSearchButton
 * @extends `TextIconButton`
 * @description Renders an icon and a text into an `PrimaryButton`.
 * @param {string} props.className The default class of the button.
 * @param {string} props.addClass Add extra class styles to overwrite default class.
 * @param {number} props.width Width of the button.
 * @param {number} props.height Height of the button.
 * @param {string} props.text Text for the button.
 * @param {object} props.textStyle Style Inline CSS styles for the button text.
 * @param {object} props.iconStyle Style Inline CSS styles for icon.
 * @param {function} props.onClick onclick event function of the button.
 * @return {JSX.Element} A `TextIconButton` with an _search_ icon and _Search_ text.
 */
export function LongSearchButton(props: any) {
  const addClass = `long-search-button ${props.addClass || ''}`;

  return (
    <TextIconButton
      addClass={addClass}
      icon='search'
      text={props.text}
      {...props}
    />
  );
}

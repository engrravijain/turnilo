/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './nav-logo.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { $, Expression, Executor, Dataset } from 'plywood';
import { Stage, Clicker, Essence, DataCube, Filter, Dimension, Measure } from '../../../common/models/index';
import { SvgIcon } from '../svg-icon/svg-icon';

export interface NavLogoProps extends React.Props<any> {
  onClick?: React.MouseEventHandler<HTMLElement>;
  customLogoSvg?: string;
}

export interface NavLogoState {
}

export class NavLogo extends React.Component<NavLogoProps, NavLogoState> {

  render() {
    const { onClick, customLogoSvg } = this.props;
    const svg = customLogoSvg || require('../../icons/turnilo-logo.svg');

    return <div className="nav-logo" onClick={onClick}>
      <div className="logo">
        <SvgIcon svg={svg}/>
      </div>
    </div>;
  }
}

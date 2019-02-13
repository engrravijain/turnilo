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

import * as React from "react";
import * as ReactDOM from "react-dom";
import { classNames } from "../../utils/dom/dom";
import "./body-portal.scss";
import normalizeStyles from "./normalize-styles";

export interface BodyPortalProps {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  fullSize?: boolean;
  disablePointerEvents?: boolean;
  onMount?: () => void;
  isAboveAll?: boolean;
}

export class BodyPortal extends React.Component<BodyPortalProps, {}> {
  public static defaultProps: Partial<BodyPortalProps> = {
    disablePointerEvents: false,
    isAboveAll: false
  };

  private static aboveAll: any;

  constructor(props: BodyPortalProps) {
    super(props);
    this.target = document.createElement("div");
    this.target.className = classNames("body-portal", { "full-size": props.fullSize });
  }

  private readonly target: HTMLElement = null;

  componentDidMount() {
    document.body.appendChild(this.target);

    const { onMount, isAboveAll } = this.props;
    if (onMount) onMount();

    if (isAboveAll) {
      if (BodyPortal.aboveAll) throw new Error("There can be only one");
      BodyPortal.aboveAll = this;
    }
  }
  componentWillUnmount() {
    document.body.removeChild(this.target);
    if (BodyPortal.aboveAll === this) BodyPortal.aboveAll = undefined;
  }

  render() {
    Object.assign(this.target.style, normalizeStyles(this.props));
    return ReactDOM.createPortal(this.props.children, this.target);
  }
}

/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

import monster from './monster.gif';
import logo from './d66.png';
import matrix from './matrix.png';

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={s.header} ref={node => (this.root = node)}>
        <img className={s.monster} src={monster} role="presentation" />
        <div className={s.matrixContainer}>
          <img className={s.matrix} src={matrix} role="presentation" />
        </div>
        <img className={s.logo} src={logo} role="presentation" />
      </header>
    );
  }

}

export default Header;

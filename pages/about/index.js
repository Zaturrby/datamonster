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
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import Header from '../../components/Layout/Header.js';
import Login from '../home/login.js';

class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <Header />
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Login viewer="true" />
      </Layout>
    );
  }

}

export default AboutPage;

import * as React from 'react';
import styles from './HttpClient.module.scss';
import { IHttpClientProps } from './IHttpClientProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HttpClient extends React.Component<IHttpClientProps, {}> {
  public render(): React.ReactElement<IHttpClientProps> {
    return (
      <div className={ styles.httpClient }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
          <div>

          <ul>
          {this.props.lists.map((list) =>
            <li key={list.Id} >
              Id: {list.Id}, Title: {list.Title}
            </li>
          )}
          </ul>

          </div>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import styles from './HelloWorldReact.module.scss';
import { IHelloWorldReactProps } from './IHelloWorldReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorldReact extends React.Component<IHelloWorldReactProps, {}> {
  public render(): React.ReactElement<IHelloWorldReactProps> {
    return (
      <div className={ styles.helloWorldReact }>
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
          <ul className={styles.list}>
          {this.props.lists.map((list) =>
            <li key={list.Id} >
              Id: {list.Id}, Title: {list.Title}
            </li>
          )}
          </ul>
        </div>
      </div>
    );
  }
}

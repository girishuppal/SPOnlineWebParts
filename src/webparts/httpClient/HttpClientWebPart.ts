import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HttpClientWebPartStrings';
import HttpClient from './components/HttpClient';
import { IHttpClientProps } from './components/IHttpClientProps';
import { ISPList } from './ISPList'
import { SPHttpClient } from '@microsoft/sp-http';
import MockHttpClient from '../helloWorldReact/MockHttpClient';

export interface IHttpClientWebPartProps {
  description: string;
}

export default class HttpClientWebPart extends BaseClientSideWebPart<IHttpClientWebPartProps> {

  public render(): void {

    this._getListData()
      .then(lists => {

        const element: React.ReactElement<IHttpClientProps> = React.createElement(
          HttpClient,
          {
            description: this.properties.description,
            lists: lists
          }
        );

        ReactDom.render(element, this.domElement);
      });
  }

  private _getListData(): Promise<ISPList[]> {
    if (Environment.type === EnvironmentType.Local) {
      return this._getMockListData();
    }
    else {
      return this._getSharePointListData();
    }

  }
  private _getSharePointListData(): Promise<ISPList[]> {
    const url: string = this.context.pageContext.web.absoluteUrl + '/_api/web/lists?filter=Hidden eq false';
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.value;
      }) as Promise<ISPList[]>;

  }
  private _getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
      .then((data: ISPList[]) => {
        return data;
      }
      );
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

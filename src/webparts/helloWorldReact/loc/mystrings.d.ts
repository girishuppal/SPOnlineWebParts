declare interface IHelloWorldReactWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloWorldReactWebPartStrings' {
  const strings: IHelloWorldReactWebPartStrings;
  export = strings;
}

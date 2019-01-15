import { ISPList } from './ISPList'

export default class MockHttpClient {
    private static _items: ISPList[] = [
        { Title: 'ABCD', Id: '0' },
        { Title: 'LMNO', Id: '1' },
        { Title: 'PPPP', Id: '2' },
        { Title: 'PQRS', Id: '3' }
    ]


    public static get(restUrl: string, options?: any): Promise<ISPList[]> {

        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        }
        );

    }
}
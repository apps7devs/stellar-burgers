export type TWSState = {
  wsConnected: boolean;
  responseData: any;
  wsError?: Event;
  currentFeedId: string | null;
  orderFeedModalVisibility: boolean;
  loaderWS: boolean
}

import React from 'react';
import { OrderFeed } from '../order-feed/order-feed';
import { WSConnectionStartAction, WSConnectionClosedAction } from '../../services/actions/ws-actions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TWSState } from '../../utils/types/reducers/ws-reducer-types';

import Loader from '../loader/loader'

export const PersonalFeed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { responseData, loaderWS } = useSelector(
    (state): TWSState => state.ws!
  );

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(WSConnectionStartAction(localStorage.getItem('token') as string));
    } else {
      dispatch(WSConnectionClosedAction())
    }
    return () => {
      dispatch(WSConnectionClosedAction())
    }
  }, [dispatch])

  return (
    <>
    {loaderWS && (<Loader extraClass=''></Loader>)}
  
      {
        !loaderWS && responseData && responseData?.orders &&
        (<OrderFeed
          data={responseData?.orders?.reverse()}
          pathname='orders/'
          isFeed={false}
        />)
      }
    </>
  )
}
import React from 'react';
import { OrderFeed } from '../order-feed/order-feed';
import { WSConnectionStartAction, WSConnectionClosedAction } from '../../services/actions/ws-actions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TWSState } from '../../utils/types/reducers/ws-reducer-types';
import { getCookie } from '../../utils/cookie';

export const PersonalFeed = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { responseData } = useSelector(
    (state): TWSState => state.ws!
  );

  React.useEffect(() => {
    if (getCookie('token')) {
      dispatch(WSConnectionStartAction(getCookie('token') as string));
    } else {
      dispatch(WSConnectionClosedAction())
    }
    return () => {
      dispatch(WSConnectionClosedAction())
    }
  }, [dispatch])

  return (
    <>
      {
        responseData &&
        <OrderFeed
          data={responseData?.orders.reverse()}
          pathname='orders/'
          isFeed={false}
        />
      }
    </>
  )
}
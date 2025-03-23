import React from 'react';
import styles from './feed-page.module.scss';
import { OrderFeed } from '../../components/order-feed/order-feed';
import { ScoreBoard } from '../../components/score-board/score-board';
import { WSConnectionStartAction, WSConnectionClosedAction } from '../../services/actions/ws-actions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TWSState } from '../../utils/types/reducers/ws-reducer-types';
import Loader from '../../components/loader/loader'

export const FeedPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { responseData, loaderWS } = useSelector(
    (state): TWSState => state.ws!
  );

  React.useEffect(() => {
      dispatch(WSConnectionStartAction('/all'));
    return() => {
      dispatch(WSConnectionClosedAction());
    }
  }, [dispatch])

  return (
  <>
    <h2 className={`${styles.header} text text_type_main-large mt-8 mb-4`}>Лента заказов</h2>
    <div>
      <div className={styles.data}>
        {loaderWS && (<Loader extraClass=''></Loader>)}
  
        {
         !loaderWS && responseData &&
          <div className={styles.sectionContainer}>
            <OrderFeed
              data={responseData?.orders}
              pathname='/feed/'
              isFeed={true}
            />
            <ScoreBoard
              data={responseData}
            />
          </div>
        }

      </div>
    </div>
    </>
  )
}
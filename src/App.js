import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Player from './components/Player';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainPage from './public/MainPage';
import * as actions from './store/actions';

function App() {

  const [listSongsRight, setListSongsRight] = useState(true);
  const [player, setPlayer] = useState(false)
  const dispatch = useDispatch();

  const { curSongId } = useSelector(state => state.music)

  useEffect(() => {
    dispatch(actions.getHome())
  })
  useEffect(() => {
    if (curSongId) {
      setPlayer(true)
    }
  }, [])

  return (
    <div className="app">
      <div className="flex items-start h-screen">
        <SidebarLeft className={`${player ? "h-[calc(100%-90px)]" : "h-full"}`} />
        <Header className={`${listSongsRight ? 'right-0 ease-in-out duration-500 transition-all' : 'right-0 1591:right-[330px] ease-in-out duration-500 transition-all'}`} />
        <div className={`grow relative w-[calc(100%-570px)] min-w-[768px] h-full ${player ? "pb-[90px]" : "pb-0"} ${listSongsRight ? "mr-0 ease-in-out duration-500 transition-all" : "mr-0 1591:mr-[330px] ease-in-out duration-500 transition-all"}`}>
          <MainPage />
        </div>
        <div className="fixed bottom-0 w-full max-h-[70px] z-[120]">
          <SidebarRight className={`${listSongsRight ? "translate-x-full ease-in-out duration-500 transition-all" : "translate-x-0 ease-in-out duration-500 transition-all"}`} />
          {curSongId && <Player
            onHandleToggleListSongs={() => setListSongsRight(!listSongsRight)}
            classNameIconListRight={`${listSongsRight ? "" : "bg-purplePrimary"}`}
          />}
        </div>
      </div>
    </div>
  );
}

export default App;

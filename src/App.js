import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Player from './components/Player';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import MainPage from './public/MainPage';
import * as actions from './store/actions';

function App() {

  const [listSongsRight, setListSongsRight] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome())
  })

  return (
    <div className="app">
      <div className="flex items-start h-screen">
        <SidebarLeft />
        <Header className={`${listSongsRight ? 'right-0 ease-in-out duration-500 transition-all' : 'right-0 1591:right-[330px] ease-in-out duration-500 transition-all'}`} />
        <div className={`grow relative w-[calc(100%-570px)] min-w-[768px] h-full pb-[90px] ${listSongsRight ? "mr-0 ease-in-out duration-500 transition-all" : "mr-0 1591:mr-[330px] ease-in-out duration-500 transition-all"}`}>
          <MainPage />
        </div>
        <div className="fixed bottom-0 w-full max-h-[70px] z-[120]">
          <SidebarRight className={`${listSongsRight ? "translate-x-full ease-in-out duration-500 transition-all" : "translate-x-0 ease-in-out duration-500 transition-all"}`} />
          <Player
            onHandleToggleListSongs={() => setListSongsRight(!listSongsRight)}
            classNameIconListRight={`${listSongsRight ? "" : "bg-purplePrimary"}`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

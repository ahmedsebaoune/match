import {InertiaLink, usePage} from "@inertiajs/inertia-react"
import {useState, useEffect} from 'react'
import Table from "../components/table";
import GroupeTable from "../components/groupeTable";

import championsleagueBack from "../../img/championsleagueBack.png";
import premierleagueBack from "../../img/premierleagueBack.jpg";
import laligaBack from "../../img/laligaBack.png";

//leagues data
import PremierLeague from "../tables/premierLeague";
import LaLiga from "../tables/laLiga";
import ChampionsLeague from "../tables/championsLeague";

import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';

export default function AppLayout({children}) {
    const {name: pl, table: plTable} = PremierLeague();
    const {name: liga, table: ligaTable} = LaLiga();
    const {name: ChName, table: ChTable} = ChampionsLeague();

    const [back, setBack] = useState([
        premierleagueBack,
        laligaBack,
        championsleagueBack,
    ]);

    const [show, setShow] = useState(1);
    const [leagues, setLeagues] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(show);
            setShow((show) => {
                return (show % leagues) + 1;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <div
                className="container"
                style={{background: `url(${back[show - 1]})`}}
            >
                <div className="tables">
                    <Splide
                        hasTrack={false}
                        options={{
                            rewind: true,
                            width: 1000,
                            gap: '2rem',
                            autoplay:false,
                            pagination:false,
                        }}>
                        <SplideTrack>
                            <SplideSlide>
                                <Table league={liga} table={ligaTable} show={show} i={2}/>
                            </SplideSlide>
                            <SplideSlide>
                                <Table league={pl} table={plTable} show={show} i={1}/>
                            </SplideSlide>
                            <SplideSlide>
                                <GroupeTable league={ChName} table={ChTable} show={show} i={3}/>
                            </SplideSlide>
                        </SplideTrack>
                        <div className="splide__arrows"/>

                    </Splide>
                </div>
            </div>
            <div className="cont">
            </div>
            <div className="inner">
                <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut beatae cupiditate ea
                    facilis libero maxime reprehenderit voluptate. Ipsam, natus, voluptates. Culpa modi nisi non nulla,
                    officia omnis rem veniam.
                </div>
            </div>
            {/*
      <Table league={pl} table={plTable} />;
      <Table league={liga} table={ligaTable} />
      <GroupeTable league={ChName} table={ChTable} /> */}
        </div>
    );
}

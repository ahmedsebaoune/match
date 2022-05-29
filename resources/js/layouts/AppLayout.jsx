import {InertiaLink, Link, usePage} from "@inertiajs/inertia-react"
import {useState, useEffect} from 'react'
import Table from "../components/table";
import GroupeTable from "../components/groupeTable";
import MatchesTab from "../components/matchesTab";

import championsleagueBack from "../../img/championsleagueBack.png";
import premierleagueBack from "../../img/premierleagueBack.jpg";
import laligaBack from "../../img/laligaBack.png";

//leagues data
import PremierLeague from "../tables/premierLeague";
import LaLiga from "../tables/laLiga";
import ChampionsLeague from "../tables/championsLeague";

import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';

export default function AppLayout(props,{children}) {
    const {name: pl, table: plTable} = PremierLeague();
    const {name: liga, table: ligaTable} = LaLiga();
    const {name: ChName, table: ChTable} = ChampionsLeague();

    const Emb = () => (<div>
        <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/75359457&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        <div
            style={{fontSize: '10px',color: '#cccccc', lineBreak: 'anywhere',wordBreak: 'normal',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis', fontFamily: 'Interstate',fontWeight: 100}}>
            <Link href="https://soundcloud.com/antovolk" title="antovolk" target="_blank"
                  style={{color: "#cccccc" ,textDecoration: 'none'}}>antovolk</Link> ·
            <Link
                href="https://soundcloud.com/antovolk/hans-zimmer-rise-aurora-edit"
                title="Hans Zimmer - Rise (Aurora Edit) - The Dark Knight Rises" target="_blank"
                style={{color: "#cccccc",textDecoration: "none"}}>Hans Zimmer - Rise (Aurora Edit) - The Dark Knight
                Rises</Link>
        </div>
    </div>);
    const [back, setBack] = useState([
        premierleagueBack,
        laligaBack,
        championsleagueBack,
    ]);

    const [show, setShow] = useState(1);
    const [leagues, setLeagues] = useState(3);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log(show);
    //         setShow((show) => {
    //             return (show % leagues) + 1;
    //         });
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, []);
    console.log(children,"ssss")

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
                            autoplay: false,
                            pagination: false,
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
                <MatchesTab>
                    <Emb/>
                    <Link preserveState href={props.aboutPage} >Click me</Link>

                </MatchesTab>
            </div>
            <div className="cont">
            </div>
            <div className="inner">
                <div className="content">
                    {children}
                </div>
            </div>
            {/*
      <Table league={pl} table={plTable} />;
      <Table league={liga} table={ligaTable} />
      <GroupeTable league={ChName} table={ChTable} /> */}
        </div>
    );
}

import React from "react";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import ChampionsMatch from './matches/championsMatch';
import PlMatch from './matches/plMatch';
import LaLigaMatch from './matches/laLigaMatch';
import MatchesPerDay from './matchesPerDay';
const MatchesTab = (props) => {
    const matches = [
        {
            "id": 'LaLiga',
            "league": 2014,
            "utcDate": "20/5/2022 19:00:00",
            "status": "SCHEDULED",
            'homeName':"MUN",
            'awayName':"RM",
        },
        {
            "id": 'LaLiga',
            "league": 'LaLiga',
            "utcDate": "20/5/2022 19:00:00",
            "status": "SCHEDULED",
            'homeName':"MUN",
            'awayName':"RM",
        },
        {
            "id": 'LaLiga',
            "league": 2014,
            "utcDate": "20/5/2022 19:00:00",
            "status": "SCHEDULED",
            'homeName':"MUN",
            'awayName':"RM",
        },
        {
            "id": 'LaLiga',
            "league": 2014,
            "utcDate": "20/5/2022 19:00:00",
            "status": "SCHEDULED",
            'homeName':"MUN",
            'awayName':"RM",
        },


    ]
    return (
        <div className="matchesTab">
            <Splide
                hasTrack={false}
                className="matchContainer"
                options={{
                    rewind: true,
                    gap: '2rem',
                    autoplay: false,
                    pagination: false,
                    perPage: 1
                }}>
                <SplideTrack>
                    <SplideSlide className="championsTab center">
                        <div className="matchList">
                            <MatchesPerDay
                                league="LaLiga"
                                matches={matches}
                            />
                            {props.children}
                            {/*<ChampionsMatch*/}
                            {/*    homeName="MUN"*/}
                            {/*    awayName="RM"*/}
                            {/*    status="SCHEDULED"*/}
                            {/*    utcDate="23h"*/}
                            {/*/>*/}
                            {/*<PlMatch*/}
                            {/*    homeName="MUN"*/}
                            {/*    awayName="MCI"*/}
                            {/*    status="SCHEDULED"*/}
                            {/*    utcDate="23h"*/}
                            {/*/>*/}
                            {/*<LaLigaMatch*/}
                            {/*    homeName="MUN"*/}
                            {/*    awayName="MCI"*/}
                            {/*    status="SCHEDULED"*/}
                            {/*    utcDate="23h"*/}
                            {/*/>*/}
                        </div>
                    </SplideSlide>
                    <SplideSlide className="laligaTab">
                        <div>
                            cha3ra wndir avc
                        </div>
                    </SplideSlide>
                    <SplideSlide className="pltab">
                        <div>
                            ya ma w dawha fel mercedes
                        </div>
                    </SplideSlide>
                </SplideTrack>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev"><i className="fa fa-caret-right"
                                                                             aria-hidden="true"/></button>
                    <button className="splide__arrow splide__arrow--next"><i className="fa fa-caret-right"/></button>
                </div>
            </Splide>
        </div>
    )
}

export default MatchesTab;

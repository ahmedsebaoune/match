import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";

const GroupeTable = ({league, table, show, i}) => {
    return (
        <div
            className={`groups ${league.toLowerCase().split(" ").join("")} ${
                show === i ? "show" : "hide"
            }`}
        >
            <h2>{league}</h2>
            <div className="groupsTable" style={{padding:"20px"}}>
                <Splide
                    hasTrack={false}
                    options={{
                        direction: "ttb",
                        height: '90vh',
                        perPage: 4,
                        autoplay: false,
                    }}>
                    <SplideTrack>

                        {Object.entries(table).map((group) => {
                            return (
                                <SplideSlide>
                                    <table>
                                        <caption>Groupe {group[0]}</caption>
                                        <tbody>
                                        {group[1].map((club, pos) => {
                                            return (
                                                <tr>
                                                    <th>{pos + 1}</th>
                                                    <td>{club}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </SplideSlide>
                            );
                        })}
                    </SplideTrack>
                </Splide>
            </div>
        </div>
    );
};

export default GroupeTable;

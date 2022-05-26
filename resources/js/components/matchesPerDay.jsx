import ChampionsMatch from "./matches/championsMatch";
import LaLiga from "../tables/laLiga";


const MatchesPerDay =(props) => {
    const appearLeague = () =>{
        switch(props.league) {
            case 'LaLiga':
                return (
                   console.log( props.matches.forEach(match => {
                            return(
                        <LaLiga
                            homeName={match.homeName}
                            awayName={match.awayName}
                            status={match.status}
                            utcDate={match.utcDate}
                        />
                            )})
                ))
                break;
            case 'PL':
                return (
                    props.matches.forEach(match =>{
                        return(
                        <PlMatch
                            homeName={match.homeName}
                            awayName={match.awayName}
                            status={match.status}
                            utcDate={match.utcDate}
                        />)
                    })
                )
                break;
            case 'Champions':
                return (
                    props.matches.forEach(match =>{
                        <ChampionsMatch
                            homeName={match.homeName}
                            awayName={match.awayName}
                            status={match.status}
                            utcDate={match.utcDate}
                        />
                    })
                )
            // code
        }
    }
    return (
    <div className='matches_per_day'>
        {appearLeague()}
    </div>
    )


}

export default MatchesPerDay;

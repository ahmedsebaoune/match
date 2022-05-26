
const LaLigaMatch = (props) =>{
    return (
        <div className="liga-match">
            <div className="score">
                <span className="nameHome">{props.homeName}</span>
                <span className="ScoreHome">{props.homeScore}</span>
                <span>-</span>
                <span className="scoreAway">{props.awayScore}</span>
                <span className="nameAway">{props.awayName}</span>
            </div>
            <div className="time">
                {props.status == 'SCHEDULED' ? props.utcDate : props.status}
            </div>
        </div>

    )
}

export default LaLigaMatch;

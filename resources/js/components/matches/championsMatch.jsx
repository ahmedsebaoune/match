const ChampionsMatch =(props) => {
    return (
        <div className="championsMatch center">
            <div className="time">
                <img className="championsColor" src="../../img/championsLogo.png" alt=""/>
                <span>{props.status =='SCHEDULED' ? props.utcDate : props.status}</span>
            </div>
            <div className="scoreMatch">
                <div className="teamDetailLeft">
                    <div className="nameHome"><p>{props.homeName}</p></div>
                    <div className="score">{props.homeScore}</div>
                </div>
                <div className="teamDetailRight">
                    <div className="score">{props.awayScore}</div>
                    <div className="nameAway"><p>{props.awayName}</p></div>
                </div>
            </div>
        </div>

    )
}

export default ChampionsMatch;

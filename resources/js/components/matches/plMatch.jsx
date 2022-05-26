const PlMatch = (props) => {
    return (
        <div class="pl-match">
            <div class="team home">
                <div class="color"></div>
                <div class="name"><span>{props.homeName}</span></div>
            </div>
            <div class="goals" style={props.status == 'SCHEDULED' ? {width: "30px"} : {}}>
                {props.status == 'SCHEDULED' ?
                    '':
                    <div>
                        <div className="goal home"><span>{props.homeScore}</span></div>
                        <div className="divider"><span>-</span></div>
                        <div className="goal away"><span>{props.awayScore}</span></div>
                    </div>}

            </div>
            <div class="time"><span> <span class="minute">{props.status == 'SCHEDULED' ? props.utcDate : props.status }</span></span>
            </div>
            <div class="team away">
                <div class="color"></div>
                <div class="name"><span>{props.awayName}</span></div>
            </div>
        </div>

    )
}

export default PlMatch;

const Table = ({league, table, show, i}) => {
    //framer

    return (
        <div
            className={`table ${league.toLowerCase().split(" ").join("")}`}
        >
            <h2>{league}</h2>
            <div className="beforeTab">
                <div className="plLine"></div>
                <div style={{overflow: "hidden"}}>
                    <table>
                        <tbody>
                        {table.map((club, position) => {
                            return (
                                <tr>
                                    <th>{position + 1}</th>
                                    <td>{club}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;

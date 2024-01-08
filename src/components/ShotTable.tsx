import React, {useEffect, useState} from "react";
import store from "../store/store";

const ShotTable = () => {
    const [shots, setShots] = useState(store.getState().shots);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setShots(store.getState().shots);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="box">
            <h1>Предыдущие выстрелы</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Владелец</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Попадание</th>
                        <th>Дата создания</th>
                        <th>Время выполнения, нс</th>
                    </tr>
                </thead>
                <tbody>
                    {shots.map((shot, index) => (
                        <tr key={index}>
                            <td>{shot.id}</td>
                            <td>{shot.ownerName}</td>
                            <td>{shot.xString}</td>
                            <td>{shot.yString}</td>
                            <td>{shot.rString}</td>
                            <td>{shot.hit ? 'ДА' : 'НЕТ'}</td>
                            <td>{shot.creationDateTime}</td>
                            <td>{shot.timeElapsedNs}</td>
                            {/* Add other cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShotTable
import React, { useState } from 'react';
import TextNumberInput from "../components/TextNumberInput";
import Header from "../components/Header";
import ShotForm from "../components/ShotForm";

const MainPage: React.FC = () => {
    return (
        <div>
            <Header
                labDiscipline="Веб-программирование"
                labNumber={4}
                studentName="Чайкин Вадим Константинович"
                studentGroup="P3224"
                studentNumber="322864"
            />
            <ShotForm/>
        </div>
    )
}

export default MainPage
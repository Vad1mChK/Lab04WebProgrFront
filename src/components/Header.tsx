import React from "react";

type HeaderProps = {
    labDiscipline: string;
    labNumber: number;
    studentName: string;
    studentGroup: string;
    studentNumber: string;
};

const Header: React.FC<HeaderProps> = ({
   labDiscipline,
   labNumber,
   studentName,
   studentGroup,
   studentNumber
}) => {
    return (
        <div className="box">
            <h1>Лабораторная работа No. {labNumber} по дисциплине &laquo;{labDiscipline}&raquo;</h1>
            <p style={{
                textAlign: "center"
            }}><b>Выполнил</b>: <em>студент</em> {studentName}, {studentGroup}, #{studentNumber}</p>
        </div>
    );
};

export default Header;

import React, { useState } from 'react';
import TextNumberInput from "../components/TextNumberInput";

const MainPage: React.FC = () => {
    return (
        <TextNumberInput min={-3} max={5} htmlId='x' htmlName='x'/>
    )
}

export default MainPage
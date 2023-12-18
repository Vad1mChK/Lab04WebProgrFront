import React, { useState } from "react";
// @ts-ignore
import isNumber from 'is-number';
// @ts-ignore
import BigNumber from 'bignumber.js';

interface TextNumberInputProps {
    min: number;
    max: number;
    htmlId: string;
    htmlName: string;
}

const TextNumberInput: React.FC<TextNumberInputProps> = ({ min, max, htmlId, htmlName }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        let newIsValid = true;
        if (!isNumber(newValue)) newIsValid = false;
        const numberValue = parseFloat(newValue);
        if (!isInRange(newValue, min, max)) newIsValid = false;

        setValue(newValue);
        setIsValid(newIsValid);
        console.log(newValue, newIsValid)
    };

    return (
        <p>
            <label htmlFor="x">{htmlName}:</label>
            <input
                type="text"
                id={htmlId}
                name={htmlName}
                placeholder={`(${min}..${max})`}
                value={value}
                onChange={handleChange}
                className={!isValid ? "error" : ""}
            />
        </p>
    );
};

const isInRange = (value: string, min: number, max: number): boolean => {
    const numValue = new BigNumber(value);
    const minVal = new BigNumber(min.toString());
    const maxVal = new BigNumber(max.toString());
    return !numValue.isNaN() && numValue.isGreaterThan(minVal) && numValue.isLessThan(maxVal);
};

export default TextNumberInput;
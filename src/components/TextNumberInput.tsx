import React, {ChangeEventHandler, useEffect, useState} from "react";
// @ts-ignore
import isNumber from 'is-number';
// @ts-ignore
import BigNumber from 'bignumber.js';

interface TextNumberInputProps {
    min: number;
    max: number;
    htmlId: string;
    htmlName: string;
    positive?: boolean;
    onChange?: (value: string) => void
    onValidityChange?: (isValid: boolean) => void;
}

const TextNumberInput: React.FC<TextNumberInputProps> = ({
    min,
    max,
    htmlId,
    htmlName,
    positive = false,
    onChange = () => {},
    onValidityChange = () => {}
}) => {
    const [value, setValue] = useState('');
    const [isValid, setValid] = useState(true);

    useEffect(() => {
        setValue(localStorage.getItem(htmlId) || '');
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        let newIsValid = true;
        if (!isNumber(newValue)) newIsValid = false;
        const numberValue = parseFloat(newValue);
        if (!isInRange(newValue, min, max, positive)) newIsValid = false;

        setValue(newValue);
        setValid(newIsValid);
        console.log(newValue, newIsValid)
        if (newIsValid) onChange(newValue)

        setValid(newIsValid);
        if (newIsValid) onChange(newValue);
        onValidityChange(newIsValid);
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
                aria-invalid={!isValid ? "true" : "false"} // Add aria-invalid attribute
            />
        </p>
    );
};

const isInRange = (value: string, min: number, max: number, positive: boolean): boolean => {
    const numValue = new BigNumber(value);
    const minVal = new BigNumber(min.toString());
    const maxVal = new BigNumber(max.toString());
    return !numValue.isNaN() && numValue.isGreaterThan(minVal) && numValue.isLessThan(maxVal) && !(
        positive && numValue.isLessThanOrEqualTo(new BigNumber('0'))
    );
};

export default TextNumberInput;
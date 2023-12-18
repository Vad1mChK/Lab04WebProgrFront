import React, { useState, useEffect } from "react";
import { ShootingGallery } from "./ShootingGallery";
import TextNumberInput from "./TextNumberInput";
import Layout, { determineLayout } from "../util/Layout";

const ShotForm = () => {
    const [layout, setLayout] = useState<Layout>(determineLayout(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setLayout(determineLayout(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getGallerySize = (): number => {
        switch(layout) {
            case Layout.MOBILE:
                return 267 // Or any size you prefer for mobile
            case Layout.TABLET:
                return 350; // Tablet size
            default:
                return 400; // Desktop size
        }
    };

    return (
        <div className="box centering">
            <h1>Тир</h1>
            <ShootingGallery size={getGallerySize()}/>
            <form method="POST" action="http://localhost:19200/lab04-1.0-SNAPSHOT/api/shot">
                <TextNumberInput min={-3} max={5} htmlId="x" htmlName="x"/>
                <TextNumberInput min={-5} max={3} htmlId="y" htmlName="y"/>
                <TextNumberInput min={-3} max={5} htmlId="r" htmlName="r"/>
                <div className="button-group">
                    <input type="submit"/>
                    <input type="reset" title="Внимание: очищены будут только выстрелы, принадлежащие вам."/>
                </div>
            </form>
        </div>
    );
};

export default ShotForm;

import React from 'react';
import { useParams } from "react-router-dom";
import errorPages from '../resources/text/errorPages.json';
import ErrorPageData from "../util/ErrorPageData";

const ErrorPage = () => {
    const errorCode = useParams()
    if (!Object.keys(errorPages).includes(errorCode.toString())) {
        return (
            <div>
                <h1>XXX Unknown Error</h1>
            </div>
        )
    }
    // @ts-ignore
    const errorPageData = errorPages[errorCode] as ErrorPageData

    return (
        <div>
            <h1>{errorPageData.statusCode}</h1>
            {/* Additional error handling based on errorCode */}
        </div>
    );
};

export default ErrorPage;
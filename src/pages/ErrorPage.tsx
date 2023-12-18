import React from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const { errorCode } = useParams<{ errorCode: string }>();

    return (
        <div>
            <h1>Error Page</h1>
            <p>Error Code: {errorCode}</p>
            {/* Additional error handling based on errorCode */}
        </div>
    );
};

export default ErrorPage;
import React from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
    // console.log('staticContext',staticContext):{}
    staticContext.notFound = true;
    return <h1>Ooops, route not found.</h1>;
};


export default {
    component: NotFoundPage
}
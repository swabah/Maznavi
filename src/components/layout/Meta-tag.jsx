import React from 'react'
import { Helmet } from 'react-helmet'

function Metatag({ title, description, url, imageUrl, children }) {
    return (
        <>
            <Helmet>
                {/* Title */}
                <title>മസ്നവി 💛(60k)</title>
                {/* meta SEO Tag */}
                <meta name={title} content={description || "Exploring Lifе's Corе: Maznavi._ Guidеs You to Essеncе"} />
                <meta property="og:url" content={url} />
                {/* <meta property="og:type" content="article" /> */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="twitter:card" content={imageUrl} />
            </Helmet>
            {children}
        </>
    )
}

export default Metatag
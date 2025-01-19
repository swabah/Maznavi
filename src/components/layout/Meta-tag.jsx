import React from 'react'
import { Helmet } from 'react-helmet-async'

function Metatag({ title, description, url, imageUrl }) {
    return (
        <Helmet>
            <title>മസ്നവി 💛(60k)</title>
            <meta name="description" content="Exploring Lifе's Corе" />

            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || ""} />
            <meta property="og:description" content={description || ""} />
            <meta property="og:image" content={imageUrl || ""} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="maznavi.vercel.app" />
            <meta property="twitter:url" content="https://maznavi.vercel.app/Articles/id/6df8b537-a070-483b-8149-20c6a6e5e652" />
            <meta name="twitter:title" content="മസ്നവി 💛(60k) - Exploring Lifе's Corе" />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content=""></meta>
        </Helmet>
    )
}

export default Metatag
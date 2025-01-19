import React from 'react'
import { Helmet } from 'react-helmet'

function Metatag({ title, description, url, imageUrl, children }) {
    return (
        <>
            <Helmet>
                <title>{title || "മസ്നവി 💛(60k)"}</title>
                {description && <meta name="മസ്നവി" content={description} />}
                {url && <meta property="og:url" content={url} />}
                {title && <meta property="og:title" content={title} />}
                {description && <meta property="og:description" content={description} />}
                {imageUrl && <meta property="og:image" content={imageUrl} />}
                {imageUrl && <meta name="twitter:card" content={imageUrl} />}
            </Helmet>
            {children}
        </>
    )
}

export default Metatag
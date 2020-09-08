import React from "react";

import { Helmet } from "react-helmet-async";

function Layout(props) {
    return (
        <div>
            <main>
                <Helmet>
                    <meta
                        property="og:url"
                        content={`https://ahlgreen.net/${props.slug}`}
                    />

                    <link
                        rel="canonical"
                        href={`https://ahlgreen.net/${props.slug}`}
                    />

                    {props.description ? (
                        <meta name="description" content={props.description} />
                    ) : null}

                    {props.description ? (
                        <meta
                            name="og:description"
                            content={props.description}
                        />
                    ) : null}

                    <meta
                        name="keywords"
                        content={
                            "jam,jam stack,website portfolio,fullstack,full-stack,pwa,progressive web app,portfolio,web developer,website creator,responsive,responsive web design,responsive website,web application,application development,web application development,programmer,developer,css,html,gulp,parcel,babel,node,npm,express,ejs,git,github,mysql,semantics,semantic html,seo,denmark,danmark,frameworks,react framework,javascript,js,madcreativity,alexander,ahlgreen,madsen,python,c++,cpp,c#,csharp,node,react,reactjs,react.js,full stack,fullstack,front-end,frontend,frontend developer,front-end developer,back-end,backend,backend developer,back-end developer,website developer,website" +
                            (props.keywords && props.keywords.length > 0
                                ? "," + props.keywords.join(",")
                                : "")
                        }
                    />

                    <title>
                        Alexander Ahlgreen | Web Developer - {props.title}
                    </title>
                </Helmet>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
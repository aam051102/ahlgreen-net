import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Helmet } from "react-helmet-async";

function Layout(props) {
    return (
        <div>
            <main>
                <Helmet>
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
                            "jam,jam stack,website portfolio,pwa,progressive web app,portfolio,web developer,website creator,responsive,responsive web design,responsive website,web application,application development,web application development,programmer,developer,css,html,gulp,parcel,babel,node,npm,express,ejs,git,github,mysql,semantics,semantic html,seo,denmark,danmark,frameworks,react framework,javascript,js,madcreativity,alexander,ahlgreen,madsen,python,c++,cpp,c#,csharp,node,react,reactjs,react.js,full stack,fullstack,front-end,frontend,frontend developer,front-end developer,back-end,backend,backend developer,back-end developer,website developer,website" +
                            (props.keywords && props.keywords.length > 0
                                ? "," + props.keywords.join(",")
                                : "")
                        }
                    />

                    <title>Alexander Ahlgreen - {props.title}</title>
                </Helmet>
                {props.children}
            </main>

            {/*<Footer />*/}
        </div>
    );
}

export default Layout;

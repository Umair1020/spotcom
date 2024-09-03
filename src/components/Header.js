import React from 'react'

const Header = () => {
    return (
        <div className='mx-auto d-flex'>
            <header
                className="header opaque-header"
                data-bgcolor-subpage=""
                data-homepage="true"
                data-searc-page="/content/nexus/en/search/?q="
                data-theme="light"
                role="header"
                style={{
                    '--initHeaderHeight': '110px',
                    top: '0px'
                }}
            >
                <div className="container">
                    <div className="logo">
                        <a
                            href="/en/"
                            target="_self"
                        >
                            <img
                                alt=""
                                src="/logo.png"
                            />
                        </a>
                        <span />
                    </div>
                    <nav
                        className="navigation"
                        role="navigation"
                    >
                        <ul>
                            <li className="column-3">
                                <a
                                    style={{}}
                                    target="_self"
                                >
                                    Services
                                </a>
                                <div
                                    className="dropdown-subnav"
                                    style={{
                                        display: 'none'
                                    }}
                                >
                                    <div className="col ">
                                        <a
                                            href="/applications/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Applications
                                        </a>
                                        <a
                                            href="/ai/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Artificial Intelligence
                                        </a>
                                        <a
                                            href="/business-process/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Business Process
                                        </a>
                                        <a
                                            href="/cloud/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Cloud
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/consulting/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Consulting
                                        </a>
                                        <a
                                            href="/cybersecurity/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Cybersecurity
                                        </a>
                                        <a
                                            href="/analytics/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Data & Analytics
                                        </a>
                                        <a
                                            href="/digital/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Digital Experiences
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/engineering/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Engineering
                                        </a>
                                        <a
                                            href="/sustainability/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Sustainability
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="column-4">
                                <a
                                    style={{}}
                                    target="_self"
                                >
                                    Industries
                                </a>
                                <div
                                    className="dropdown-subnav"
                                    style={{
                                        display: 'none'
                                    }}
                                >
                                    <div className="col ">
                                        <a
                                            href="/aerospace-and-defense/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Aerospace & Defense
                                        </a>
                                        <a
                                            href="/automotive/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Automotive
                                        </a>
                                        <a
                                            href="/banking/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Banking
                                        </a>
                                        <a
                                            href="/capital-markets/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Capital Markets
                                        </a>
                                        <a
                                            href="/communications/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Communications
                                        </a>
                                        <a
                                            href="/consumer-electronics/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Consumer Electronics
                                        </a>
                                        <a
                                            href="/consumer-packaged-goods/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Consumer Packaged Goods
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/education/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Education
                                        </a>
                                        <a
                                            href="/engineering-construction-operations/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Engineering Construction & Operations
                                        </a>
                                        <a
                                            href="/healthcare/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Healthcare
                                        </a>
                                        <a
                                            href="/process-and-industrial-manufacturing/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Industrial & Process Manufacturing
                                        </a>
                                        <a
                                            href="/insurance/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Insurance
                                        </a>
                                        <a
                                            href="/pharmaceutical-and-life-sciences/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Life Sciences & Pharma
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/new-age-media/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Media & Info Services
                                        </a>
                                        <a
                                            href="/medical-devices/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Medical Devices
                                        </a>
                                        <a
                                            href="/natural-resources/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Natural Resources
                                        </a>
                                        <a
                                            href="/network-edge-providers/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Network & Edge Providers
                                        </a>
                                        <a
                                            href="/oil-and-gas/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Oil & Gas
                                        </a>
                                        <a
                                            href="/platforms-and-software-products/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Platforms & Software Products
                                        </a>
                                        <a
                                            href="/professional-services/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Professional Services
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/public-sector/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Public Sector
                                        </a>
                                        <a
                                            href="/retail/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Retail
                                        </a>
                                        <a
                                            href="/semiconductors/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Semiconductors
                                        </a>
                                        <a
                                            href="/travel-and-transportation/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Transportation & Services
                                        </a>
                                        <a
                                            href="/utilities/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Utilities
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="column-0">
                                <a
                                    href="/consulting/"
                                    style={{}}
                                    target="_self"
                                >
                                    Insights
                                </a>
                            </li>
                            <li className="column-3">
                                <a
                                    style={{}}
                                    target="_self"
                                >
                                    About Wipro
                                </a>
                                <div
                                    className="dropdown-subnav"
                                    style={{
                                        display: 'none'
                                    }}
                                >
                                    <div className="col ">
                                        <a
                                            href="/about-us/"
                                            style={{}}
                                            target="_self"
                                        >
                                            About Us
                                        </a>
                                        <a
                                            href="/about-us/ambitions-realized/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Ambitions Realized
                                        </a>
                                        <a
                                            href="/analyst-speak/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Analyst Reports
                                        </a>
                                        <a
                                            href="/about-us/awards-and-recognitions/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Awards and Recognitions
                                        </a>
                                        <a
                                            href="/blogs/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Blogs
                                        </a>
                                        <a
                                            href="/case-studies/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Case Studies
                                        </a>
                                        <a
                                            href="/corporate-sustainability/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Corporate Sustainability
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/about-us/diversity-equity-and-inclusion/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Diversity, Equity and Inclusion
                                        </a>
                                        <a
                                            href="/events/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Events
                                        </a>
                                        <a
                                            href="/investors/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Investors
                                        </a>
                                        <a
                                            href="/lab45/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Lab45
                                        </a>
                                        <a
                                            href="/leadership/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Leadership
                                        </a>
                                        <a
                                            href="/locations/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Locations
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <a
                                            href="/newsroom/"
                                            style={{}}
                                            target="_self"
                                        >
                                            News
                                        </a>
                                        <a
                                            href="/partner-ecosystem/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Partner Ecosystem
                                        </a>
                                        <a
                                            href="/about-us/privacy-at-wipro/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Privacy at Wipro
                                        </a>
                                        <a
                                            href="/about-us/supplier-diversity/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Supplier Diversity
                                        </a>
                                        <a
                                            href="/about-us/the-story-of-wipro/"
                                            style={{}}
                                            target="_self"
                                        >
                                            The Story of Wipro
                                        </a>
                                        <a
                                            href="/ventures/"
                                            style={{}}
                                            target="_self"
                                        >
                                            Wipro Ventures
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="column-0">
                                <a
                                    href="https://careers.wipro.com/careers-home/"
                                    style={{}}
                                    target="_blank"
                                >
                                    Careers
                                </a>
                            </li>
                            <li className="column-0">
                                <a
                                    data-hash="#contactUs"
                                    href="javascript:;"
                                    style={{}}
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="extraHeaderOptions">
                        <div className="geographies">
                            <a className="geo">
                                <img
                                    alt=""
                                    src="/content/dam/nexus/en/country-flag/flag_none.svg"
                                />
                            </a>
                            <a className="mobileGeo">
                                <img
                                    alt=""
                                    src="/content/dam/nexus/en/country-flag/flag_none.png"
                                />
                                Locations
                            </a>
                            <div className="dropdown-subnav">
                                <div className="col hasCategory">
                                    <div className="countryContainer">
                                        <a className="catTitle">
                                            America
                                        </a>
                                    </div>
                                    <div className="accordian">
                                        <div className="countryContainer">
                                            <a
                                                href="/en-BR/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Brazil
                                            </a>
                                            <div className="geoLinkContainer">
                                                <a
                                                    className="geoLinks"
                                                    href="/en-BR/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    En
                                                </a>
                                                <a
                                                    className="geoLinks"
                                                    href="/pt-BR/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Po
                                                </a>
                                            </div>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-CA/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Canada
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-latam/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Latam
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-MX/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Mexico
                                            </a>
                                            <div className="geoLinkContainer">
                                                <a
                                                    className="geoLinks"
                                                    href="/en-MX/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    En
                                                </a>
                                                <a
                                                    className="geoLinks"
                                                    href="/es-MX/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Sp
                                                </a>
                                            </div>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-US/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                United States
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col hasCategory">
                                    <div className="countryContainer">
                                        <a
                                            className="catTitle"
                                            href="/en-EU/"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Europe
                                        </a>
                                        <div className="geoLinkContainer">
                                            <a
                                                className="geoLinks"
                                                href="/en-EU/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                En
                                            </a>
                                            <a
                                                className="geoLinks"
                                                href="/de-EU/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                De
                                            </a>
                                        </div>
                                    </div>
                                    <div className="accordian">
                                        <div className="countryContainer">
                                            <a
                                                href="/en-benelux/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Benelux
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-DE/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Germany & Austria
                                            </a>
                                            <div className="geoLinkContainer">
                                                <a
                                                    className="geoLinks"
                                                    href="/en-DE/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    En
                                                </a>
                                                <a
                                                    className="geoLinks"
                                                    href="/de-DE/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    De
                                                </a>
                                            </div>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-nordic/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Nordic
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-Southern-EU/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Southern Europe
                                            </a>
                                            <div className="geoLinkContainer">
                                                <a
                                                    className="geoLinks"
                                                    href="/en-Southern-EU/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    En
                                                </a>
                                                <a
                                                    className="geoLinks"
                                                    href="/fr-Southern-EU/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Fr
                                                </a>
                                            </div>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-UKI/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                United Kingdom & Ireland
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col hasCategory">
                                    <div className="countryContainer">
                                        <a className="catTitle">
                                            Asia Pacific
                                        </a>
                                    </div>
                                    <div className="accordian">
                                        <div className="countryContainer">
                                            <a
                                                href="/en-asean/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Asean
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-ANZ/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Australia & New Zealand
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-CN/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                China
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-JP/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Japan
                                            </a>
                                            <div className="geoLinkContainer">
                                                <a
                                                    className="geoLinks"
                                                    href="/en-JP/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    En
                                                </a>
                                                <a
                                                    className="geoLinks"
                                                    href="/ja-JP/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Jp
                                                </a>
                                            </div>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-KR/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Korea
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-TW/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Taiwan
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col hasCategory">
                                    <div className="countryContainer">
                                        <a className="catTitle">
                                            India & Middle East
                                        </a>
                                    </div>
                                    <div className="accordian">
                                        <div className="countryContainer">
                                            <a
                                                href="/en-IN/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                India
                                            </a>
                                        </div>
                                        <div className="countryContainer">
                                            <a
                                                href="/en-ME/"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                Middle East
                                            </a>
                                        </div>
                                        <div className="col hasCategory">
                                            <div className="countryContainer">
                                                <a
                                                    className="catTitle"
                                                    href="/en-africa/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Africa
                                                </a>
                                            </div>
                                            <div className="countryContainer">
                                                <a
                                                    className="global-site catTitle"
                                                    href="/en/"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    Global Site
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hamburger">
                            <span />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
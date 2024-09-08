import React, { useEffect } from 'react'
import $ from 'jquery'
window.jquery = window.$ = $

const Header = () => {
    useEffect(() => {
        const handleDocumentReady = () => {
            const b = (a, c) => {
                if (a === "open") {
                    $("header").addClass("dropdown-open active");
                    $("header .geographies .dropdown-subnav").fadeOut();
                    $("header .geographies > a").removeClass("active");
                    c.find(".dropdown-subnav").fadeIn(300).css({ display: "flex" });
                } else if (a === "close") {
                    $("header").removeClass("dropdown-open active");
                    c.find(".dropdown-subnav").hide();
                }
            };

            $(".header").each(function () {
                this.style.setProperty("--initHeaderHeight", $(this).outerHeight() + "px");
            });

            $("[data-hash]").on("click", function (e) {
                if ($(window).width() <= 1024) {
                    $("header .hamburger").click();
                }

                const hash = $(this).attr("data-hash");
                if (typeof hash === "string" && hash.length > 0 && document.getElementById(hash.substring(1))) {
                    e.preventDefault();
                    const offset = $(hash).offset().top;
                    if ($("header").hasClass("navOpen")) {
                        $("header").removeClass("navOpen");
                    }
                    setTimeout(() => {
                        $("html, body").css({ overflow: "unset" }).animate({ scrollTop: offset }, 1000);
                    }, 500);
                }
            });

            if ($(window).width() <= 1024) {
                $(".navigation").slideUp();
            }

            $("header .hamburger").on("click", () => {
                if ($("body").hasClass("navOpen")) {
                    $("html, body").removeClass("hideOverflow");
                    $("body").removeClass("navOpen");
                    $("header .navigation").slideUp();
                    $("header .dropdown-subnav").hide().slideUp();
                    $(".navigation > ul > li").removeClass("active");
                } else {
                    $("html, body").addClass("hideOverflow");
                    $("body").addClass("navOpen");
                    $("header .navigation").slideDown();
                    if ($("body").hasClass("searchOpen")) {
                        $("body").removeClass("searchOpen").find("header");
                        $("header .searchPopup").css({ top: $("header").outerHeight(true) }).fadeOut();
                    }
                    const height = $(window).outerHeight() - ($("header").outerHeight() + $(".header .container .extraHeaderOptions > div.geographies").outerHeight(true));
                    $("header .navigation").css({ top: $("header").outerHeight() });
                    setTimeout(() => {
                        $("header .navigation, .header .container .geographies .dropdown-subnav").css({ height });
                        $("header .container .geographies .dropdown-subnav").css({
                            bottom: $(".header .container .extraHeaderOptions > div.geographies").outerHeight(true) + 2 + "px"
                        });
                    }, 500);
                }
            });

            $("header .navigation > ul > li > a").on("click", function () {
                if ($(window).width() <= 1024) {
                    const dropdown = $(this).siblings(".dropdown-subnav");
                    if (dropdown.length) {
                        $(this).parents("li").toggleClass("active");
                        dropdown.slideToggle();
                        $(".navigation > ul > li .dropdown-subnav").not(dropdown).slideUp();
                    }
                }
            });

            $("header .navigation > ul > li").hover(function () {
                if ($(window).width() > 1024) {
                    b("open", $(this));
                }
            }, function () {
                if ($(window).width() > 1024) {
                    b("close", $(this));
                }
            });

            $("header .geographies > a").on("click", function () {
                const subnav = $(this).siblings(".dropdown-subnav");
                if (subnav.is(":not(:hidden)")) {
                    $(this).removeClass("active").parents("header").removeClass("dropdown-open");
                    if ($(window).width() > 1024) {
                        subnav.fadeOut();
                    } else {
                        subnav.slideUp();
                        $("header .navigation").fadeIn();
                    }
                } else {
                    $(this).addClass("active").parents("header").addClass("dropdown-open");
                    if ($(window).width() > 1024) {
                        subnav.fadeIn(300).css({ display: "flex" });
                    } else {
                        subnav.slideDown();
                        $("header .navigation").fadeOut();
                    }
                }
                if ($("body").hasClass("searchOpen") && $(window).width() > 1024) {
                    $("html, body").removeClass("hideOverflow");
                    $("body").removeClass("searchOpen");
                    $("header .searchPopup").css({ top: $("header").outerHeight(true) }).fadeOut();
                }
            });

            $("header .search").on("click", function () {
                const searchPopup = $("header .searchPopup");
                searchPopup.css({ height: $(window).outerHeight(true) - $("header").outerHeight(true) });
                if ($("body").hasClass("searchOpen")) {
                    $("html, body").removeClass("hideOverflow");
                    $("body").removeClass("searchOpen");
                    $("header").removeClass("dropdown-open");
                    searchPopup.css({ top: $("header").outerHeight(true) }).fadeOut();
                } else {
                    $("html, body").addClass("hideOverflow");
                    $("body").addClass("searchOpen");
                    $("header").addClass("dropdown-open");
                    searchPopup.css({ top: $("header").outerHeight(true) }).fadeIn();
                    if ($(window).width() <= 1024) {
                        $("body").removeClass("navOpen");
                        $("header .navigation").slideUp();
                        $("header .dropdown-subnav").hide().slideUp();
                    }
                }
            });

            let lastScrollTop = 0;
            $(window).on("scroll", function () {
                const scrollTop = $(this).scrollTop();
                if (!$("body").hasClass("navOpen") && $("header").attr("data-homepage") === "true") {
                    if (scrollTop < lastScrollTop || scrollTop <= 0) {
                        $("header").css({ top: 0 });
                    } else {
                        $("header").css({ top: -$("header").outerHeight(true) });
                    }
                }
                lastScrollTop = scrollTop;
                $("header").toggleClass("scrolling", scrollTop > 0);
            });

            $(document).on("click", function (e) {
                if (!e.target.classList.contains("geo") && $(window).width() > 1024) {
                    $(".dropdown-subnav").slideUp();
                    $(".geo").removeClass("active");
                    $('header[role="header"]').removeClass("dropdown-open");
                }
            });

            const debounce = (func, wait, immediate) => {
                let timeout;
                return function () {
                    const context = this;
                    const args = arguments;
                    if (immediate && !timeout) func.apply(context, args);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    }, wait);
                };
            };
        };

        $(document).ready(handleDocumentReady);
        return () => {
            $(document).off("ready", handleDocumentReady);
        };
    }, []);
    return (
        <div className='mx-auto d-flex'>
            <header className="header opaque-header" role="header" data-theme="light" data-bgcolor-subpage data-homepage="true" data-searc-page="/content/nexus/en/search/?q=" >
            <div className="container" bis_skin_checked={1}>
                <div className="logo" bis_skin_checked={1}><a href="/en/" target="_self"><img src="logo.png" alt="" /></a><span /></div>
                <nav className="navigation" role="navigation">
                    <ul>
                        <li className="column-3">
                            <a target="_self" style={{ color: '' }}>Services</a>
                            <div className="dropdown-subnav" bis_skin_checked={1}>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/applications/" target="_self" style={{ color: '' }}>Applications</a>
                                    <a href="/ai/" target="_self" style={{ color: '' }}>Artificial Intelligence</a>
                                    <a href="/business-process/" target="_self" style={{ color: '' }}>Business Process</a>
                                    <a href="/cloud/" target="_self" style={{ color: '' }}>Cloud</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/consulting/" target="_self" style={{ color: '' }}>Consulting</a>
                                    <a href="/cybersecurity/" target="_self" style={{ color: '' }}>Cybersecurity</a>
                                    <a href="/analytics/" target="_self" style={{ color: '' }}>Data &amp; Analytics</a>
                                    <a href="/digital/" target="_self" style={{ color: '' }}>Digital Experiences</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/engineering/" target="_self" style={{ color: '' }}>Engineering</a>
                                    <a href="/sustainability/" target="_self" style={{ color: '' }}>Sustainability</a>
                                </div>
                            </div>
                        </li>
                        <li className="column-4">
                            <a target="_self" style={{ color: '' }}>Industries</a>
                            <div className="dropdown-subnav" bis_skin_checked={1}>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/aerospace-and-defense/" target="_self" style={{ color: '' }}>Aerospace &amp; Defense</a>
                                    <a href="/automotive/" target="_self" style={{ color: '' }}>Automotive</a>
                                    <a href="/banking/" target="_self" style={{ color: '' }}>Banking</a>
                                    <a href="/capital-markets/" target="_self" style={{ color: '' }}>Capital Markets</a>
                                    <a href="/communications/" target="_self" style={{ color: '' }}>Communications</a>
                                    <a href="/consumer-electronics/" target="_self" style={{ color: '' }}>Consumer Electronics</a>
                                    <a href="/consumer-packaged-goods/" target="_self" style={{ color: '' }}>Consumer Packaged Goods</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/education/" target="_self" style={{ color: '' }}>Education</a>
                                    <a href="/engineering-construction-operations/" target="_self" style={{ color: '' }}>Engineering Construction &amp; Operations</a>
                                    <a href="/healthcare/" target="_self" style={{ color: '' }}>Healthcare</a>
                                    <a href="/process-and-industrial-manufacturing/" target="_self" style={{ color: '' }}>Industrial &amp; Process Manufacturing</a>
                                    <a href="/insurance/" target="_self" style={{ color: '' }}>Insurance</a>
                                    <a href="/pharmaceutical-and-life-sciences/" target="_self" style={{ color: '' }}>Life Sciences &amp; Pharma</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/new-age-media/" target="_self" style={{ color: '' }}>Media &amp; Info Services</a>
                                    <a href="/medical-devices/" target="_self" style={{ color: '' }}>Medical Devices</a>
                                    <a href="/natural-resources/" target="_self" style={{ color: '' }}>Natural Resources</a>
                                    <a href="/network-edge-providers/" target="_self" style={{ color: '' }}>Network &amp; Edge Providers</a>
                                    <a href="/oil-and-gas/" target="_self" style={{ color: '' }}>Oil &amp; Gas</a>
                                    <a href="/platforms-and-software-products/" target="_self" style={{ color: '' }}>Platforms &amp; Software Products</a>
                                    <a href="/professional-services/" target="_self" style={{ color: '' }}>Professional Services</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/public-sector/" target="_self" style={{ color: '' }}>Public Sector</a>
                                    <a href="/retail/" target="_self" style={{ color: '' }}>Retail</a>
                                    <a href="/semiconductors/" target="_self" style={{ color: '' }}>Semiconductors</a>
                                    <a href="/travel-and-transportation/" target="_self" style={{ color: '' }}>Transportation &amp; Services</a>
                                    <a href="/utilities/" target="_self" style={{ color: '' }}>Utilities</a>
                                </div>
                            </div>
                        </li>
                        <li className="column-0">
                            <a href="/consulting/" target="_self" style={{ color: '' }}>Insights</a>
                        </li>
                        <li className="column-3">
                            <a target="_self" style={{ color: '' }}>About Wipro</a>
                            <div className="dropdown-subnav" bis_skin_checked={1}>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/about-us/" target="_self" style={{ color: '' }}>About Us</a>
                                    <a href="/about-us/ambitions-realized/" target="_self" style={{ color: '' }}>Ambitions Realized</a>
                                    <a href="/analyst-speak/" target="_self" style={{ color: '' }}>Analyst Reports</a>
                                    <a href="/about-us/awards-and-recognitions/" target="_self" style={{ color: '' }}>Awards and Recognitions</a>
                                    <a href="/blogs/" target="_self" style={{ color: '' }}>Blogs</a>
                                    <a href="/case-studies/" target="_self" style={{ color: '' }}>Case Studies</a>
                                    <a href="/corporate-sustainability/" target="_self" style={{ color: '' }}>Corporate Sustainability</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/about-us/diversity-equity-and-inclusion/" target="_self" style={{ color: '' }}>Diversity, Equity and Inclusion</a>
                                    <a href="/events/" target="_self" style={{ color: '' }}>Events</a>
                                    <a href="/investors/" target="_self" style={{ color: '' }}>Investors</a>
                                    <a href="/lab45/" target="_self" style={{ color: '' }}>Lab45</a>
                                    <a href="/leadership/" target="_self" style={{ color: '' }}>Leadership</a>
                                    <a href="/locations/" target="_self" style={{ color: '' }}>Locations</a>
                                </div>
                                <div className="col " bis_skin_checked={1}>
                                    <a href="/newsroom/" target="_self" style={{ color: '' }}>News</a>
                                    <a href="/partner-ecosystem/" target="_self" style={{ color: '' }}>Partner Ecosystem</a>
                                    <a href="/about-us/privacy-at-wipro/" target="_self" style={{ color: '' }}>Privacy at Wipro</a>
                                    <a href="/about-us/supplier-diversity/" target="_self" style={{ color: '' }}>Supplier Diversity</a>
                                    <a href="/about-us/the-story-of-wipro/" target="_self" style={{ color: '' }}>The Story of Wipro</a>
                                    <a href="/ventures/" target="_self" style={{ color: '' }}>Wipro Ventures</a>
                                </div>
                            </div>
                        </li>
                        <li className="column-0">
                            <a href="https://careers.wipro.com/careers-home/" target="_blank" style={{ color: '' }}>Careers</a>
                        </li>
                        <li className="column-0">
                            <a href="javascript:;" data-hash="#contactUs" style={{ color: '' }}>Contact Us</a>
                        </li>
                    </ul>
                </nav>
                <div className="extraHeaderOptions" bis_skin_checked={1}>
                    <div className="geographies" bis_skin_checked={1}><a className="geo"><img src="/content/dam/nexus/en/country-flag/flag_none.svg" alt="" /></a><a className="mobileGeo"><img src="/content/dam/nexus/en/country-flag/flag_none.png" alt="" />Locations</a><div className="dropdown-subnav" bis_skin_checked={1}><div className="col hasCategory" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a className="catTitle">America</a></div><div className="accordian" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a href="/en-BR/" target="_blank" rel="noopener noreferrer">Brazil</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-BR/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/pt-BR/" target="_blank" className="geoLinks" rel="noopener noreferrer">Po</a>
                    </div></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-CA/" target="_blank" rel="noopener noreferrer">Canada</a></div><div className="countryContainer" bis_skin_checked={1}>
                            <a href="/en-latam/" target="_blank" rel="noopener noreferrer">Latam</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-MX/" target="_blank" rel="noopener noreferrer">Mexico</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-MX/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/es-MX/" target="_blank" className="geoLinks" rel="noopener noreferrer">Sp</a></div></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-US/" target="_blank" rel="noopener noreferrer">United States</a></div></div></div><div className="col hasCategory" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a href="/en-EU/" target="_blank" className="catTitle" rel="noopener noreferrer">Europe</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-EU/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/de-EU/" target="_blank" className="geoLinks" rel="noopener noreferrer">De</a></div></div><div className="accordian" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a href="/en-benelux/" target="_blank" rel="noopener noreferrer">Benelux</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-DE/" target="_blank" rel="noopener noreferrer">Germany &amp; Austria</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-DE/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/de-DE/" target="_blank" className="geoLinks" rel="noopener noreferrer">De</a></div></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-nordic/" target="_blank" rel="noopener noreferrer">Nordic</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-Southern-EU/" target="_blank" rel="noopener noreferrer">Southern Europe</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-Southern-EU/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/fr-Southern-EU/" target="_blank" className="geoLinks" rel="noopener noreferrer">Fr</a></div></div><div className="countryContainer" bis_skin_checked={1}>
                                <a href="/en-UKI/" target="_blank" rel="noopener noreferrer">United Kingdom &amp; Ireland</a></div></div></div><div className="col hasCategory" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a className="catTitle">Asia Pacific</a></div><div className="accordian" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a href="/en-asean/" target="_blank" rel="noopener noreferrer">Asean</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-ANZ/" target="_blank" rel="noopener noreferrer">Australia &amp; New Zealand</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-CN/" target="_blank" rel="noopener noreferrer">China</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-JP/" target="_blank" rel="noopener noreferrer">Japan</a><div className="geoLinkContainer" bis_skin_checked={1}><a href="/en-JP/" target="_blank" className="geoLinks" rel="noopener noreferrer">En</a><a href="/ja-JP/" target="_blank" className="geoLinks" rel="noopener noreferrer">Jp</a></div></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-KR/" target="_blank" rel="noopener noreferrer">Korea</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-TW/" target="_blank" rel="noopener noreferrer">Taiwan</a></div></div></div><div className="col hasCategory" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a className="catTitle">India &amp; Middle East</a></div><div className="accordian" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a href="/en-IN/" target="_blank" rel="noopener noreferrer">India</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en-ME/" target="_blank" rel="noopener noreferrer">Middle East</a></div><div className="col hasCategory" bis_skin_checked={1}><div className="countryContainer" bis_skin_checked={1}><a className="catTitle" href="/en-africa/" target="_blank" rel="noopener noreferrer">Africa</a></div><div className="countryContainer" bis_skin_checked={1}><a href="/en/" target="_blank" className="global-site catTitle" rel="noopener noreferrer">Global Site</a></div></div></div></div></div></div>
                    <div className="hamburger" bis_skin_checked={1}><span /></div>

                </div>
            </div>
        </header>
        </div >
    )
}

export default Header
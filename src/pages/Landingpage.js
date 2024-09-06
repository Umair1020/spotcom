import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useMediaQuery } from 'react-responsive'
import AOS from 'aos';
import $ from 'jquery'
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import HoverVideoPlayer from 'hover-video-player';
import Cookies from "js-cookie";
import "@fontsource/roboto/400-italic.css";
window.jquery = window.$ = $

const Landingpage = () => {


    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 768 })
        return isNotMobile ? children : null
    }
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
        <>
            <Desktop>

                <div className='parent'>





                    {/* <Header /> */}
                    <video autoPlay muted loop className='banner-video' style={{
                        position: 'absolute',
                        top: '70px',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        opacity: 0.9,

                    }}>
                        <source src='/video.mp4' type='video/mp4' />

                    </video>

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
                                                    Business Solution
                                                </a>
                                                <a
                                                    href="/ai/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Cyber Security
                                                </a>
                                                <a
                                                    href="/business-process/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Cloud Services
                                                </a>
                                                <a
                                                    href="/cloud/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Network Audit
                                                </a>
                                            </div>
                                            <div className="col ">
                                                <a
                                                    href="/consulting/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Resident Engineer Outsourcing
                                                </a>
                                                <a
                                                    href="/cybersecurity/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Network Consultation
                                                </a>
                                                <a
                                                    href="/analytics/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Network Design & Implementation
                                                </a>
                                                <a
                                                    href="/digital/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Infrastructure Deployment Services
                                                </a>
                                            </div>
                                            <div className="col ">
                                                <a
                                                    href="/engineering/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    IT Staff Augmentation
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
                                                    Media Industry
                                                </a>
                                                <a
                                                    href="/automotive/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Pharmaceutical Industry
                                                </a>
                                                <a
                                                    href="/banking/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Events Industry
                                                </a>
                                                <a
                                                    href="/capital-markets/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    E-Sports Industry
                                                </a>

                                            </div>
                                            <div className="col ">
                                                <a
                                                    href="/education/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Software House
                                                </a>
                                                <a
                                                    href="/engineering-construction-operations/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Marketing Agencies
                                                </a>
                                                <a
                                                    href="/healthcare/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Food & Beverages Industry
                                                </a>
                                                <a
                                                    href="/process-and-industrial-manufacturing/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Factories & Industrial Zones
                                                </a>

                                            </div>
                                            <div className="col ">

                                                <a
                                                    href="/utilities/"
                                                    style={{}}
                                                    target="_self"
                                                >
                                                    Hotels & Resorts
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
                                            About Spotcomm
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
                                            href=""
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

                        </div>
                    </header>

                    <div className='banner' style={{ position: 'relative', height: '107.5vh', overflow: 'hidden' }}>
                        <div className='container' style={{ position: 'relative', zIndex: 2 }}>
                            <div className='row'>
                                <div className='col-lg-7 bannerh2 mx-auto'>
                                    <h2 className=' '>Be Seamless with Our    Managed  Services </h2>
                                    <p className='text-light text-center'>An insight report by Spotcomm FullStride Cloud & Forbes.</p>
                                    <button type="button" className="btns">Learn More</button>
                                </div>
                                {/* <div className='col-lg-5 float-sm-start'>
                                    <img src='/banner.png' className='w-100' />
                                </div> */}
                            </div>
                        </div>

                        <section id="section05" className="demo">
                            <a href="#section06" className=''>Scroll<span></span></a>
                        </section>
                    </div>
                    {/* <div className='banner'>
                        <div className='container  '>
                            <div className='row '> <br />
                                <div className='col-lg-6  bannerh2  mx-auto'> <br /><br /><br /><br />
                                    <h2 className='d-flex justify-content-center  align-items-end mx-auto'>Excel in cloud <br /> economics and tap into  the power of AI.</h2>
                                    <p>An insight report by Spotcomm FullStride Cloud & Forbes. </p>
                                    <button type="button" className="btns">Learn More</button>
                                </div>
                                <div className='col-lg-6   float-sm-start '>
                                    <img src='/banner.png' className='w-100 ' />
                                  
                                </div>

                            </div>
                            <br /> <br /> <br />
                            <section id="section05" class="demo">
                                <a href="#section06" className='text-dark'>Scroll<span></span></a>
                            </section>
                        </div>
                   
                    </div> */}
                    {/* <section id="section06" > */}
                    <div className='d-flex' id='section06'>
                        <div className='col-lg-6'>
                            <div className='video-container'>
                                <hover-video-player playback-start-delay="500">
                                    <video
                                        src="/2.mp4"
                                        playsInline
                                        loop
                                        muted
                                        preload="metadata"
                                    ></video>
                                </hover-video-player>
                                <div className='overlay'>
                                    <h2>DATA CENTER</h2>
                                    <p>SpotComm: Powering your business with reliable, scalable data center solutions.</p>
                                    <button className='btns'>Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='video-container'>
                                <hover-video-player playback-start-delay="500">
                                    <video
                                        src="/123.mp4"
                                        playsInline
                                        loop
                                        muted
                                        preload="metadata"
                                    ></video>
                                </hover-video-player>
                                <div className='overlay'>
                                    <h2>DATA CENTER</h2>
                                    <p>SpotComm: Powering your business with reliable, scalable data center solutions.</p>
                                    <button className='btns'>Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='d-flex' id='section06'>
                        <div className='col-lg-6'>
                            <div className='video-container'>
                                <hover-video-player playback-start-delay="500">
                                    <video
                                        src="/3.mp4"
                                        playsInline
                                        loop
                                        muted
                                        preload="metadata"
                                    ></video>
                                </hover-video-player>
                                <div className='overlay'>
                                    <h2>CLOUD</h2>
                                    <p>SpotComm: Elevate your business with seamless, secure cloud solutions.</p>
                                    <button className='btns'>Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='video-container'>
                                <hover-video-player playback-start-delay="500">
                                    <video
                                        src="/123.mp4"
                                        playsInline
                                        loop
                                        muted
                                        preload="metadata"
                                    ></video>
                                </hover-video-player>
                                <div className='overlay'>
                                    <h2>DATA CENTER</h2>
                                    <p>SpotComm: Powering your business with reliable, scalable data center solutions.</p>
                                    <button className='btns'>Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {/* </section> */}

                    <div className=' row banner3 ' id='section07'>
                        <div className='col-lg-6 heading'>
                            <h2 className='h2'>LOREM IPSUM</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br />
                                industry. Lorem Ipsum has been the industry's standard dummy <br />
                                text ever since the 1500s, when an unknown printer took a galley <br />
                                of type and scrambled</p>
                        </div>
                        <div className='col-lg-6 '>
                            <img src='/video.png' />
                        </div>
                    </div>
                    {/* <div className=' d-flex '> <br />
                        <div className='col-lg-4   '>
                            <img src='/sec1.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec2.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec3.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                    </div>
                    <div className=' d-flex '>
                        <div className='col-lg-4   '>
                            <img src='/sec4.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec5.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec6.png' style={{ height: "-webkit-fill-available" }} className='w-100 ' />
                        </div>
                    </div> */}
                    <div className='d-flex'>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec1.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec2.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec3.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex'>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec4.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec5.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4 position-relative'>
                            <img src='/sec6.png' style={{ height: "100%" }} className='w-100' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div>

                    <br />     <br />
                    <div className='banner4 container'>
                        {/* <h3 className='text-center'>
                            Each day, Spotcomm utilizes advanced AI technologies to help <br /> clients worldwide create a more resilient, secure, and sustainable <br /> future.
                        </h3>
                        <br />
                        <h2 className='text-center'>
                            How can we help you?
                        </h2> */}
                        {/* <div class=" row">
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="First Name" aria-label="First name" />
                            </div><br />
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="Last Name" aria-label="Last name" />
                            </div>
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="Work Email" aria-label="First name" />
                            </div><br />
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="Job Title" aria-label="Last name" />
                            </div>
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="Company" aria-label="First name" />
                            </div><br />
                            <div class=""><br />
                                <input type="text" class="form-control input" placeholder="Country" aria-label="Last name" /> <br />
                            </div>
                            <textarea class="form-control inputs" id="exampleFormControlTextarea1" placeholder="Message" rows="3"></textarea>
                            <br /> <div class=""><br />
                                <div class="form-check  checkbox ">
                                    <input class="form-check-input mt-2" type="checkbox" id="gridCheck" />
                                    <label class="form-check-label mx-3" for="gridCheck">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </label>
                                </div>

                            </div>
                            <div class=""><br />
                                <div class="form-check  checkbox">
                                    <input class="form-check-input " type="checkbox" id="gridCheck" />
                                    <label class="form-check-label mx-3" for="gridCheck">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </label>
                                </div>

                            </div>

                            <br />  <button type="button" class="btn  btns2 mt-3">Submit</button>  <br />
                            <br />   <p className='text-center text-secondary'> <br />Click here to opt out of Spotcomm’s mailing lists</p> */}
                        {/* <br />
                        </div> */}
                        <div className="row gy-4">
                            <div className="col-lg-4 d-flex align-items-center">
                                <div className="info-item d-flex align-items-center" data-aos="fade-up" data-aos-delay={300}>

                                    <div className='d-flex align-items-center'>
                                        <img src='/purple.png' />
                                        <h2 className='mx-2' style={{ color: "#734B93" }}>Contact Us</h2>
                                    </div>
                                </div>


                            </div>
                            <div className="col-lg-8">
                                <form
                                    action="forms/contact.php"
                                    method="post"
                                    className="php-email-form"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                name="First Name"
                                                className="form-control input"
                                                placeholder="Your Name"
                                                required=""
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input
                                                type="email"
                                                className="form-control input"
                                                name="email"
                                                placeholder="Last Name"
                                                required=""
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input
                                                type="email"
                                                className="form-control input"
                                                name="email"
                                                placeholder="Work Email"
                                                required=""
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input
                                                type="email"
                                                className="form-control input"
                                                name="email"
                                                placeholder="Job Title"
                                                required=""
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input
                                                type="email"
                                                className="form-control input"
                                                name="email"
                                                placeholder="Company"
                                                required=""
                                            />
                                        </div>
                                        <div className="col-md-6 ">
                                            {/* <input
                                                type="email"
                                                className="form-control input"
                                                name="email"
                                                placeholder="Your Email"
                                                required=""
                                            /> */}
                                            <select id="country" name="country" class="form-control input">
                                                <option value="Afghanistan">Afghanistan</option>
                                                <option value="Åland Islands">Åland Islands</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Algeria">Algeria</option>
                                                <option value="American Samoa">American Samoa</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Anguilla">Anguilla</option>
                                                <option value="Antarctica">Antarctica</option>
                                                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Aruba">Aruba</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaijan">Azerbaijan</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrain">Bahrain</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Belgium">Belgium</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bermuda">Bermuda</option>
                                                <option value="Bhutan">Bhutan</option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Bouvet Island">Bouvet Island</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cambodia">Cambodia</option>
                                                <option value="Cameroon">Cameroon</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Cape Verde">Cape Verde</option>
                                                <option value="Cayman Islands">Cayman Islands</option>
                                                <option value="Central African Republic">Central African Republic</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Christmas Island">Christmas Island</option>
                                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoros">Comoros</option>
                                                <option value="Congo">Congo</option>
                                                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                                <option value="Cook Islands">Cook Islands</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                <option value="Croatia">Croatia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Cyprus">Cyprus</option>
                                                <option value="Czech Republic">Czech Republic</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="Djibouti">Djibouti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Dominican Republic">Dominican Republic</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egypt">Egypt</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Ethiopia">Ethiopia</option>
                                                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                                <option value="Faroe Islands">Faroe Islands</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Finland">Finland</option>
                                                <option value="France">France</option>
                                                <option value="French Guiana">French Guiana</option>
                                                <option value="French Polynesia">French Polynesia</option>
                                                <option value="French Southern Territories">French Southern Territories</option>
                                                <option value="Gabon">Gabon</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Gibraltar">Gibraltar</option>
                                                <option value="Greece">Greece</option>
                                                <option value="Greenland">Greenland</option>
                                                <option value="Grenada">Grenada</option>
                                                <option value="Guadeloupe">Guadeloupe</option>
                                                <option value="Guam">Guam</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guernsey">Guernsey</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guinea-bissau">Guinea-bissau</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Haiti">Haiti</option>
                                                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hong Kong">Hong Kong</option>
                                                <option value="Hungary">Hungary</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia">Indonesia</option>
                                                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                                <option value="Iraq">Iraq</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Isle of Man">Isle of Man</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Jersey">Jersey</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Kenya">Kenya</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                <option value="Korea, Republic of">Korea, Republic of</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                <option value="Latvia">Latvia</option>
                                                <option value="Lebanon">Lebanon</option>
                                                <option value="Lesotho">Lesotho</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Luxembourg">Luxembourg</option>
                                                <option value="Macao">Macao</option>
                                                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marshall Islands">Marshall Islands</option>
                                                <option value="Martinique">Martinique</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Mayotte">Mayotte</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                                <option value="Moldova, Republic of">Moldova, Republic of</option>
                                                <option value="Monaco">Monaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montenegro">Montenegro</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Morocco">Morocco</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Myanmar">Myanmar</option>
                                                <option value="Namibia">Namibia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherlands">Netherlands</option>
                                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                <option value="New Caledonia">New Caledonia</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Niue">Niue</option>
                                                <option value="Norfolk Island">Norfolk Island</option>
                                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Palau">Palau</option>
                                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                <option value="Panama">Panama</option>
                                                <option value="Papua New Guinea">Papua New Guinea</option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Pitcairn">Pitcairn</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Puerto Rico">Puerto Rico</option>
                                                <option value="Qatar">Qatar</option>
                                                <option value="Reunion">Reunion</option>
                                                <option value="Romania">Romania</option>
                                                <option value="Russian Federation">Russian Federation</option>
                                                <option value="Rwanda">Rwanda</option>
                                                <option value="Saint Helena">Saint Helena</option>
                                                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                <option value="Saint Lucia">Saint Lucia</option>
                                                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia">Serbia</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leone">Sierra Leone</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Slovakia">Slovakia</option>
                                                <option value="Slovenia">Slovenia</option>
                                                <option value="Solomon Islands">Solomon Islands</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Sudan">Sudan</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                <option value="Swaziland">Swaziland</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                <option value="Taiwan">Taiwan</option>
                                                <option value="Tajikistan">Tajikistan</option>
                                                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Timor-leste">Timor-leste</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tokelau">Tokelau</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                                <option value="Tunisia">Tunisia</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Turkmenistan">Turkmenistan</option>
                                                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                <option value="Uruguay">Uruguay</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Viet Nam">Viet Nam</option>
                                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                <option value="Wallis and Futuna">Wallis and Futuna</option>
                                                <option value="Western Sahara">Western Sahara</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabwe">Zimbabwe</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea
                                                className="form-control input"
                                                name="message"
                                                rows={6}
                                                placeholder="Message"
                                                required=""
                                                defaultValue={""}
                                            />
                                        </div>
                                        <br /> <div class="">
                                            <div class="form-check  checkbox ">
                                                <input class="form-check-input mt-2" type="checkbox" id="gridCheck" />
                                                <label class="form-check-label mx-3 " for="gridCheck">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </label>
                                            </div>

                                        </div>
                                        <div class="">
                                            <div class="form-check  checkbox">
                                                <input class="form-check-input " type="checkbox" id="gridCheck" />
                                                <label class="form-check-label mx-3" for="gridCheck">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <button type="button" class="btn  btns2 mt-3">Submit</button>  <br />
                                            <p className='text-center text-secondary'> <br />Click here to opt out of Spotcomm’s mailing lists</p>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>
                    <div className=' '>
                        <div className='footerend row '>
                            <div className='col-lg-4 d-flex justify-content-center align-items-center'>© <span className='mx-2'>2024 Spotcomm </span> </div>
                            <div className='col-lg-4 d-flex justify-content-center align-items-center'> Disclaimer <span className='mx-3'> Privacy</span>   </div>
                            <div class="col-lg-4 d-flex justify-content-center align-items-center">
                                <ul class="social-icon">
                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-facebook"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-apple"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-instagram"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-youtube"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-linkedin"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <div>
                            <p>
                                This website uses cookies to improve your experience. Do you accept
                                cookies?
                            </p>
                            <button onClick={handleAcceptCookies}>Accept</button>
                            <button onClick={handleRejectCookies}>Reject</button>
                        </div>
                        <sub>Cookie set: {isCookieSet ? <b>Yes</b> : <b>No</b>}</sub>
                    </div> */}
                    {/* <div id="preloader">
                        <div class="line"></div>
                    </div> */}

                </div>
            </Desktop>
            <Mobile>
                <div className='parent'>
                    {/* <Navbar /> */}
                    {/* <Header /><br /><br /><br /> */}
                    {/* <img src='/Capture.PNG' style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        opacity: 0.9,
                        
                        }} /> */}
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
                                            src="/flag_none.svg"
                                        />
                                    </a>
                                    <a className="mobileGeo">
                                        <img
                                            alt=""
                                            src="/flag_none.png"
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
                    {/* <div className='banner'> */}
                    <section id="hero" class="hero section dark-background">
                        <video autoPlay muted loop className='banner-video' style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 1,
                            opacity: 0.9,

                        }}>
                            <source src='/VIDEO.mp4' type='video/mp4' />

                        </video>




                        <div class="container text-center" data-aos="fade-up" data-aos-delay="100">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <h2>Be Seamless with  Our    Managed  Services </h2><br />
                                    <p>An insight report by Spotcomm FullStride Cloud & Forbes. </p><br />
                                    <a href="#about" class="btn-get-started ">Learn More</a>
                                </div>
                            </div>
                        </div>

                    </section>
                    {/* <div className='container  '>
                            <div className='row '> <br />
                                <div className='col-lg-6  bannerh2  mx-auto d-flex align-items-center'>
                                    <h2 className=' '>Be Seamless with<br />  Our    Managed  Services </h2>
                                    <p className='text-light text-center'>An insight report by Spotcomm FullStride Cloud & Forbes. </p>
                                    <button type="button" className="btns">Learn More</button>
                                </div>


                            </div>
                            <br /> <br /> <br />
                            <section id="section05" class="demo">
                                <a href="#section06" className='text-dark'>Scroll<span></span></a>
                            </section>
                        </div> */}
                    {/* </div> */}
                    {/* <section>
                        <div className=' row ' id='section05'>
                            <div className='col-lg-4   '>
                                <img src='/sec1.png' className='w-100 ' />
                            </div>
                            <div className='col-lg-4   '>
                                <img src='/sec2.png' className='w-100 ' />
                            </div>
                            <div className='col-lg-4   '>
                                <img src='/sec3.png' className='w-100 ' />
                            </div>
                        </div>
                    </section> */}
                    <div className='row'>
                        <div className='col-lg-12 w-100' style={{ position: 'relative' , height: "50vh"  }}>

                            {/* Video container */}
                            <video
                                muted
                                loop
                                className='banner-video'
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                                data-aos-duration="3000"
                                data-aos-easing="ease-out-cubic"
                                data-aos-once="false" // Animation will trigger again when scrolling back
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    zIndex: 1,
                                    opacity: 0.9,
                                }}
                                onMouseEnter={e => e.target.play()}
                                onMouseLeave={e => e.target.pause()}
                            >
                                <source src='/2.mp4' type='video/mp4' />
                            </video>

                            {/* Overlay text and button */}
                            <div
                                data-aos="fade-up"
                                data-aos-anchor-placement="center-bottom"
                                data-aos-duration="1500"
                                data-aos-easing="ease-out-cubic"
                                data-aos-once="false" // Animation will replay when scrolling back up
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2,
                                    color: '#fff',
                                    textAlign: 'center'
                                }}
                            >
                                <h2>DATA CENTER</h2><br />
                                <p className='w-75'>SpotComm: Powering your business with reliable, scalable data center solutions.</p>
                                <br /><br /><br /><br /><br /><br /><br /><br />   <button className='btns'>
                                    Learn More
                                </button>
                            </div>
                        </div>

                        <div className='col-lg-12 w-100' style={{ position: 'relative' , height: "50vh"  }}>

{/* Video container */}
<video
    muted
    loop
    className='banner-video'
    data-aos="fade-up"
    data-aos-anchor-placement="center-bottom"
    data-aos-duration="3000"
    data-aos-easing="ease-out-cubic"
    data-aos-once="false" // Animation will trigger again when scrolling back
    style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 1,
        opacity: 0.9,
    }}
    onMouseEnter={e => e.target.play()}
    onMouseLeave={e => e.target.pause()}
>
    <source src='/123.mp4' type='video/mp4' />
</video>

{/* Overlay text and button */}
<div
    data-aos="fade-up"
    data-aos-anchor-placement="center-bottom"
    data-aos-duration="1500"
    data-aos-easing="ease-out-cubic"
    data-aos-once="false" // Animation will replay when scrolling back up
    style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        color: '#fff',
        textAlign: 'center'
    }}
>
    <h2>INFRASTRUCTURE</h2><br />
    <p className='w-75'>SpotComm: Powering your business with reliable, scalable data center solutions.</p>
    <br /><br /><br /><br /><br /><br /><br /><br />   <button className='btns'>
        Learn More
    </button>
</div>
</div>
                    </div>


                    <div className=' row banner3 '>
                        <div className='col-lg-6 heading'>
                            <br /> <br />
                            <h2 className='h2'>LOREM IPSUM</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br />
                                industry. Lorem Ipsum has been the industry's standard dummy <br />
                                text ever since the 1500s, when an unknown printer took a galley <br />
                                of type and scrambled</p>
                        </div> <br />
                        <div className='col-lg-6 '>
                            <img src='/video.png' className='w-75 mx-auto d-flex justify-content-center' />
                        </div>
                        <br />
                    </div>


                    <div className=' row '>
                        <div className='col-lg-4   position-relative'>
                            <img src='/sec1.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4   position-relative'>
                            <img src='/sec2.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4   position-relative'>
                            <img src='/sec3.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>



                        <div className='col-lg-4   position-relative'>
                            <img src='/sec4.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4   position-relative'>
                            <img src='/sec5.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div className='col-lg-4   position-relative'>
                            <img src='/sec6.png' className='w-100 ' />
                            <div className="text-overlay">
                                <h2>Lorem Ipsum</h2>
                                <p>Dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                    </div><br />
                    <div className='banner4'>
                        <h3 className='text-center'>
                            Each day, Spotcomm utilizes advanced AI technologies to help <br /> clients worldwide create a more resilient, secure, and sustainable <br /> future.
                        </h3>
                        <br />
                        <h2 className='text-center'>
                            How can we help you?
                        </h2>
                        <div class=" row">
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="First name" aria-label="First name" />
                            </div><br />
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="Last name" aria-label="Last name" />
                            </div>
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="First name" aria-label="First name" />
                            </div><br />
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="Last name" aria-label="Last name" />
                            </div>
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="First name" aria-label="First name" />
                            </div><br />
                            <div class=" col-lg-12"><br />
                                <input type="text" class="form-control input" placeholder="Last name" aria-label="Last name" /> <br />
                            </div>
                            <div class=" col-lg-12">
                                <textarea class="form-check input col-lg-12" id="exampleFormControlTextarea1" placeholder="Message" rows="3"></textarea>
                            </div>
                            <div class=""> <br />
                                <div class="form-check  checkbox d-flex justify-content-center align-items-center">
                                    <input class="form-check-input mt-2" type="checkbox" id="gridCheck" />
                                    <label class="form-check-label mx-3 " for="gridCheck">
                                        Lorem Ipsum is simply dummy
                                    </label>
                                </div>

                            </div>

                            <div class="">
                                <div class="form-check  checkbox d-flex  justify-content-center align-items-center mt-2">
                                    <input class="form-check-input " type="checkbox" id="gridCheck" />
                                    <label class="form-check-label mx-3" for="gridCheck">
                                        Lorem Ipsum is simply dummy
                                    </label>
                                </div>
                            </div>

                            <br />  <button type="button" class="btn btn-dark btns2 mt-3">Submit</button>  <br />
                            <br />   <p className='text-center text-secondary'> <br />Click here to opt out of Spotcomm’s mailing lists</p>
                            <br />
                        </div>
                    </div>
                    <div className=' '>
                        <div className='footerend row '><br />
                            <div className='col-lg-4 d-flex justify-content-center align-items-center mt-3'> © <span className='mx-2'>2024 Spotcomm </span> </div> <br />
                            <div className='col-lg-4 d-flex justify-content-center align-items-center mt-3'>  Disclaimer <span className='mx-3'> Privacy</span>   </div><br />
                            <div class="col-lg-4 d-flex justify-content-center align-items-center mt-3">
                                <ul class="social-icon">
                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-facebook"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-apple"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-instagram"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-youtube"></span>
                                        </a>
                                    </li>

                                    <li class="social-icon-item">
                                        <a href="#" class="social-icon-link">
                                            <span class="bi-linkedin"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Mobile>
        </>
    )
}

export default Landingpage
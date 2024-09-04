import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useMediaQuery } from 'react-responsive'
import $ from 'jquery'
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
                    {/* <video autoPlay muted loop className='banner-video' style={{
                            position: 'absolute',
                            top: '70px',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 1
                        }}>
                            <source src='/video1.mp4' type='video/mp4' />

                        </video> */}

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

                    <div className='banner' style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                        <div className='container' style={{ position: 'relative', zIndex: 2 }}>
                            <div className='row'>
                                <div className='col-lg-7 bannerh2 mx-auto'>
                                    <h2 className='d-flex justify-content-center align-items-center mx-auto '>Unleash seamless <br /> connectivity with Managed  Services that empower your <br /> businesses</h2>
                                    <p className=''>An insight report by Spotcomm FullStride Cloud & Forbes.</p>
                                    <button type="button" className="btns">Learn More</button>
                                </div>
                                <div className='col-lg-5 float-sm-start'>
                                    <img src='/banner.png' className='w-100' />
                                </div>
                            </div>
                        </div>

                        <section id="section05" className="demo">
                            <a href="#section06" className='text-dark'>Scroll<span></span></a>
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
                    <div className=' d-flex ' id="section06" >
                        <div className='col-lg-6 ' >
                            <img className='' style={{ width: "-webkit-fill-available" }} src='/4.png' />

                        </div>
                        <div className='col-lg-6 ' >
                            <img className='' style={{ width: "-webkit-fill-available" }} src='/2.png' />
                        </div>
                    </div>
                    <div className=' d-flex ' id="section06" >
                        <div className='col-lg-6 ' >
                            <img className='' style={{ width: "-webkit-fill-available" }} src='/3.png' />
                        </div>
                        <div className='col-lg-6 ' >
                            <img className='' style={{ width: "-webkit-fill-available" }} src='/1.png' />
                        </div>
                    </div>


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
                    <div className='banner4'>
                        <h3 className='text-center'>
                            Each day, Spotcomm utilizes advanced AI technologies to help <br /> clients worldwide create a more resilient, secure, and sustainable <br /> future.
                        </h3>
                        <br />
                        <h2 className='text-center'>
                            How can we help you?
                        </h2>
                        <div class=" row">
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
                            <br />   <p className='text-center text-secondary'> <br />Click here to opt out of Spotcomm’s mailing lists</p>
                            <br />
                        </div>
                    </div>
                </div>
            </Desktop>
            <Mobile>
                <div className='parent'>
                    {/* <Navbar /> */}
                    {/* <Header /><br /><br /><br /> */}
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
                    <div className='banner'>
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
                    </div>
                    <section>
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


                    </section>

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
                            <img src='/video.png' className='w-100' />
                        </div>
                    </div>


                    <div className=' row '>
                        <div className='col-lg-4   '>
                            <img src='/sec1.png' className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec2.png' className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec3.png' className='w-100 ' />
                        </div>


                        <div className='col-lg-4   '>
                            <img src='/sec4.png' className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec5.png' className='w-100 ' />
                        </div>
                        <div className='col-lg-4   '>
                            <img src='/sec6.png' className='w-100 ' />
                        </div>
                    </div>
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
                                <div class="form-check checkbox" style={{ display: "inline-flex" }}>
                                    <input class="form-check-input mt-4" type="checkbox" id="gridCheck" />
                                    <label class="form-check-label ml-3" for="gridCheck">
                                        checkbox
                                    </label>
                                </div>

                            </div>
                            <div class="">
                                <div class="form-check checkbox" style={{ display: "inline-flex" }}>
                                    <input class="form-check-input mt-4" type="checkbox" id="gridCheck" />
                                    <label class="form-check-label ml-3" for="gridCheck">
                                        checkbox
                                    </label>
                                </div>

                            </div>

                            <br />  <button type="button" class="btn btn-dark btns2 mt-3">Submit</button>  <br />
                            <br />   <p className='text-center text-secondary'> <br />Click here to opt out of Spotcomm’s mailing lists</p>
                            <br />
                        </div>
                    </div>
                </div>
            </Mobile>
        </>
    )
}

export default Landingpage
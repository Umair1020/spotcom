import React from 'react'
import "./demo.css"

const Demo = () => {
    
    return (
        <div>
            <section id="col2layoutRow2">
                <div
                    className="col_2_layout  true"
                    data-header="style2"
                >
                    <div
                        className="col_2 animatecol_2 light playonhoverloop playonhover animate"
                        style={{
                            height: '889px'
                        }}
                    >
                        <div
                            className="bg"
                            data-autoplayonce="false"
                            data-bg="video"
                            data-bg-desktop="/content/dam/nexus/en/640x540-wipro-homepage-future-of-facility-infrastructure-management.jpg"
                            data-bg-mobile="/content/dam/nexus/en/640x540-wipro-homepage-future-of-facility-infrastructure-management.jpg"
                            data-bg-tablet="/content/dam/nexus/en/640x540-wipro-homepage-future-of-facility-infrastructure-management.jpg"
                            data-layer-bgcolor="#001F3F"
                            data-layer-opacity="0.3"
                            data-layer-switch="false"
                            data-loopedautoplay="false"
                            data-playonhoverloop="true"
                            data-playonhoveronce="false"
                            data-poster="/content/dam/nexus/en/640x540-wipro-homepage-future-of-facility-infrastructure-management.jpg"
                            data-vdtype="video/mp4"
                            data-video="/content/dam/nexus/en/hp-marelli-design-cloud.mp4"
                            style={{
                                background: 'url("/content/dam/nexus/en/640x540-wipro-homepage-future-of-facility-infrastructure-management.jpg") center center / cover repeat'
                            }}
                        >
                            <span
                                style={{
                                    display: 'none'
                                }}
                            />
                            <video
                                id="playonhoverloop"
                                loop
                                muted
                                poster="/1.mp4"
                                preload=""
                                src="/content/dam/nexus/en/hp-marelli-design-cloud.mp4#t=0.1"
                            />
                        </div>
                        <p
                            className="title "
                            style={{
                                '--transformtitleprperty': '65%',
                                color: 'rgb(255, 255, 255)',
                                textAlign: 'center'
                            }}
                        >
                            The Future of Facility Infrastructure Management is Digital
                            <span
                                style={{
                                    color: 'rgb(125,195,206) !important'
                                }}
                            >
                                .
                            </span>
                        </p>
                        <p
                            className="desc"
                            style={{
                                color: '#ffffff',
                                textAlign: 'center'
                            }}
                        >
                            Today’s buildings and industrial facilities are mind-bendingly complex. To manage this complexity, digital innovations like VR/XR, AI, and IoT are becoming absolutely essential.
                        </p>
                        <div
                            className="buttonContainer"
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <a
                                className="button"
                                href="/engineering-construction-operations/efficient-immersive-and-effective-the-digital-future-of-facility-infrastructure-management/"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: '#362358'
                                }}
                                target="_blank"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div
                        className="col_2 animatecol_2 dark playonhoverloop playonhover bgLayerOn animate"
                        style={{
                            height: '889px'
                        }}
                    >
                        <div
                            className="bg"
                            data-autoplayonce="false"
                            data-bg="image"
                            data-bg-desktop="/content/dam/nexus/en/marelli-640x540.jpg"
                            data-bg-mobile="/content/dam/nexus/en/marelli-640x540.jpg"
                            data-bg-tablet="/content/dam/nexus/en/marelli-640x540.jpg"
                            data-layer-opacity="0.3"
                            data-layer-switch="true"
                            data-loopedautoplay="false"
                            data-playonhoverloop="true"
                            data-playonhoveronce="false"
                            data-poster="/content/dam/nexus/en/marelli-640x540.jpg"
                            data-vdtype="video/mp4"
                            data-videoid="videoidsecond"
                            style={{
                                background: 'url("/content/dam/nexus/en/marelli-640x540.jpg") center center / cover repeat'
                            }}
                        >
                            <span
                                style={{
                                    '--bglayerOpacity': '0.3'
                                }}
                            />
                        </div>
                        <p
                            className="title "
                            style={{
                                '--transformtitleprperty': '65%',
                                textAlign: 'center'
                            }}
                        >
                            Marelli Brings Vehicle Design to the Cloud
                            <span
                                style={{
                                    color: '#FFDC00 !important'
                                }}
                            >
                                .
                            </span>
                        </p>
                        <p
                            className="desc"
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            Today’s market-leading cars rely on software-defined features that delight customers. Wipro’s Cloud Car framework is enabling Marelli to lead the way forward.
                        </p>
                        <div
                            className="buttonContainer"
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <a
                                className="button"
                                href="/engineering/wipro-supports-marelli-for-the-development-of-its-cabin-digital-twin/"
                                style={{}}
                                target="_blank"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Demo